// eslint-disable-next-line no-undef
cardFlagOption = {
  pageWidth: "70%",
  cardSpan: 6,
  gotoWebClick: function(item, index) {
    console.log(index);
    item.viewNum++;
  },
  iconLoveClick: function(item, index) {
    console.log(index);
    item.likeNum++;
  },
  data: []
};
