// eslint-disable-next-line no-undef
cardImgOption = {
  cardSpan: 4,
  preview: true,
  data: [],
  menuArr: [
    {
      menuType: "avatar"
    },
    {
      menuType: "space"
    },
    {
      menuType: "space"
    },
    {
      menuType: "space"
    },
    {
      menuType: "icon",
      iconName: "el-icon-star-off",
      itemKey: "likeNum"
    },
    {
      menuType: "icon",
      iconName: "el-icon-download",
      itemKey: "downLoadNum"
    },
    {
      menuType: "icon",
      iconName: "el-icon-search"
    }
  ],
  menuClick: function(item, index, menuItem, menuIndex) {
    this.$message.success("点击菜单:" + index + ", " + menuIndex);
    if (0 === menuIndex)
      this.$message.success("开始加载同一用户上传的图片数据:" + index);
    if (4 === menuIndex) item.likeNum++;
    if (5 === menuIndex) item.downLoadNum++;
    if (6 === menuIndex) this.$message.success("开始搜索同类相似图片:" + index);
    console.log(JSON.stringify(item));
    console.log(JSON.stringify(menuItem));
  }
};
