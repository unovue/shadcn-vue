import MagicString from 'magic-string';

interface TransformerOptions {
    /**
     * The function names to be transformed.
     *
     * @default ['withAsyncContext', 'callAsync']
     */
    asyncFunctions?: string[];
    /**
     * @default 'unctx'
     */
    helperModule?: string;
    /**
     * @default 'executeAsync'
     */
    helperName?: string;
    /**
     * Whether to transform properties of an object defined with a helper function. For example,
     * to transform key `middleware` within the object defined with function `defineMeta`, you would pass:
     * `{ defineMeta: ['middleware'] }`.
     * @default {}
     */
    objectDefinitions?: Record<string, string[]>;
}
declare function createTransformer(options?: TransformerOptions): {
    transform: (code: string, options_?: {
        force?: false;
    }) => {
        code: string;
        magicString: MagicString;
    };
    shouldTransform: (code: string) => boolean;
};

export { TransformerOptions, createTransformer };
