// eslint-disable-next-line no-undef
cardTextOption = {
  cardSpan: 12,
  cardType: "similarityText",
  data: [],
  gotoWebClick: function(item, index) {
    console.log(index);
    item.viewNum++;
  },
  // eslint-disable-next-line no-unused-vars
  authorClick: function(item, index) {
    this.$message.success("点击了上传者头像！");
    console.log(JSON.stringify(item));
  },
  // eslint-disable-next-line no-unused-vars
  iconLoveClick: function(item, index) {
    this.$message.success("点击了收藏键！");
    item.likeNum++;
    console.log(JSON.stringify(item));
  }
};
