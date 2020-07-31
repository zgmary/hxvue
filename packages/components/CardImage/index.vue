<template>
  <div :class="bemCss()" :style="{ width: setPx(pageWidth) }">
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
        <div :class="bemCss('item')" :style="{ marginBottom: setPx(gutter) }">
          <div :style="{ height: setPx(imgHeight) }">
            <img
              :src="item.thumbUrl"
              :height="setPx(imgHeight)"
              width="100%"
              :object-fit="fitModel"
              loading="lazy"
              @dblclick="imageDbClick(item, index)"
            />
          </div>
          <div :class="bemCss('menu')" v-if="menuIsVisible">
            <div v-for="(menuItem, menuIndex) in menuArr" :key="menuIndex">
              <div
                :class="
                  menuItem.menuType === 'avatar'
                    ? bemCss('author')
                    : bemCss('icon')
                "
                @click="
                  menuClick ? menuClick(item, index, menuItem, menuIndex) : ''
                "
              >
                <el-avatar
                  :size="20"
                  :src="item.authorUrl"
                  v-if="menuItem.menuType === 'avatar'"
                ></el-avatar>
                <div v-else-if="menuItem.menuType === 'icon'">
                  <i
                    :class="menuItem.iconName"
                    :style="{ color: menuItem.iconColor || 'red' }"
                  ></i>
                  <span v-if="menuItem.itemKey !== undefined">
                    {{ item[menuItem.itemKey] }}
                  </span>
                </div>
                <div v-else></div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "../../core/create";
export default create({
  name: "cardimg",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      gutter: this.option.gutter || 6,
      cardSpan: this.option.cardSpan || 4,
      imgHeight: this.option.imgHeight || 200,
      fitModel: this.option.fitModel || "fill",
      menuClick: this.option.menuClick
    };
  },
  computed: {
    computedClass() {
      return { "el-col-4-8": 5 === this.option.cardSpan };
    },
    pageWidth() {
      return this.option.pageWidth || "80%";
    },
    preview: function() {
      return this.option.preview || false;
    },
    cardData: function() {
      return this.option.data || [];
    },
    menuIsVisible: function() {
      return this.option.menuArr || false;
    },
    menuArr: function() {
      return this.option.menuArr;
    }
  },
  methods: {
    imageDbClick(item, index) {
      if (this.preview) {
        this.$HxVueImagePreview(this.cardData, index);
      }
      this.$emit("image-dbclick", item, index);
    }
  }
});
</script>

<style scoped lang="scss">
@import "../../styles/NoImgError";
.el-col-4-8 {
  width: 20%;
}
.hxvue-cardimg {
  margin: 0 auto;
  &__item {
    box-sizing: border-box;
    &:hover {
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5),
        0 0 40px rgba(0, 0, 0, 0.3) inset;
      .hxvue-cardimg__menu {
        display: flex;
        opacity: 0.7;
      }
    }
  }
  img {
    position: relative;
  }
  &__menu {
    display: none;
    justify-content: space-around;
    height: 28px;
    margin-top: -28px;
    background: #f4f6f7;
  }
  &__author {
    padding-top: 5px;
  }
  &__icon {
    i {
      padding-top: 7px;
      font-size: 18px;
    }
    span {
      font-size: 12px;
      margin-left: 3px;
    }
  }
}
</style>
