export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}
/**
 * 生成随机数
 */
export function randomId() {
  let $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let maxPos = $chars.length;
  let id = "";
  for (let i = 0; i < 16; i++) {
    id += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return id;
}
