const React = require('react')

// Mock Next.js Image component for Jest tests
module.exports = function Image(props) {
  return React.createElement('img', props)
}
