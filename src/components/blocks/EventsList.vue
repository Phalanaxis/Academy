<template>
  <div class="events__tags">
    <input
      class="events__tags-item"
      type="radio"
      name="tag"
      label="Онлайн"
      value="Online"
      v-model="currentTag"
    />
    <input
      class="events__tags-item"
      type="radio"
      name="tag"
      label="Оффлайн"
      value="Offline"
      v-model="currentTag"
    />
  </div>
  <div class="events__list">
    <event-item
      v-for="(item, index) in filterList(list)"
      :key="index"
      :id="item.id"
      :title="item.attributes.title"
      :date="item.attributes.date"
      :image="item.attributes.image.data"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import EventItem from '@/components/elements/EventItem.vue'
import '../../assets/scss/core.scss'
export default {
  components: {
    EventItem
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  setup () {
    const currentTag = ref('Online')
    function filterTags(list) {
      let tagsSet = new Set()
      list.map(item => tagsSet.add(item.category))
      return tagsSet
    }
    function filterList(list) {
      return list.filter(item => item.attributes.type === this.currentTag)
    }
    return {
      currentTag,
      filterTags,
      filterList
    }
  }
}
</script>

<style lang="scss" scoped>
  .events {
    &__tags {
      display: flex;
      margin: 50rem 0 0 0;
    }
    &__tags-item {
      padding: 10rem 40rem;
      background-color: #E0DBDE;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14rem;
      line-height: 20rem;
      color: #644C5C;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      transition: opacity .3s;
      cursor: pointer;
      transition: background-color .2s, color .2s;
      &:not(:last-child) {
        margin: 0 20rem 0 0;
      }
      &:before {
        content: attr(label);
      }
      &:checked {
        background-color: #644C5C;
        color: #FFF;
      }
      @media screen and (max-width: 680px) {
        display: flex;
        justify-content: center;
        width: calc(50% - 10px);
        padding: 10px 0;
        &:not(:last-child) {
          margin: 0 20px 0 0;
        }
      }
    }
    &__list {
      margin: 40px 0 0 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 30px;
      @media screen and (max-width: 1280px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>