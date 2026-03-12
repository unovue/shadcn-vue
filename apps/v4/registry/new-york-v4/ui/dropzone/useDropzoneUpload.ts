import type { InjectionKey, Ref } from "vue"
import type { FileRejectReason, InputFile } from "vue3-dropzone"
import { computed, ref } from "vue"
import { useDropzone as useVue3Dropzone } from "vue3-dropzone"

// Helper function for cross-environment UUID generation
function getUniqueId(): string {
  try {
    return crypto.randomUUID().slice(0, 8)
  }
  catch {
    // Fallback for older browsers
    return Math.random().toString(36).substring(2, 10)
  }
}

export type DropzoneResult<TUploadRes, TUploadError>
  = | { status: "pending" }
    | { status: "error", error: TUploadError }
    | { status: "success", result: TUploadRes }

export interface FileStatus<TUploadRes = unknown, TUploadError = unknown> {
  id: string
  fileName: string
  file: File
  tries: number
  status: "pending" | "error" | "success"
  result?: TUploadRes
  error?: TUploadError
  shapedError?: string
}

export type DropZoneErrorCode
  = | "file-invalid-type"
    | "file-too-large"
    | "file-too-small"
    | "too-many-files"

const dropZoneErrorCodes: readonly DropZoneErrorCode[] = [
  "file-invalid-type",
  "file-too-large",
  "file-too-small",
  "too-many-files",
] as const

function getDropZoneErrorCodes(fileRejections: FileRejectReason[]): DropZoneErrorCode[] {
  const errors = fileRejections.flatMap(rejection =>
    rejection.errors
      .filter((error): error is { code: string, message: string } =>
        error !== null && typeof error === "object" && "code" in error
        && dropZoneErrorCodes.includes(error.code as DropZoneErrorCode),
      )
      .map(error => error.code as DropZoneErrorCode),
  )
  return Array.from(new Set(errors))
}

function getRootError(
  errorCodes: DropZoneErrorCode[],
  limits: {
    accept?: string | string[]
    maxSize?: number
    minSize?: number
    maxFiles?: number
  },
): string {
  const errors = errorCodes.map((error) => {
    switch (error) {
      case "file-invalid-type": {
        const acceptedTypes = Array.isArray(limits.accept)
          ? limits.accept.join(", ")
          : limits.accept ?? ""
        return `only ${acceptedTypes} are allowed`
      }
      case "file-too-large": {
        const maxMb = limits.maxSize
          ? (limits.maxSize / (1024 * 1024)).toFixed(2)
          : "unlimited"
        return `max size is ${maxMb}MB`
      }
      case "file-too-small": {
        const roundedMinSize = limits.minSize
          ? (limits.minSize / (1024 * 1024)).toFixed(2)
          : "not specified"
        return `min size is ${roundedMinSize}MB`
      }
      case "too-many-files":
        return `max ${limits.maxFiles} files`
      default:
        return error
    }
  })
  const joinedErrors = errors.join(", ")
  return joinedErrors.charAt(0).toUpperCase() + joinedErrors.slice(1)
}

export interface UseDropzoneUploadOptions<TUploadRes, TUploadError> {
  onDropFile: (
    file: File,
  ) => Promise<Exclude<DropzoneResult<TUploadRes, TUploadError>, { status: "pending" }>>
  onRemoveFile?: (id: string) => void | Promise<void>
  onFileUploaded?: (result: TUploadRes) => void
  onFileUploadError?: (error: TUploadError) => void
  onAllUploaded?: () => void
  onRootError?: (error: string | undefined) => void
  maxRetryCount?: number
  autoRetry?: boolean
  validation?: {
    accept?: string | string[]
    minSize?: number
    maxSize?: number
    maxFiles?: number
  }
  shiftOnMaxFiles?: boolean
  shapeUploadError?: (error: TUploadError) => string | void
}

export interface UseDropzoneUploadReturn<TUploadRes, TUploadError> {
  getRootProps: ReturnType<typeof useVue3Dropzone>["getRootProps"]
  getInputProps: ReturnType<typeof useVue3Dropzone>["getInputProps"]
  onRemoveFile: (id: string) => Promise<void>
  onRetry: (id: string) => Promise<void>
  canRetry: (id: string) => boolean
  fileStatuses: Ref<FileStatus<TUploadRes, TUploadError>[]>
  isInvalid: Ref<boolean>
  isDragActive: Ref<boolean>
  rootError: Ref<string | undefined>
  inputId: string
  rootMessageId: string
  rootDescriptionId: string
  getFileMessageId: (id: string) => string
}

