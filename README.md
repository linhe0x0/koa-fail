# koa-fail

Koa middleware which can be configured to fail and increase latency at random.

## Installation

```sh
yarn add koa-fail

# Or use npm:
npm install koa-fail
```

## Usage

```js
const Koa = require('koa')
const fail = require('koa-fail')

const app = new Koa()

app.use(fail(options))
```

### Options

Options can be setup during initialization , or in query string of every incoming request.

#### maxDelay

Type: `Number`

Default: `2000`

Max delay in milliseconds. Example of 200ms: `?maxDelay=200`.

#### errorRate

Type: `Number`

Default: `3`

Error rate. Example of 1/3 failures: `?errorRate=3`.

#### force

Type: `Boolean`

Force to enable failure. By default, it is enabled only in the development environment by `process.env.NODE_ENV === 'development'`.

---

> [sqrtthree.com](http://sqrtthree.com/) &nbsp;&middot;&nbsp;
> GitHub [@sqrthree](https://github.com/sqrthree) &nbsp;&middot;&nbsp;
> Twitter [@sqrtthree](https://twitter.com/sqrtthree)
