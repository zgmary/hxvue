//生成侧边抽屉演示数据
const sideDrawerButtonInfo = [];
const sideDrawerIconClass = ["el-icon-plus", "el-icon-edit", "el-icon-close"];
const sideDrawerSlotName = ["login", "avatar", "button"];
const sideDrawerTips = ["用户登陆", "用户头像", "文字卡片"];
for (let i = 0; i < 3; i++) {
  sideDrawerButtonInfo.push({
    tips: sideDrawerTips[i],
    btnText: "",
    iconClass: sideDrawerIconClass[i],
    slotName: sideDrawerSlotName[i]
  });
}
// eslint-disable-next-line no-undef
sideDrawerOption = {
  drawerWidth: "420px",
  backgroundColor: "#d3d5d6",
  btnInfo: sideDrawerButtonInfo,
  beforeCloseClick: function(hide) {
    this.$message.success("CLOSE SUCCESS!");
    hide();
  }
};
