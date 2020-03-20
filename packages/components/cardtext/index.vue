<template>
  <div class="card">
    <el-row :span="24" :gutter="gutter">
      <el-col
        :md="cardSpan"
        :xs="12"
        :sm="8"
        v-for="(item, index) in this.cardData"
        :key="index"
      >
        <el-card class="card-item" shadow="hover">
          <a
            :href="item.href || 'javascript:void(0);'"
            @click="gotoWebClick ? gotoWebClick(index) : ''"
            :target="item.target"
          >
            <div class="card-body">
              <img class="card-body-logo" :src="item.logoUrl" />
              <div class="=card-body-detail">
                <div class="card-body-detail-title">{{ item.title }}</div>
                <div class="card-body-detail-content">{{ item.content }}</div>
              </div>
            </div>
          </a>
          <div class="card-menu">
            <div
              class="card-menu-author"
              @click="authorClick ? authorClick(index) : ''"
            >
              <el-avatar :size="20" :src="item.authorUrl"></el-avatar>
            </div>
            <div
              class="card-menu-icon"
              @click="iconLoveClick ? iconLoveClick(index) : ''"
            >
              <i :class="iconLove" :style="{ color: item.color || 'red' }"></i>
              <p>{{ item.likeNum }}</p>
            </div>
            <div class="card-menu-icon">
              <i :class="iconView" :style="{ color: item.color || 'red' }"></i>
              <p>{{ item.viewNum }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "../../core/create";
export default create({
  name: "cardtext",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      cardSpan: this.option.cardSpan || 4,
      gotoWebClick: this.option.gotoWebClick,
      authorClick: this.option.authorClick,
      iconLoveClick: this.option.iconLoveClick,
      iconLove: this.option.iconLove || "el-icon-star-off",
      iconView: this.option.iconView || "el-icon-view",
      gutter: this.option.gutter || 20
    };
  },
  computed: {
    cardData: function() {
      return this.option.data || [];
    }
  }
});
</script>

<style scoped lang="scss">
/*网站标签卡片样式*/
@mixin text-display($line-clamp: 1) {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $line-clamp;
}
.card {
  >>> .el-card__body {
    padding: 0;
  }
  &-item {
    margin-bottom: 16px;
    height: 110px;
    font-size: 10px;
    line-height: 1.5;
    background-color: #fff;
    box-sizing: border-box;
    a {
      text-decoration: none;
    }
  }
  &-body {
    display: flex;
    padding: 12px;
    &-logo {
      $logoSize: 36px; //定义局部变量
      height: $logoSize;
      width: $logoSize;
      border-radius: $logoSize;
      margin-right: 12px;
      margin-top: 15px;
    }
    &-detail {
      flex: 1;
      &-title {
        @include text-display;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 6px;
      }
      &-content {
        @include text-display(2);
        height: 32px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
  &-menu {
    display: flex;
    justify-content: space-around;
    height: 28px;
    background: #f7f9fa;
    &-author {
      padding-top: 3px;
    }
    &-icon {
      display: flex;
      align-items: center;
      i {
        font-size: 18px;
      }
      p {
        margin-left: 5px;
      }
    }
  }
}
</style>
