/**
 * Strip literal using Acorn's tokenizer.
 *
 * Will throw error if the input is not valid JavaScript.
 */
declare function stripLiteralAcorn(code: string): string;
/**
 * Returns a function that returns whether the position is
 * in a literal using Acorn's tokenizer.
 *
 * Will throw error if the input is not valid JavaScript.
 */
declare function createIsLiteralPositionAcorn(code: string): (position: number) => boolean;

/**
 * Strip literal using RegExp.
 *
 * This will be faster and can work on non-JavaScript input.
 * But will have some caveats on distinguish strings and comments.
 */
declare function stripLiteralRegex(code: string): string;

/**
 * Strip literal from code.
 *
 * Using Acorn's tokenizer first, and fallback to Regex if Acorn fails.
 */
declare function stripLiteral(code: string): string;

export { createIsLiteralPositionAcorn, stripLiteral, stripLiteralAcorn, stripLiteralRegex };
