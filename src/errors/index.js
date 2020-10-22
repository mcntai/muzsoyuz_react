const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message)
    alert(message)
  }
}

module.exports = {
  assert,
}