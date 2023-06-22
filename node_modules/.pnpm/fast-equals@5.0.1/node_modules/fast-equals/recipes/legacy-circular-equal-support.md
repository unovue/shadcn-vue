# Legacy environment support for circular equal comparators

Starting in `4.x.x`, `WeakMap` is expected to be available in the environment. All modern browsers support this global object, however there may be situations where a legacy environmental support is required (example: IE11). If you need to support such an environment and polyfilling is not an option, creating a custom comparator that uses a custom cache implementation with the same contract is a simple solution.

```ts
import { createCustomEqual, sameValueZeroEqual } from 'fast-equals';
import type { Cache } from 'fast-equals';

function getCache(): Cache<any, any> {
  const entries: Array<[object, any]> = [];

  return {
    delete(key) {
      for (let index = 0; index < entries.length; ++index) {
        if (entries[index][0] === key) {
          entries.splice(index, 1);
          return true;
        }
      }

      return false;
    },

    get(key) {
      for (let index = 0; index < entries.length; ++index) {
        if (entries[index][0] === key) {
          return entries[index][1];
        }
      }
    },

    set(key, value) {
      for (let index = 0; index < entries.length; ++index) {
        if (entries[index][0] === key) {
          entries[index][1] = value;
          return this;
        }
      }

      entries.push([key, value]);

      return this;
    },
  };
}

interface Meta {
  customMethod(): void;
  customValue: string;
}

const meta = {
  customMethod() {
    console.log('hello!');
  },
  customValue: 'goodbye',
};

const circularDeepEqual = createCustomEqual<Cache>({
  circular: true,
  createState: () => ({
    cache: getCache(),
    meta,
  }),
});

const circularShallowEqual = createCustomEqual<Cache>({
  circular: true,
  comparator: sameValueZeroEqual,
  createState: () => ({
    cache: getCache(),
    meta,
  }),
});
```
