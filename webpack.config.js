module.exports = {
  entry: "./javascripts/entry.js",
  output: {
    path: "public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
}
