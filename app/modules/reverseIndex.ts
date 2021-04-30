const reverseIndex = (currentIndex: number, length: number) => {
  const diff = `0${length - currentIndex}`
  return diff.slice(-2)
}

module.exports = { reverseIndex }
