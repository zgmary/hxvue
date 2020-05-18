document.write('<script src="../node_modules/mockjs/dist/mock.js"></script>');
// eslint-disable-next-line no-unused-vars
function loadData(demoData, demoDataNum = 60, dataType = "cardImg") {
  const base = parseInt(Math.random() * 60, 10) + 10;
  for (let i = 0; i < demoDataNum; i++) {
    // eslint-disable-next-line no-undef
    let likeNum = Mock.mock("@integer(1000, 2000)");
    if ("cardFlag" === dataType) {
      // eslint-disable-next-line no-undef
      likeNum = Mock.mock("@integer(1, 100)");
    }
    // eslint-disable-next-line no-undef
    let viewNum = Mock.mock("@integer(1000, 2000)");
    // eslint-disable-next-line no-undef
    let downLoadNum = Mock.mock("@integer(60, 100)");
    let imgHeight = Math.floor(Math.random() * 200 + 150);
    demoData.push({
      thumbUrl: `https://picsum.photos/id/${base + i}/300/${imgHeight}`,
      thumbUrlWidth: 300,
      thumbUrlHeight: `${imgHeight}`,
      imgUrl: `https://picsum.photos/id/${base + i}/600/400`,
      authorUrl: `https://picsum.photos/id/${base + i}/300/200`,
      likeNum: `${likeNum}`,
      downLoadNum: `${downLoadNum}`,
      href: "http://www.163.com",
      target: "_blank",
      logoUrl: `https://picsum.photos/id/${base + i}/300/200`,
      // eslint-disable-next-line no-undef
      title: Mock.mock("@ctitle(3, 8)"),
      // eslint-disable-next-line no-undef
      content: Mock.mock("@cparagraph"),
      tag: ["CN", "收费"],
      viewNum: `${viewNum}`
    });
  }
}

// eslint-disable-next-line no-unused-vars
function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) {
    // 遍历目标
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === "object") {
        // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
