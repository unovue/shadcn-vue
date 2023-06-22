'use strict';

const node_fs = require('node:fs');
const node_path = require('node:path');
const abortController = require('./node-fetch-native.dfc63e20.cjs');

const { stat } = node_fs.promises;

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 */
const blobFromSync = (path, type) => fromBlob(node_fs.statSync(path), path, type);

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 * @returns {Promise<Blob>}
 */
const blobFrom = (path, type) => stat(path).then(stat => fromBlob(stat, path, type));

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 * @returns {Promise<File>}
 */
const fileFrom = (path, type) => stat(path).then(stat => fromFile(stat, path, type));

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 */
const fileFromSync = (path, type) => fromFile(node_fs.statSync(path), path, type);

// @ts-ignore
const fromBlob = (stat, path, type = '') => new abortController._Blob([new BlobDataItem({
  path,
  size: stat.size,
  lastModified: stat.mtimeMs,
  start: 0
})], { type });

// @ts-ignore
const fromFile = (stat, path, type = '') => new abortController.File([new BlobDataItem({
  path,
  size: stat.size,
  lastModified: stat.mtimeMs,
  start: 0
})], node_path.basename(path), { type, lastModified: stat.mtimeMs });

/**
 * This is a blob backed up by a file on the disk
 * with minium requirement. Its wrapped around a Blob as a blobPart
 * so you have no direct access to this.
 *
 * @private
 */
class BlobDataItem {
  #path
  #start

  constructor (options) {
    this.#path = options.path;
    this.#start = options.start;
    this.size = options.size;
    this.lastModified = options.lastModified;
  }

  /**
   * Slicing arguments is first validated and formatted
   * to not be out of range by Blob.prototype.slice
   */
  slice (start, end) {
    return new BlobDataItem({
      path: this.#path,
      lastModified: this.lastModified,
      size: end - start,
      start: this.#start + start
    })
  }

  async * stream () {
    const { mtimeMs } = await stat(this.#path);
    if (mtimeMs > this.lastModified) {
      throw new abortController.DOMException('The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.', 'NotReadableError')
    }
    yield * node_fs.createReadStream(this.#path, {
      start: this.#start,
      end: this.#start + this.size - 1
    });
  }

  get [Symbol.toStringTag] () {
    return 'Blob'
  }
}

exports.blobFrom = blobFrom;
exports.blobFromSync = blobFromSync;
exports.fileFrom = fileFrom;
exports.fileFromSync = fileFromSync;
