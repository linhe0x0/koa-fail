const http = require('http')

const randomInt = function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

const sleep = function sleep(time) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

module.exports = function failMiddleware(options) {
  if (!options) {
    options = {}
  }

  if (!options.maxDelay) {
    options.maxDelay = 2000
  }

  if (!options.errorRate) {
    options.errorRate = 3
  }

  return async function fail(ctx, next) {
    const maxDelay =
      parseInt(
        ctx.query.maxDelay || ctx.query.max_delay || ctx.query['max-delay']
      ) || options.maxDelay
    const errorRate =
      parseInt(
        ctx.query.errorRate || ctx.query.error_rate || ctx.query['error-rate']
      ) || options.errorRate
    const force = options.force || ctx.query.force === 'true'

    // Enabled by default only in the development environment.
    if (process.env.NODE_ENV !== 'development' && force !== true) {
      return next()
    }

    const delayRand = randomInt(0, maxDelay)

    if (delayRand) {
      await sleep(delayRand)
    }

    if (!errorRate) {
      return next()
    }

    const errorRand = randomInt(0, errorRate)

    if (errorRand > 0) {
      return next()
    }

    const statusRand = randomInt(0, 2)
    const statusCode = statusRand > 0 ? 400 : 500

    ctx.throw(statusCode, options.message || http.STATUS_CODES[statusCode])
  }
}
