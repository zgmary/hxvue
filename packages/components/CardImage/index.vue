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
              @dblclick="imageClick(item, index)"
            />
          </div>
          <div :class="bemCss('menu')">
            <div
              :class="bemCss('author')"
              @click="authorClick ? authorClick(item, index) : ''"
            >
              <el-avatar :size="20" :src="item.authorUrl"></el-avatar>
            </div>
            <div v-for="n in 3" :key="n"></div>
            <div
              :class="bemCss('icon')"
              @click="iconLoveClick ? iconLoveClick(item, index) : ''"
            >
              <i :class="iconLove" :style="{ color: item.color || 'red' }"></i>
              <p>{{ item.likeNum }}</p>
            </div>
            <div
              :class="bemCss('icon')"
              @click="downLoadClick ? downLoadClick(item, index) : ''"
            >
              <i
                :class="iconDownLoad"
                :style="{ color: item.color || 'red' }"
              ></i>
              <p>{{ item.downLoadNum }}</p>
            </div>
            <div
              :class="bemCss('icon')"
              @click="searchClick ? searchClick(item, index) : ''"
            >
              <i
                :class="iconSearch"
                :style="{ color: item.color || 'red' }"
              ></i>
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
      iconLove: this.option.iconLove || "el-icon-star-off",
      iconDownLoad: this.option.iconDownLoad || "el-icon-download",
      iconSearch: this.option.iconSearch || "el-icon-search",
      authorClick: this.option.authorClick,
      iconLoveClick: this.option.iconLoveClick,
      downLoadClick: this.option.downLoadClick,
      searchClick: this.option.searchClick
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
    }
  },
  methods: {
    imageClick(item, index) {
      if (this.preview) {
        this.$HxVueImagePreview(this.cardData, index);
      }
      this.$emit("image-click", item, index);
    }
  }
});
</script>

<style scoped lang="scss">
.el-col-4-8 {
  width: 20%;
}
.hxvue-cardimg {
  margin: 0 auto;
  &__item {
    box-sizing: border-box;
    &:hover {
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(0, 0, 0, 0.1) inset;
      .hxvue-cardimg__menu {
        display: flex;
        opacity: 0.7;
      }
    }
  }
  img {
    position: relative;
  }
  img::after {
    content: "";
    display: inline-block;
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-image: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1M0JCM0QwNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1M0JCM0NGNkVFNDExRThCNTJCQUQ2RDFGQzg0NzIxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTYwRUMyMDE2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTYwRUMyMDI2RUUzMTFFOEJCRTU5RTFDODg1ODgwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCACRAJEDASIAAhEBAxEB/8QAZQAAAwEBAQAAAAAAAAAAAAAAAAIDAQQHAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMDBAEFAAMBAAAAAAAAAQIRMQMhQRJRYYEycZHBIkITsdFSYhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9AAAAAMFnNQWt9kAwkssVbV9CTnKb10XQVtLSyAd5ZuzURW27yfhmX9RlDI+wD4Vf/ZVi41SKCdeNI3YEnOXJtOiBZZr/wBGcMi2Ft7AXjli76PoOcqael0Mpyg9NV0A6QEhNTWl90MBoAAAAAAGGiTlxjXfZAZkycdEqyI3q26sOrd92CTm6bbsA1boh1i3lqPGKiqIZAYklYHY0x6tIDY2B3NdjEBgNJ3NACTxbx0E1TozoYsoqSowI2o06MtjyctGqSItODptsw6NX2YHSaJCXKNd90OAAAAYznnLnJvZWK5pUjRXloiNdwCjk0l9S0YqKohcSpGrvLUcDUBLK23x23FWNtVSAuHch/KXQP5PoBdqq77GJ1XfczFVKjVBcuPk6rXqBQCH8n0D+UugFwZD+bV1oNif5OOzQDyipKjI0cW0/qXYmVVjVXjqAkZcHXZ3OhHNXcthlWNHeOjAoAABDLKs6bISlWl1Busm+42Jfm30At2BmI1gRy+3gpD1XwTy+3gpH1QDASyt8uKdFuJRw1iwOjdBKy+TIutGbK3kAAxtJNuwiywdmA7s/glj9/BV04unQli9l8AWDsBjAhSja6D4pUnTZmZV+afUVOkk+4HUBgAc0bD4v2+fsJGw+L9vn7AVQMEDAjl9vBSHqvgnl9vBSHqvgDJwbfJC8JPSlEO5wTo3qMnUDEqNGz0jXoD08BRSXyBB/m6u2xvFPQ1qjoDAVNxqv1ZuJUnT5BGw9/AFQYAwJZf1+fsJKw+X9fn7CSsB0AAAc7VG13GxP82uoZFSbezFWkkwOgGCBgRy15adDZTaioq7QZPfwZQDFFfPc2MnB0vE1AwCc+WituPjaS4kzU6agPkS9hEVeqJJU0AAh7+ACHv4AqAAwI5X+aXQVKrS7g3WTY2ONZp7IC9AAAJ5lWNf+dSV1XqdL1VGc8lxk47bAUxyqqO60GIpuL5LyuxZNNVVtmAmVfkpbbi1RYAI1QVRYAI1QJ1aRYzdAbJ8Y1I1RZggI1SNxL8uW1NCoAYxckqKiu9Bm0lV23ZFtyfJ+F2Ayyr0K4VSNf8ArUnFcpKO250LRUQABoAYLkhzXdWHMA5u26uNGXF9tx8uOusfYlbTcC6aaqrdTTnTlHVfQrHJF6PRsBwAAC5i9vg0xbgaAIAAxtJVduosskVotWiTcpav6ANKXJ9the27sF9NyuLHTWXsA2OHBd3cYDQAAAAAAAwSeNS1syhgHNRxdJfUK10ujoaTuJLCrp0Amm1Ztdhv6z3Sfkxwmu4leqoBT+1P1f8AkZy4469daEaopllRqPRAH9ZOyp5Fbbu2+xmuyGUJvsAtaaWQUcnSP1Kxwq7dR0krALDGo63Y4GgAAAAAAAAAAAAAAAAAshJ7AAGK6B3YABsNx4gADAAAAAAAAAAAAAf/2Q==);
    background-size: 100% 100%;
  }
  &__menu {
    display: none;
    justify-content: space-around;
    height: 28px;
    margin-top: -28px;
    background: #f4f6f7;
  }
  &__author {
    padding-top: 4px;
  }
  &__icon {
    display: flex;
    align-items: center;
    font-size: 10px;
    i {
      font-size: 18px;
    }
    p {
      margin-left: 5px;
    }
  }
}
</style>
