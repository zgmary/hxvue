<template>
  <div :class="bemCss()">
    <el-input
      :class="bemCss('input')"
      :placeholder="searchPlaceholder"
      v-model="inputValue"
    >
      <template v-slot:append v-if="similarSearchVisible">
        <el-tooltip :content="similarTips" placement="top-start">
          <div
            :class="bemCss('similar')"
            @click="
              similarSearchClick
                ? similarSearchClick(selectValue, inputValue)
                : ''
            "
          >
            <i class="el-icon-camera-solid"></i>
          </div>
        </el-tooltip>
      </template>
    </el-input>
    <el-select
      :class="bemCss('select')"
      v-model="selectValue"
      :popper-append-to-body="false"
    >
      <el-option
        v-for="(item, index) in optionInfo"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-tooltip :content="searchTips" placement="top-start">
      <el-button
        :class="bemCss('btn')"
        icon="el-icon-search"
        @click="searchClick ? searchClick(selectValue, inputValue) : ''"
      ></el-button>
    </el-tooltip>
  </div>
</template>

<script>
import create from "../../core/create";

export default create({
  name: "search",
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      searchPlaceholder: this.option.searchPlaceholder || "请输入关键字查询",
      selectValue: this.option.selectValue || "",
      similarTips: this.option.similarTips || "以图搜图",
      similarSearchVisible: this.option.similarSearchVisible || false,
      searchTips: this.option.searchTips || "关键词搜索",
      inputValue: "",
      searchClick: this.option.searchClick,
      similarSearchClick: this.option.similarSearchClick
    };
  },
  computed: {
    optionInfo: function() {
      return this.option.optionInfo || [];
    }
  },
  methods: {}
});
</script>

<style scoped lang="scss">
$theme-color: #ff0000;
$height: 50px;

@mixin borderInfo(
  $upperLeft: 0px,
  $upperRight: 0px,
  $bottomRight: 0px,
  $bottomLeft: 0px,
  $isHeight: true
) {
  border: none;
  border-radius: $upperLeft $upperRight $bottomRight $bottomLeft;
  @if $isHeight {
    height: $height;
  }
}
.hxvue-search {
  display: flex;
  height: $height;
  width: 40%;
  &__input {
    width: 60%;
    >>> .el-input__inner {
      @include borderInfo(5px, 0px, 0px, 5px);
    }
    >>> .el-input-group__append {
      @include borderInfo(0px, 0px, 0px, 0px, false);
      background-color: white;
    }
  }
  &__similar {
    font-size: 32px;
    cursor: pointer;
    &:hover {
      color: $theme-color;
    }
  }
  &__select {
    width: 20%;
    >>> .el-input__inner {
      @include borderInfo;
    }
    >>> .el-select-dropdown__item.selected {
      color: $theme-color;
    }
  }
  &__btn {
    height: $height;
    background-color: red;
    color: white;
    font-size: 20px;
    border-radius: 0 5px 5px 0;
    border: solid 1px $theme-color;
  }
}
</style>
