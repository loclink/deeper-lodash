# deeper-lodash

## Overview:

Recursively process data, sometimes we need to recursively process some data from objects or arrays.  
Review: [中文文档](/readme/README.zh.md) | English Document  
`deeper-lodash` solves this problem and only uses `lodash` as an external dependency.
`deeper-lodash` uses `Vite` as the packaging and building tool. The final browser compatibility target is built using `Vite`'s unique value: `modules`, which refers to browsers that support native ES modules, native ESM dynamic imports and import.meta. `Vite` will replace `modules` with `['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']`

## Features:

- Supports ESM, CommonJS, CDN three ways of importing
- Recursively match value to exclude from data
- Recursively match key to exclude from data
- Recursively exclude empty values from data

## Usage:

### Use in nodejs project:

- Installation:

```sh
npm install deeper-lodash
```

- ES6 Module:

```ts
import { deepOmitNil } from 'deeper-lodash';
deepOmitNil({ name: 'loclink', age: 18, aaa: undefined, bbb: null, ccc: NaN });
```

- CommonJS:

```ts
// Recursively filter out empty values
const { deepOmitNil } = require('deeper-lodash');
deepOmitNil({ name: 'loclink', age: 18, aaa: undefined, bbb: null, ccc: NaN });
```

### Use with CDN:

- In CDN mode, all member variables can be used under the `_DL` namespace.
- But lodash as an external dependency library of this project, so when using this way of importing, lodash cannot be read and automatically installed to the project as in nodejs project, so you also need to manually import lodash and ensure that the namespace: `_` exists and works normally.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/deeper-lodash/dist/index.min.js"></script>
    <script>
      _DL.deepOmitNil({
        name: 'loclink',
        age: 18,
        aaa: undefined,
        bbb: null,
        ccc: NaN
      });
    </script>
  </body>
</html>
```

### deepOmitNil:

- summary:  
  Recursively filter out empty values
- params:

  - `data`:
    - type: `Array | PlainObject`
    - summary:  
      Array or plain object, i.e., an object created by the object constructor or an object with a prototype of null.

  ```ts
  import { deepOmitNil } from 'deeper-lodash';
  deepOmitNil({
    name: 'loclink',
    age: 18,
    aaa: undefined,
    bbb: null,
    ccc: NaN,
    ddd: [
      undefined,
      {
        name: 'qwe'
      }
    ]
  });
  // => {
  //     "name": "loclink",
  //     "age": 18,
  //     "ddd": [
  //         {
  //             "name": "qwe"
  //         }
  //     ]
  //   }
  ```

### deepOmitByValues

- summary:  
  Recursively match value filtering
- params:

  - `data`:
    - type: `Array | PlainObject`
    - summary:  
      Array or plain object, i.e., an object created by the object constructor or an object with a prototype of null.
  - `props`:
    - type: `(string | number | boolean | undefined | null)[]`
    - summary:  
      Values to be filtered

  ```ts
  import { deepOmitByValues } from 'deeper-lodash';
  deepOmitByValues(
    {
      name: 'loclink',
      age: 18,
      aaa: undefined,
      bbb: null,
      ccc: NaN,
      ddd: [
        undefined,
        {
          name: 'qwe'
        }
      ]
    },
    ['qwe', 18]
  );

  /**
   *
   => {
      name: 'loclink',
      aaa: undefined,
      bbb: null,
      ccc: NaN,
      ddd: [
        undefined,
        {}
      ]
    }
  *
  */
  ```

### deepOmitByKeys

- summary:  
  Recursively match key filtering
- params:

  - `data`:
    - type: `Array | PlainObject`
    - summary:  
      Array or plain object, i.e., an object created by the object constructor or an object with a prototype of null.
  - `props`:
    - type: `string[]`
    - summary:  
      Keys to be filtered

  ```ts
  import { deepOmitByKeys } from 'deeper-lodash';
  deepOmitByKeys(
    {
      name: 'loclink',
      age: 18,
      aaa: undefined,
      bbb: null,
      ccc: NaN,
      ddd: [
        undefined,
        {
          name: 'qwe'
        }
      ]
    },
    ['name', 'aaa']
  );

  /**
   *
   =>  {
      age: 18,
      bbb: null,
      ccc: NaN,
      ddd: [
        undefined,
        {}
      ]
    }
  *
  */
  ```
