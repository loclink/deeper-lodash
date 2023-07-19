# deeper-lodash

## 概述：

递归处理数据，有时我们需要递归地从对象或者数组中处理某些数据。  
`deeper-lodash` 解决了这个问题并仅使用 `lodash` 作为外部依赖项。
`deeper-lodash` 使用了 `Vite` 作为打包构建工具。而最终构建的浏览器兼容目标，使用的是`Vite` 特有的值：`modules`，这是指支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。`Vite` 将替换 `modules` 为 `['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']`

## 特征：

- 支持 ESM、CommonJS、CDN 三种导入方式
- 递归匹配 value 从数据中排除
- 递归匹配 key 从数据中排除
- 递归的将数据中的空值排除

## 使用：

### `nodejs`项目中使用：

- 安装：

```sh
npm install deeper-lodash
```

- ES6 Module：

```ts
import { deepOmitNil } from 'deeper-lodash';
deepOmitNil({ name: 'loclink', age: 18, aaa: undefined, bbb: null, ccc: NaN });
```

- CommonJS

```ts
// 递归过滤空值
const { deepOmitNil } = require('deeper-lodash');
deepOmitNil({ name: 'loclink', age: 18, aaa: undefined, bbb: null, ccc: NaN });
```

### CDN 方式使用：

- CDN 方式中所有成员变量都可以在`DeeperLodash`命名空间下被使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/deeper-lodash/dist/index.min.js"></script>
    <script>
      DeeperLodash.deepOmitNil({
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
  递归过滤空值
- params:

  - `data`:
    - type: `Array | PlainObject`
    - summary:  
      数组或普通对象，即由对象构造函数创建的对象还是具有原型为空的对象。

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
  递归匹配 value 过滤
- params:

  - `data`:
    - type: `Array | PlainObject`
    - summary:  
      数组或普通对象，即由对象构造函数创建的对象还是具有原型为空的对象。
  - `props`:
    - type: `(string | number | boolean | undefined | null)[]`
    - summary:  
      需要过滤的值

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
  递归匹配 key 过滤
- params:

  - `data`:
    - type: `Array | PlainObject`
    - summary:  
      数组或普通对象，即由对象构造函数创建的对象还是具有原型为空的对象。
  - `props`:
    - type: `string[]`
    - summary:  
      需要过滤的值

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
