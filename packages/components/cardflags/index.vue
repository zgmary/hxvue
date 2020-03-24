<template>
  <el-row type="flex" justify="space-around" :gutter="gutter">
    <el-col :span="span" v-for="(item, index) in data" :key="index">
      <div class="card" :title="item.content">
        <div class="card_head">
          <div class="card_head_left">
            <i
              class="el-icon-star-off"
              @click="likeCount ? likeCount(index) : ''"
            ></i
            ><span>{{ item.likeNum }}</span>
          </div>
          <div class="card_head_right">
            <i class="el-icon-view"></i><span>{{ item.viewNum }}</span>
          </div>
        </div>
        <a :href="item.href || 'javascript:void(0);'" :target="item.target">
          <div class="card_body" @click="viewCount ? viewCount(index) : ''">
            <div class="card_body_img"><img :src="item.logoUrl" /></div>
            <div class="card_body_info">
              <div class="card_body_info_title">{{ item.title }}</div>
              <div
                class="card_body_info_tag"
                v-for="(tagItem, tagIndex) in item.tag"
                :key="tagIndex"
              >
                {{ tagItem }}
              </div>
              <div class="card_body_info_arrow">
                <i class="el-icon-right"></i>
              </div>
              <div class="card_body_info_content">{{ item.content }}</div>
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
      likeCount: this.option.likeCount,
      viewCount: this.option.viewCount
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
    span() {
      return this.option.span || 4;
    },
    gutter() {
      return this.option.gutter || 20;
    },
    data() {
      return this.option.data || [];
    }
  }
});
</script>

<style scoped lang="scss">
$time: 0.5s;
.card {
  border: 1px solid darkgray;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px #55504c;
  position: relative;
  bottom: 0;
  //过渡效果
  transition: bottom $time;
  &:hover {
    bottom: -5px;
  }
  //当前元素的hover改变子元素的样式
  &:hover &_body_info_arrow {
    visibility: visible;
  }
  &:hover &_body_img {
    width: 45px;
    height: 45px;
  }
  a {
    text-decoration: none;
  }
  //采用flex布局之后不用分别对left和right进行float
  &_head {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  }
  &_body {
    display: flex;
    padding: 5px 10px;
    &_img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      overflow: hidden;
      transition: width $time, height $time;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &_info {
      padding-left: 10px;
      &_title {
        display: inline;
        font-size: 16px;
      }
      &_tag {
        display: inline;
        margin-left: 10px;
        background-color: gainsboro;
        font-size: 10px;
      }
      &_arrow {
        float: right;
        visibility: hidden;
        transition: visibility $time;
      }
      &_content {
        padding-top: 5px;
        font-size: 12px;
        //超出部分显示省略号
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
