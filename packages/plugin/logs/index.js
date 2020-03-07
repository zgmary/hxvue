const log = {};
const levelInfo = {
  ALL: 0,
  DEBUG: 1,
  NOTE: 2,
  WARN: 3,
  ERROR: 4,
  NO_INFO: 5
};
let currentLevel = levelInfo["ERROR"];
/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
function typeColor(type = "default") {
  let color = "";
  switch (type) {
    case "default":
      color = "#35495E";
      break;
    case "primary":
      color = "#3488ff";
      break;
    case "success":
      color = "#43B883";
      break;
    case "warning":
      color = "#e6a23c";
      break;
    case "danger":
      color = "#f56c6c";
      break;
    default:
      break;
  }
  return color;
}

log.setLevel = function(text = "DEBUG") {
  currentLevel = levelInfo[text];
  console.log("curLogLevel = " + text);
};
/**
 * @description 打印一个 [ title | text ] 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 * @param {String} level
 * @param {String} type style
 */
log.capsule = function(level, title, info, type = "primary") {
  if (levelInfo[level] >= currentLevel) {
    console.log(
      `%c[${level}] %c ${title} %c ${info} %c`,
      "background:#f56c6c; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
      "background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
      `background:${typeColor(
        type
      )}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
      "background:transparent"
    );
  }
};

/**
 * @description 打印彩色文字
 */
log.colorful = function(level, textArr) {
  if (levelInfo[level] >= currentLevel) {
    console.log(
      `%c[${level}] ${textArr.map(t => t.text || "").join("%c")}`,
      ...textArr.map(t => `color: ${typeColor(t.type)};`)
    );
  }
};

/**
 * @description 打印 default 样式的文字
 */
log.all = function(text) {
  log.colorful("ALL", [{ text }]);
};

/**
 * @description 打印 primary 样式的文字
 */
log.debug = function(text) {
  log.colorful("DEBUG", [{ text, type: "primary" }]);
};

/**
 * @description 打印 success 样式的文字
 */
log.note = function(text) {
  log.colorful("NOTE", [{ text, type: "success" }]);
};

/**
 * @description 打印 warning 样式的文字
 */
log.warn = function(text) {
  log.colorful("WARN", [{ text, type: "warning" }]);
};

/**
 * @description 打印 danger 样式的文字
 */
log.error = function(text) {
  log.colorful("ERROR", [{ text, type: "danger" }]);
};

export default log;
