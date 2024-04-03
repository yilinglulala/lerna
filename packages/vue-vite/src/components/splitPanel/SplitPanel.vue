<template>
  <div class="app-split-panel">
    <div class="app-split-panel__row" :class="{ 'has-footer': $slots.footer }">
      <div
        class="app-split-panel__left"
        :style="{ width: leftWidthNumber + 'px' }"
      >
        <!--   左侧标题   -->
        <slot v-if="$slots.title" name="title"></slot>
        <div v-else class="app-split-panel__title">
          <i
            v-if="showBack"
            class="el-icon-back back-button"
            @click="handleBackClick"
          >
            返回
          </i>
          <span :title="panelTitle">{{ panelTitle }}</span>
        </div>
        <!--   slot工具栏   -->
        <slot name="tools"></slot>

        <!--    左侧TabList    -->
        <div class="app-split-panel__tab-list">
          <div
            v-for="(item, index) of tabList"
            v-show="!item.hide"
            :key="index"
            class="tab-item-panel"
            :class="{ 'tab-item-panel_active': isCurrentItem(item) }"
            @click="tabItemClick(item)"
          >
            <div class="tab-item">
              <div class="tab-item__label" :title="item.label">
                <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </div>
              <slot :tab="item" name="tab-extend"></slot>
            </div>
          </div>
          <!--   左侧slot工具栏   -->
          <slot name="leftTools"></slot>
        </div>
      </div>

      <!--   右侧面板   -->
      <div
        class="app-split-panel__right"
        :style="{ width: `calc(100% - ${leftWidthNumber + 1}px)` }"
      >
        <slot></slot>
      </div>
    </div>
    <div class="app-split-panel__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
export default {
  name: 'SplitPanel',
  props: {
    title: String,
    showBack: Boolean,
    leftWidth: {
      type: [String, Number],
      default: 255,
    },
    modelValue: String,
    field: {
      type: String,
      default: 'name',
    },
    tabList: {
      type: Array,
      default: () => {
        return []
      },
    },
    onBack: [Function, null],
    currentItem: Object,
  },
  computed: {
    leftWidthNumber() {
      return parseInt(this.leftWidth) || 255
    },
    panelTitle() {
      if (this.title) {
        return this.title
      } else {
        let routeTitle = get(this.$route, ['meta', 'title'], '')
        if (!routeTitle) {
          let matchedCount = this.$route.matched.length
          if (matchedCount > 0) {
            routeTitle = get(
              this.$route.matched[matchedCount - 2],
              ['meta', 'title'],
              '',
            )
          }
        }
        return routeTitle
      }
    },
    currentTab() {
      return this.tabList.find(this.isCurrentItem) || {}
    },
  },
  created() {
    const targetTab = this.tabList.find(this.isCurrentItem)
    if (targetTab) {
      this.$emit('update:currentItem', targetTab)
    }
  },
  methods: {
    tabItemClick(item) {
      this.$emit('update:model-value', item[this.field])
      this.$emit('tab-click', item)
      this.$emit('update:currentItem', item)
    },
    isCurrentItem(item) {
      if (this.modelValue) {
        return this.modelValue === item[this.field]
      } else if (item.path) {
        return this.$route.path.startsWith(item.path)
      } else {
        return item.name === this.$route.name
      }
    },
    handleBackClick() {
      if (this.onBack instanceof Function) {
        this.onBack()
      } else {
        this.$router.go(-1)
      }
    },
  },
}
</script>

<style lang="scss">
$--color-primary: skyblue;
.app-split-panel {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: #ffffff;
  &__row {
    display: flex;
    height: 100%;
    width: 100%;
    &.has-footer {
      height: calc(100% - 61px);
    }
    .app-split-panel__title {
      display: flex;
      align-items: center;
    }
  }
  &__footer {
    background: #fff;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    height: 60px;
    line-height: 60px;
  }
  &__left,
  &__right {
    display: inline-block;
    height: 100%;
  }
  &__left {
    overflow: auto;
    border-right: 1px solid #ebebeb;
  }
  &__right {
    overflow: auto;
    .yl-main-panel {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
  &__title {
    padding: 0 24px;
    height: 60px;
    font-size: 18px;
    font-weight: bold;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tab-item-panel {
    height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .tab-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      line-height: 17px;
      padding-right: 8px;
      &__label {
        padding-left: 17px;
        border-left: 3px solid rgba(0, 0, 0, 0);
        min-width: 30px;
        flex-shrink: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          margin-left: 4px;
        }
      }
    }
    &_active {
      background: lighten($--color-primary, 52%);
      .tab-item__label {
        border-left-color: $--color-primary !important;
        color: $--color-primary;
      }
    }
  }

  .el-icon-back.back-button {
    font-size: 18px !important;
    padding-right: 8px !important;
    font-weight: bold;
    color: $--color-primary;
    cursor: pointer;
  }
}
</style>
