<template>
  <el-row
    :gutter="gutter"
    :style="{ margin: '0 auto', width: setPx(pageWidth) }"
  >
    <el-col
      :class="computedClass"
      :xl="cardSpan"
      :lg="6"
      :md="8"
      :xs="12"
      v-for="(item, index) in cardData"
      :key="index"
    >
      <div class="card" :title="item.content">
        <div class="card-head">
          <div class="card-head-icon">
            <i
              :class="iconLove"
              :style="{ color: item.color || 'red' }"
              @click="iconLoveClick ? iconLoveClick(item, index) : ''"
            ></i>
            <span>{{ item.likeNum }}</span>
          </div>
          <div class="card-head-icon">
            <i :class="iconView" :style="{ color: item.color || 'red' }"></i>
            <span>{{ item.viewNum }}</span>
          </div>
        </div>
        <a
          :href="item.href || 'javascript:void(0);'"
          @click="gotoWebClick ? gotoWebClick(item, index) : ''"
          :target="item.target"
        >
          <div class="card-body">
            <img
              class="card-body-img"
              :src="item.logoUrl"
              object-fit="fill"
              alt="图像获取失败！"
            />
            <div class="card-body-info">
              <span class="card-body-info-title">{{ item.title }}</span>
              <span
                class="card-body-info-tag"
                v-for="(tagItem, tagIndex) in item.tag"
                :key="tagIndex"
              >
                {{ tagItem }}
              </span>
              <span class="card-body-info-arrow">
                <i class="el-icon-right"></i>
              </span>
              <div class="card-body-info-content">{{ item.content }}</div>
            </div>
          </div>
        </a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import create from "../../core/create";

export default create({
  name: "cardflag",
  data() {
    return {
      iconLove: this.option.iconLove || "el-icon-star-off",
      iconView: this.option.iconView || "el-icon-view",
      iconLoveClick: this.option.iconLoveClick,
      gotoWebClick: this.option.gotoWebClick
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    computedClass() {
      return { "el-col-4-8": 5 === this.option.cardSpan };
    },
    pageWidth() {
      return this.option.pageWidth || "80%";
    },
    cardSpan() {
      return this.option.cardSpan || 4;
    },
    gutter() {
      return this.option.gutter || 20;
    },
    cardData() {
      return this.option.data || [];
    }
  }
});
</script>

<style scoped lang="scss">
$time: 0.5s;
@mixin text-display() {
  //超出内容隐藏
  overflow: hidden;
  //内容不换行
  white-space: nowrap;
  //设置超出内容为省略号
  text-overflow: ellipsis;
}
.el-col-4-8 {
  width: 20%;
}
.card {
  border: 1px solid darkgray;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px #55504c;
  position: relative;
  bottom: 0;
  height: 100px;
  margin-bottom: 16px;
  font-size: 13px;
  background-color: #fff;
  //过渡效果
  transition: bottom $time;
  &:hover {
    bottom: -5px;
    .card-body-info-arrow {
      visibility: visible;
    }
    .card-body-img {
      width: 45px;
      height: 45px;
    }
  }
  a {
    text-decoration: none;
  }
  //采用flex布局之后不用分别对left和right进行float
  &-head {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    &-icon {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);
      i {
        font-size: 16px;
      }
      span {
        margin-left: 5px;
      }
    }
  }
  &-body {
    display: flex;
    padding: 5px 10px;
    &-img {
      $size: 40px;
      width: $size;
      height: $size;
      border-radius: $size;
      transition: width $time, height $time;
      flex-shrink: 0;
    }
    &-info {
      margin-left: 10px;
      color: rgba(0, 0, 0, 0.45);
      @include text-display;
      &-title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
      }
      &-tag {
        margin-left: 10px;
        background-color: gainsboro;
        border-radius: 3px;
      }
      &-arrow {
        position: absolute;
        right: 10px;
        visibility: hidden;
        transition: visibility $time;
      }
      &-content {
        padding-top: 5px;
        @include text-display;
      }
    }
  }
}
</style>
