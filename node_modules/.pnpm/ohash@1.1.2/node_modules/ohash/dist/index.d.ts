interface HashOptions {
    /**
     *
     */
    excludeKeys?: ((key: string) => boolean) | undefined;
    /**
     * hash object keys, values ignored
     */
    excludeValues?: boolean | undefined;
    /**
     * ignore unknown object types
     */
    ignoreUnknown?: boolean | undefined;
    /**
     * optional function that replaces values before hashing
     */
    replacer?: ((value: any) => any) | undefined;
    /**
     * consider 'name' property of functions for hashing
     */
    respectFunctionNames?: boolean | undefined;
    /**
     * consider function properties when hashing
     */
    respectFunctionProperties?: boolean | undefined;
    /**
     * Respect special properties (prototype, letructor) when hashing to distinguish between types
     */
    respectType?: boolean | undefined;
    /**
     * Sort all arrays before hashing
     */
    unorderedArrays?: boolean | undefined;
    /**
     * Sort `Set` and `Map` instances before hashing
     */
    unorderedObjects?: boolean | undefined;
    /**
     * Sort `Set` and `Map` instances before hashing
     */
    unorderedSets?: boolean | undefined;
}
/**
 * Hash any JS value into a string with murmur v3 hash
 * @param {object} object value to hash
 * @param {HashOptions} options hashing options
 * @return {string} hash value
 * @api public
 */
declare function objectHash(object: any, options?: HashOptions): string;

/**
 * Hash any JS value into a string
 * @param {object} object value to hash
 * @param {HashOptions} options hashing options
 * @return {string} hash value
 * @api public
 */
declare function hash(object: any, options?: HashOptions): string;

/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 *
 * @param {Uint8Array | string} key ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */
declare function murmurHash(key: Uint8Array | string, seed?: number): number;

declare function sha256(message: string): string;
declare function sha256base64(message: string): string;

/**
 * Compare two objects using reference equality and stable deep hashing.
 * @param {any} object1 First object
 * @param {any} object2 Second object
 * @param {HashOptions} hash options
 * @return {boolean} true if equal and false if not
 * @api public
 */
declare function isEqual(object1: any, object2: any, hashOptions?: HashOptions): boolean;

declare function diff(obj1: any, obj2: any, opts?: HashOptions): DiffEntry[];
declare class DiffEntry {
    key: string;
    type: "changed" | "added" | "removed";
    newValue: DiffHashedObject;
    oldValue?: DiffHashedObject;
    constructor(key: string, type: "changed" | "added" | "removed", newValue: DiffHashedObject, oldValue?: DiffHashedObject);
    toString(): string;
    toJSON(): string;
}
declare class DiffHashedObject {
    key: string;
    value: any;
    hash?: string;
    props?: Record<string, DiffHashedObject>;
    constructor(key: string, value: any, hash?: string, props?: Record<string, DiffHashedObject>);
    toString(): string;
    toJSON(): string;
}

export { diff, hash, isEqual, murmurHash, objectHash, sha256, sha256base64 };
