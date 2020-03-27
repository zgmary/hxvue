// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);
// import all svg
const req = require.context(
  "./svg", // 其组件目录的相对路径
  false, // 是否查询其子目录
  /\.svg$/ // 匹配基础组件文件名的正则表达式
);
requireAll(req);
