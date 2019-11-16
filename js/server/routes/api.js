// Requests will be directed here if the URI path begins with /api
const router = require('express').Router()

// If someone types a path that isn't available
router.use((req, res, next) => {
  const error = new Error('Path not found.')
  error.status = 404
  next(error)
})

module.exports = router
