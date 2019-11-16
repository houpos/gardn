// Requests will be directed here if the URI path begins with /api
const router = require('express').Router()

router.get('/', (req, res) => {
  var list = ['item1', 'item2', 'item3']
  res.json(list)
  console.log('Sent list of items')
})

// If someone types a path that isn't available
router.use((req, res, next) => {
  const error = new Error('Path not found.')
  error.status = 404
  next(error)
})

module.exports = router
