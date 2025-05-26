require('dotenv').config()

const url = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const PORT = process.env.PORT || 3001

module.exports = {
  MONGODB_URI: url,
  PORT
}
