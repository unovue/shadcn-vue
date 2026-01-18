export interface DirectoryRegistry {
  name: string
  description: string
  link: string
  command?: string
  logo: string
}
import directoryJson from '@/registry/directory.json'

export const directoryRegistryList: DirectoryRegistry[] = [...directoryJson]
