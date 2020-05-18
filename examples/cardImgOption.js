// eslint-disable-next-line no-undef
cardImgOption = {
  cardSpan: 4,
  preview: true,
  data: [],
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
  }
};
