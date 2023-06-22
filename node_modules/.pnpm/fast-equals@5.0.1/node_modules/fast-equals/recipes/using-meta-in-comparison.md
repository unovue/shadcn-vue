# Using `meta` in comparison

Sometimes a "pure" equality between two objects is insufficient, because the comparison relies on some external state. While these kinds of scenarios should generally be avoided, it is possible to handle them with a custom internal comparator that checks `meta` values.

```ts
import { createCustomEqual } from 'fast-equals';

interface Meta {
  value: string;
}

const meta: Meta = { value: 'baz' };

const deepEqual = createCustomEqual<Meta>({
  createInternalComparator:
    (compare) => (a, b, _keyA, _keyB, _parentA, _parentB, state) =>
      compare(a, b, state) || a === state.meta.value || b === state.meta.value,
  createState: () => ({ meta }),
});
```
