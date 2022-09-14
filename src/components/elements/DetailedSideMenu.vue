<template>
  <n-collapse-item
    class="block"
    :title="block.blockName"
    :name="block.blockName"
  >
    <ul class="block__lesson-list">
      <li
        :class="{'block__lesson-item': true, 'block__lesson-item_active': blockIndex === Number($route.hash.slice(1, $route.hash.length).split('-')[0]) && index + 1 === Number($route.hash.slice(1, $route.hash.length).split('-')[1])}"
        v-for="(item, index) in block.lessons"
        :key="item.id"
        @click="switchLesson(index + 1)"
      >
        {{ item.lessonName }}
      </li>
    </ul>
  </n-collapse-item>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    block: {
      type: Object,
      default: () => {}
    },
    blockIndex: {
      type: Number,
      default: 0
    }
  },
  setup ({ blockIndex }) {
    const router = useRouter()

    function switchLesson(lessonIndex) {
      const tempHash = '#' + blockIndex + '-' + lessonIndex
      router.replace({ hash: tempHash })
    }
    return {
      switchLesson
    }
  }
}
</script>

<style lang="scss" scoped>
  .block {
    &:deep(.n-collapse-item-arrow) {
      display: none!important;
    }
    &__lesson-list {
      padding: 0 0 0 20px;
    }
    &__lesson-item {
      font-weight: 400;
      line-height: 24px;
      list-style-type: circle;
      cursor: pointer;
      &:first-child {
        margin: 20px 0 15px 0;
      }
      &:not(:last-child) {
        margin: 0 0 15px 0;
      }
      &:last-child {
        margin: 0 0 20px 0;
      }
      &_active {
        text-decoration: underline;
      }
    }
  }
</style>