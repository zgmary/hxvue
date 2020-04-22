<template>
  <div class="card" :style="{ width: setPx(pageWidth) }">
    <el-row :gutter="gutter">
      <el-col
        :class="computedClass"
        :xl="cardSpan"
        :lg="6"
        :md="8"
        :xs="12"
        v-for="(item, index) in this.cardData"
        :key="index"
      >
        <el-card class="card-item" shadow="hover">
          <a
            :href="[cardMenuSeen ? item.href || 'javascript:void(0);' : '##']"
            @click="
              gotoWebClick && cardMenuSeen ? gotoWebClick(item, index) : ''
            "
            :target="[cardMenuSeen ? item.target : '_self']"
          >
            <div class="card-body">
              <img
                :class="[
                  cardMenuSeen ? 'card-body-logo' : 'card-body-largelogo'
                ]"
                :src="item.logoUrl"
                object-fit="fill"
                alt="图像获取失败！"
              />
              <div class="=card-body-detail">
                <a
                  :href="item.href || 'javascript:void(0);'"
                  @click="
                    gotoWebClick && cardMenuSeen
                      ? ''
                      : gotoWebClick(item, index)
                  "
                  :target="item.target"
                >
                  <div class="card-body-detail-title">{{ item.title }}</div>
                  <div class="card-body-detail-content">{{ item.content }}</div>
                </a>
                <div class="card-body-detail-similarity" v-if="!cardMenuSeen">
                  相似度：{{ item.likeNum }}%
                  <i
                    title="收藏"
                    :class="iconLove"
                    :style="{ color: item.color || 'red' }"
                    @click="iconLoveClick ? iconLoveClick(item, index) : ''"
                  ></i>
                </div>
              </div>
            </div>
          </a>
          <div class="card-menu" v-if="cardMenuSeen">
            <div
              class="card-menu-author"
              @click="authorClick ? authorClick(item, index) : ''"
            >
              <el-avatar :size="20" :src="item.authorUrl"></el-avatar>
            </div>
            <div v-for="n in 3" :key="n"></div>
            <div
              class="card-menu-icon"
              @click="iconLoveClick ? iconLoveClick(item, index) : ''"
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
    computedClass() {
      return { "el-col-4-8": 5 === this.option.cardSpan };
    },
    pageWidth() {
      return this.option.pageWidth || "80%";
    },
    cardData: function() {
      return this.option.data || [];
    },
    cardType: function() {
      return this.option.cardType || "cardText";
    },
    cardMenuSeen: function() {
      return this.cardType === "cardText";
    }
  },
  methods: {}
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
@mixin logo-display($logoSize: 36px, $logoRadius: 36px) {
  height: $logoSize;
  width: $logoSize;
  -webkit-border-radius: $logoRadius;
  border-radius: $logoRadius;
  margin-right: 12px;
  flex-shrink: 0;
}
.el-col-4-8 {
  width: 20%;
}
.card {
  margin: 0 auto;
  >>> .el-card__body {
    padding: 0;
  }
  &-item {
    margin-bottom: 16px;
    height: 116px;
    font-size: 13px;
    line-height: 20px;
    background-color: #fff;
    box-sizing: border-box;
    a {
      text-decoration: none;
    }
  }
  &-body {
    display: flex;
    padding: 10px;
    &-logo {
      @include logo-display;
      margin-top: 15px;
    }
    &-largelogo {
      @include logo-display(96px, 3px);
    }
    &-detail {
      flex: 1;
      &-title {
        @include text-display;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 6px;
      }
      &-content {
        @include text-display(2);
        height: 40px;
        color: rgba(0, 0, 0, 0.45);
      }
      &-similarity {
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
        color: rgba(0, 0, 0, 0.45);
        i {
          font-size: 20px;
        }
      }
    }
  }
  &-menu {
    display: flex;
    justify-content: space-around;
    height: 28px;
    background: #f7f9fa;
    &-author {
      padding-top: 4px;
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
