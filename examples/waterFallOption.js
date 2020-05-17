// eslint-disable-next-line no-undef
waterFallOption = {
  gutter: 10,
  // imgWidth: 250,
  pageWidth: "90%",
  preview: true,
  isLoaded: true,
  authorClick: function(item, index) {
    this.$message.success("开始加载同一用户上传的图片数据:" + index);
    console.log(JSON.stringify(item));
  },
  iconLoveClick: function(item, index) {
    item.likeNum++;
    console.log(index, JSON.stringify(item));
  },
  downLoadClick: function(item, index) {
    item.downLoadNum++;
    console.log(index, JSON.stringify(item));
  },
  searchClick: function(item, index) {
    this.$message.success("开始搜索同类相似图片:" + index);
    console.log(index, JSON.stringify(item));
  },
  getLoadedImageNum: function(imageNum) {
    this.$message.success("已经加载图片数:" + imageNum);
    console.log("已经加载图片数:" + imageNum);
  },
  getLoadStatus(loadStatus) {
    this.option.isLoaded = loadStatus;
  }
};
