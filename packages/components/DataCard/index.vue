<template>
  <div :class="bemCss()" :style="{ width: setPx(pageWidth) }">
    <el-row :gutter="gutter">
      <el-col
        :class="computedClass"
        :xl="cardSpan"
        :lg="6"
        :md="8"
        :xs="12"
        v-for="(item, index) in cardData"
        :key="index"
      >
        <div
          :class="bemCss('item')"
          :style="{ height: setPx(imgHeight), marginBottom: setPx(gutter) }"
        >
          <a
            :href="item.href ? item.href : 'javascript:void(0);'"
            :target="item.target"
            @click="cardClick(item, index)"
          >
            <img
              :class="bemCss('itemImg')"
              :src="item.imgUrl"
              width="100%"
              :height="setPx(imgHeight)"
              :object-fit="fitModel"
            />
            <div
              :class="bemCss('itemText')"
              :style="{
                height: setPx(imgHeight),
                backgroundColor: bgText,
                color: colorText
              }"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "../../core/create";
export default create({
  name: "data-card",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      gutter: this.option.gutter || 6,
      cardSpan: this.option.cardSpan || 4,
      imgHeight: this.option.imgHeight || 340,
      fitModel: this.option.fitModel || "fill"
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
    bgText: function() {
      return this.option.bgText || "#2e323f";
    },
    colorText: function() {
      return this.option.colorText || "#fff";
    }
  },
  methods: {
    cardClick(item, index) {
      this.$emit("card-click", item, index);
    }
  }
});
</script>

<style scoped lang="scss">
@import "../../styles/NoImgError";
.el-col-4-8 {
  width: 20%;
}
.hxvue-data-card {
  margin: 0 auto;
  &__item {
    position: relative;
    overflow: hidden;
    border: 1px solid #fff;
    border-radius: 5px;
    &:hover .hxvue-data-card__itemText {
      top: 0;
    }
  }
  &__itemText {
    position: absolute;
    top: 60%;
    padding: 20px 15px;
    box-sizing: border-box;
    opacity: 0.7;
    transition: top 0.4s;
    p {
      font-size: 16px;
      line-height: 25px;
      text-indent: 2em;
    }
  }
}
</style>
