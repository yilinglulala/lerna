<template>
  <div class="yl-main-panel">
    <div class="yl-main-panel__header" v-if="showHeader">
      <div v-if="$slots.tools" class="yl-main-panel__header-tools">
        <slot name="tools"></slot>
      </div>
      <div class="yl-main-panel__header-main">
        <i v-if="showBack" class="el-icon-back yl-main-panel__back-btn" @click="handleBack" />
        <slot v-if="$slots.title" name="title"></slot>
        <template v-else>
          <yl-tooltip-text class="display-title" :text="displayTitle"></yl-tooltip-text>
          <yl-helper v-if="!!helper" :content="helper"></yl-helper>
          <slot v-if="$slots.titleExtra" name="titleExtra"></slot>
        </template>
      </div>
      <div v-if="!!subTitle" class="yl-main-panel__header-sub-title">
        <yl-tooltip-text :text="subTitle"></yl-tooltip-text>
      </div>
    </div>

    <div
      class="yl-main-panel__content"
    >
      <slot></slot>
    </div>

    <div v-if="$slots['footer']" class="yl-main-panel__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YlMainPanel',
  props: {
    title: String,
    subTitle: String,
    helper: String,
    showBack: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    onBack: Function
  },
  methods: {
    handleBack() {
      if (typeof this.onBack === 'function') {
        this.onBack();
      } else {
        this.$router.go(-1);
      }
    }
  },
  // components: {
  //    ElTooltipText
  // },
  computed: {
    displayTitle() {
      return this.title || this.$route.meta && this.$route.meta.title || '';
    }
  }
};
</script>