// Injection key for dropzone context
export const DropzoneContextKey: InjectionKey<UseDropzoneUploadReturn<unknown, unknown>> = Symbol("dropzone-context")

// Injection key for file list item context
export interface DropzoneFileListItemContext<TUploadRes, TUploadError> {
  onRemoveFile: () => Promise<void>
  onRetry: () => Promise<void>
  fileStatus: Ref<FileStatus<TUploadRes, TUploadError>>
  canRetry: Ref<boolean>
  dropzoneId: string
  messageId: string
}

export const DropzoneFileListItemContextKey: InjectionKey<DropzoneFileListItemContext<unknown, unknown>> = Symbol("dropzone-file-list-item-context")

export function useDropzoneUpload<TUploadRes, TUploadError = string>(
  options: UseDropzoneUploadOptions<TUploadRes, TUploadError>,
): UseDropzoneUploadReturn<TUploadRes, TUploadError> {
  const {
    onDropFile: pOnDropFile,
    onRemoveFile: pOnRemoveFile,
    shapeUploadError: pShapeUploadError,
    onFileUploaded: pOnFileUploaded,
    onFileUploadError: pOnFileUploadError,
    onAllUploaded: pOnAllUploaded,
    onRootError: pOnRootError,
    maxRetryCount,
    autoRetry,
    validation,
    shiftOnMaxFiles,
  } = options

  // Generate unique IDs
  const inputId = `dropzone-${getUniqueId()}`
  const rootMessageId = `${inputId}-root-message`
  const rootDescriptionId = `${inputId}-description`

  const rootError = ref<string | undefined>(undefined)
  const fileStatuses = ref<FileStatus<TUploadRes, TUploadError>[]>([])

  const setRootError = (error: string | undefined) => {
    rootError.value = error
    if (pOnRootError !== undefined) {
      pOnRootError(error)
    }
  }

  const isInvalid = computed(() => {
    return (
      fileStatuses.value.filter(file => file.status === "error").length > 0
      || rootError.value !== undefined
    )
  })

  const uploadFile = async (file: File, id: string, tries = 0) => {
    let result: Exclude<DropzoneResult<TUploadRes, TUploadError>, { status: "pending" }>

    try {
      result = await pOnDropFile(file)
    }
    catch (error) {
      // Treat thrown exceptions as errors
      result = { status: "error" as const, error: error as TUploadError }
    }

    if (result.status === "error") {
      const effectiveMax = maxRetryCount ?? 3
      if (autoRetry === true && tries < effectiveMax) {
        // Update status to pending for retry
        const index = fileStatuses.value.findIndex(f => f.id === id)
        const currentFile = fileStatuses.value[index]
        if (index !== -1 && currentFile) {
          fileStatuses.value = [
            ...fileStatuses.value.slice(0, index),
            { ...currentFile, status: "pending" as const, tries: currentFile.tries + 1 },
            ...fileStatuses.value.slice(index + 1),
          ] as FileStatus<TUploadRes, TUploadError>[]
        }
        return uploadFile(file, id, tries + 1)
      }

      // Update status to error
      const index = fileStatuses.value.findIndex(f => f.id === id)
      const currentFile = fileStatuses.value[index]
      if (index !== -1 && currentFile) {
        const shapedError = pShapeUploadError !== undefined
          ? pShapeUploadError(result.error)
          : undefined
        fileStatuses.value = [
          ...fileStatuses.value.slice(0, index),
          { ...currentFile, status: "error" as const, error: result.error, shapedError },
          ...fileStatuses.value.slice(index + 1),
        ] as FileStatus<TUploadRes, TUploadError>[]

        if (pOnFileUploadError !== undefined) {
          pOnFileUploadError(result.error)
        }
      }
      return
    }

    // Update status to success
    const index = fileStatuses.value.findIndex(f => f.id === id)
    const currentFile = fileStatuses.value[index]
    if (index !== -1 && currentFile) {
      fileStatuses.value = [
        ...fileStatuses.value.slice(0, index),
        { ...currentFile, status: "success" as const, result: result.result },
        ...fileStatuses.value.slice(index + 1),
      ] as FileStatus<TUploadRes, TUploadError>[]

      if (pOnFileUploaded !== undefined) {
        pOnFileUploaded(result.result)
      }
    }
  }

  const onRemoveFile = async (id: string) => {
    await pOnRemoveFile?.(id)
    fileStatuses.value = fileStatuses.value.filter(f => f.id !== id)
  }

  const canRetry = (id: string): boolean => {
    const fileStatus = fileStatuses.value.find(file => file.id === id)
    const effectiveMax = maxRetryCount ?? 3
    return (
      fileStatus?.status === "error"
      && fileStatus.tries <= effectiveMax
    )
  }

  const onRetry = async (id: string) => {
    if (!canRetry(id)) {
      return
    }
    const fileStatus = fileStatuses.value.find(file => file.id === id)
    if (!fileStatus || fileStatus.status !== "error") {
      return
    }

    // Update status to pending
    const index = fileStatuses.value.findIndex(f => f.id === id)
    const currentFile = fileStatuses.value[index]
    if (index !== -1 && currentFile) {
      fileStatuses.value = [
        ...fileStatuses.value.slice(0, index),
        { ...currentFile, status: "pending" as const, tries: currentFile.tries + 1 },
        ...fileStatuses.value.slice(index + 1),
      ] as FileStatus<TUploadRes, TUploadError>[]
    }

    await uploadFile(fileStatus.file, id)
  }

  const getFileMessageId = (id: string) => `${inputId}-${id}-message`

  const onDropAccepted = async (acceptedFiles: InputFile[]) => {
    setRootError(undefined)

    const newFiles = acceptedFiles.filter((f): f is File => f instanceof File)
    const fileCount = fileStatuses.value.length
    const maxNewFiles
      = validation?.maxFiles === undefined
        ? Infinity
        : validation.maxFiles - fileCount

    if (maxNewFiles < newFiles.length) {
      if (!shiftOnMaxFiles) {
        setRootError(getRootError(["too-many-files"], validation ?? {}))
      }
    }

    // When shiftOnMaxFiles is true, clamp to maxFiles capacity upfront
    let slicedNewFiles
      = shiftOnMaxFiles === true && validation?.maxFiles !== undefined
        ? newFiles.slice(0, validation.maxFiles)
        : (shiftOnMaxFiles === true ? newFiles : newFiles.slice(0, maxNewFiles))

    if (shiftOnMaxFiles === true && validation?.maxFiles !== undefined) {
      // Calculate how many files need to be removed
      const removalsNeeded = Math.max(0, fileStatuses.value.length + slicedNewFiles.length - validation.maxFiles)

      // Remove oldest files sequentially
      for (let i = 0; i < removalsNeeded; i++) {
        const oldestFile = fileStatuses.value[0]
        if (oldestFile) {
          await onRemoveFile(oldestFile.id)
        }
      }

      // Recalculate remaining capacity after removals
      const remainingCapacity = Math.max(0, validation.maxFiles - fileStatuses.value.length)
      slicedNewFiles = newFiles.slice(0, remainingCapacity)
    }

    // Process files sequentially to avoid race conditions
    const batchIds: string[] = []
    for (const file of slicedNewFiles) {
      const id = `file-${getUniqueId()}`
      batchIds.push(id)
      const newFileStatus: FileStatus<TUploadRes, TUploadError> = {
        id,
        fileName: file.name,
        file,
        status: "pending",
        tries: 1,
      }
      fileStatuses.value = [...fileStatuses.value, newFileStatus] as FileStatus<TUploadRes, TUploadError>[]
      await uploadFile(file, id)
    }

    // Only call pOnAllUploaded if batch had files and all succeeded
    if (pOnAllUploaded !== undefined && batchIds.length > 0) {
      const allSuccessful = batchIds.every(id =>
        fileStatuses.value.find(f => f.id === id)?.status === "success",
      )
      if (allSuccessful) {
        pOnAllUploaded()
      }
    }
  }

  const onDropRejected = (fileRejections: FileRejectReason[]) => {
    const errorMessage = getRootError(
      getDropZoneErrorCodes(fileRejections),
      validation ?? {},
    )
    setRootError(errorMessage)
  }

  const dropzone = useVue3Dropzone({
    accept: validation?.accept,
    minSize: validation?.minSize ?? 0,
    maxSize: validation?.maxSize ?? Infinity,
    onDropAccepted,
    onDropRejected,
  })

  return {
    getRootProps: dropzone.getRootProps,
    getInputProps: dropzone.getInputProps,
    inputId,
    rootMessageId,
    rootDescriptionId,
    getFileMessageId,
    onRemoveFile,
    onRetry,
    canRetry,
    fileStatuses: fileStatuses as Ref<FileStatus<TUploadRes, TUploadError>[]>,
    isInvalid,
    rootError,
    isDragActive: dropzone.isDragActive,
  }
}
