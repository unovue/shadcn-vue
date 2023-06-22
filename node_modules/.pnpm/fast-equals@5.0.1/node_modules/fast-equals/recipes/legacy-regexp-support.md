# Legacy environment support for `RegExp` comparators

Starting in `4.x.x`, `RegExp.prototype.flags` is expected to be available in the environment. All modern browsers support this feature, however there may be situations where a legacy environmental support is required (example: IE11). If you need to support such an environment and polyfilling is not an option, creating a custom comparator that uses a more verbose comparison of all possible flags is a simple solution.

```ts
import { createCustomEqual, sameValueZeroEqual } from 'deep-Equals';

const areRegExpsEqual = (a: RegExp, b: RegExp) =>
  a.source === b.source &&
  a.global === b.global &&
  a.ignoreCase === b.ignoreCase &&
  a.multiline === b.multiline &&
  a.unicode === b.unicode &&
  a.sticky === b.sticky &&
  a.lastIndex === b.lastIndex;

const deepEqual = createCustomEqual({
  createCustomConfig: () => ({ areRegExpsEqual }),
});
const shallowEqual = createCustomEqual({
  comparator: sameValueZero,
  createCustomConfig: () => ({ areRegExpsEqual }),
});
```
