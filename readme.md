# Spark Logger ⚡️

> A logger built on [TypeScript](https://typescriptlang.org) <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" width="15">

## **Installation**

- To install, run `npm i @spark.ts/logger`.
- Usage:

## **Example Usage**

**TypeScript / ESM**
```ts
import { Logger } from '@spark.ts/logger';

const logger = new Logger();
logger.error('An error occured');
```

**CommonJS**
```js
const { Logger } = require('@spark.ts/logger');

const logger = new Logger();
logger.error('An error occured');
```

**NOTE:** You can use all of the functions from the regular console, such as `console.log('hello world')` becomes `logger.log('hello world')`

## **Types**

- There are built-in type declarations, the options for `new Logger();` are below:

```ts
new Logger({
  logLevel: 'success' | 'error' | 'warn' | 'debug' | 'info', // Defaults to 'success'
  logStyle: 'highlight' | 'bracket', // Defaults to 'highlight'
});
```

## **Images**

**Highlight Style:**

![](./images/highlight.png)

**Bracket Style:**

![](./images/bracket.png)