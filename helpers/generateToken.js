const jwt = require('jsonwebtoken')

function GenerateToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SIGNATURE)
  } catch (error) {
    return undefined
  }
}

function VerifyToken(access_token) {
    try {
        return jwt.verify(access_token, process.env.JWT_SIGNATURE)
      } catch(err) {
        return undefined
      }
}

module.exports = {
    GenerateToken,
    VerifyToken
}