<template>
  <div class="products__tags">
    <input
      class="products__tags-item"
      :style="'background-color:' + colorPallete[0]"
      label="Все"
      type="radio"
      name="tag"
      value=""
      v-model="currentTag"
      checked
    />
    <input
      class="products__tags-item"
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
  <div class="products__list">
    <card-item
      v-for="(item, index) in filterList(list)"
      :key="index"
      :id="item.id"
      :title="item.attributes.title"
      :tag="item.attributes.category"
      :tagColor="filterTagColors(list, item.attributes.category)"
      :description="item.attributes.description"
      :image="item.attributes.image.data"
      :cost="filterCost(item, this.mainLink)"
      :mainLink="this.mainLink"
      :isCost="true"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import CardItem from '@/components/elements/CardItem.vue'
export default {
  components: {
    CardItem
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    },
    mainLink: {
      type: String,
      default: '/'
    }
  },
  setup () {
    const currentTag = ref('')
    const colorPallete = ['#644C5C', '#78353E', '#829288', '#C89C7A']

    function filterTags(list) {
      let tagsSet = new Set()
      list.map(item => tagsSet.add(item.attributes.category))
      return tagsSet
    }

    function filterList(list) {
      if (this.currentTag !== '') {
        return list.filter(item => item.attributes.category === currentTag.value)
      } else {
        return list
      }
    }

    function filterTagColors(list, tag) {
      let tagsSet = new Set()
      list.map(item => tagsSet.add(item.attributes.category))
      return colorPallete[(Array.from(tagsSet).indexOf(tag) + 1) % 4]
    }

    function filterCost(item, link) {
      if (link === '/products/') {
        return item.attributes.courseProgram[0].cost
      } else {
        return 0
      }
    }

    return {
      currentTag,
      colorPallete,
      filterTags,
      filterList,
      filterTagColors,
      filterCost
    }
  }
}
</script>

<style lang="scss" scoped>
  .products {
    &__tags {
      display: flex;
      flex-wrap: wrap;
      margin: 50rem 0 0 0;
      grid-gap: 20rem;
    }
    &__tags-item {
      margin: 0;
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
      @media screen and (max-width: 1280px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 20rem;
      }
      @media screen and (max-width: 680px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>