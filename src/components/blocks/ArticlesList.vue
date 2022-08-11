<template>
  <div class="articles__tags">
    <input
      class="articles__tags-item"
      :style="'background-color:' + colorPallete[0]"
      label="Все"
      type="radio"
      name="tag"
      value=""
      v-model="currentTag"
      checked
    />
    <input
      class="articles__tags-item"
      v-for="(item, index) in filterTags(list)"
      :style="'background-color:' + colorPallete[(index + 1) % 4]"
      :key="index"
      :label="item"
      type="radio"
      name="tag"
      :value="item"
      v-model="currentTag"
    />
  </div>
  <div class="articles__list">
    <article-item
      v-for="(item, index) in filterList(list)"
      :key="index"
      :id="item.id"
      :tag="item.attributes.category"
      :tagColor="filterTagColors(list, item.attributes.category)"
      :title="item.attributes.title"
      :description="item.attributes.description"
      :date="item.attributes.date"
      :image="item.attributes.image.data"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import ArticleItem from '@/components/elements/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  setup () {
    const currentTag = ref('')
    const colorPallete = ['#644C5C', '#78353E', '#829288', '#C89C7A']
    function filterTagColors(list, tag) {
      let tagsSet = new Set()
      list.map(item => tagsSet.add(item.attributes.category))
      return colorPallete[(Array.from(tagsSet).indexOf(tag) + 1) % 4]
    }
    function filterTags(list) {
      let tagsSet = new Set()
      list.map(item => tagsSet.add(item.attributes.category))
      return tagsSet
    }
    function filterList(list) {
      if (currentTag.value !== '') {
        return list.filter(item => item.attributes.category === currentTag.value)
      } else {
        return list
      }
    }
    return {
      filterTags,
      filterList,
      filterTagColors,
      currentTag,
      colorPallete
    }
  }
}
</script>

<style lang="scss" scoped>
  .articles {
    &__tags {
      display: flex;
      flex-wrap: wrap;
      margin: 50rem 0 0 0;
      grid-gap: 20rem;
    }
    &__tags-item {
      margin: 0 20rem 0 0;
      padding: 10rem 40rem;
      background-color: #E0DBDE;
      border-radius: 10rem;
      font-weight: 600;
      font-size: 14rem;
      line-height: 20rem;
      opacity: 0.5;
      color: #FFF;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      transition: opacity .3s;
      cursor: pointer;
      &:before {
        content: attr(label);
      }
      &:checked {
        opacity: 1;
      }
      &:hover {
        opacity: 1;
      }
    }
    &__list {
      margin: 40px 0 0 0;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30rem;
    }
  }
</style>