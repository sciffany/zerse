const { injectBabelPlugin } = require("react-app-rewired")

const rootImportConfig = [
  "root-import",

  {
    rootPathPrefix: "src",
    rootPathSuffix: "src"
  }
]

module.export = config => injectBabelPlugin(rootImportConfig, config)
