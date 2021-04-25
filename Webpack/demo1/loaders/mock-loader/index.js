function mockLoader(source) {
  console.log(source)
  source = source.replace(/component\(\)/g, 'component(document)')
  return source
}

module.exports = mockLoader
