/**
 * WebPack配置文件
 * @author  sample
 * @date    2019/06/30
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist", // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap

  // 加了这个必须在index.html网页中引入这些组件，也即通过CDN获取
  /*configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT"
    };
  },*/
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
    config.resolve.alias.set("components", resolve("packages/components"));
    config.module.rules.delete("svg");
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  }
};
