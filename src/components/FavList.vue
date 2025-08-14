<script setup>
import { computed } from 'vue'

const props = defineProps({
  favorites: { type: Array, default: () => [] }
})

const emit = defineEmits(['remove-favorite'])
const removeFav = (target) => emit('remove-favorite', target)

const hasData = computed(() => (props.favorites?.length ?? 0) > 0)
</script>

<template>
  <div class="favList">
    <div v-if="!hasData" class="nodata">還沒有加入收藏喔</div>

    <div v-else class="container">
      <div class="list" v-for="item in favorites" :key="item.id">
        <img :src="item.images" :alt="item.name" />
        <div class="list_content">
          <h6>{{ item.name }}</h6>
          <p>{{ item.artists }}</p>
        </div>
        <div class="list_action">
          <button @click="removeFav(item)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favList {
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem;


  .nodata {
    width: 100%; 
    height: 10rem; 
    display: flex;
    justify-content: center; 
    align-items: center;
  }


  .container { 
    overflow: hidden; 
    padding: 5rem 0.5rem 0.5rem; 
  }


  .list {
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 
    margin-bottom: 0.5rem;
    img { width: 4rem; }
    &_content {
      flex: 0 1 calc(100% - 7.5rem);
      h6 { font-size: 0.8rem; } p { font-size: 0.75rem; }
    }
    &_action {
      display: flex; 
      align-items: center; 
      width: 2.5rem;
      button { 
        background: transparent; 
        color: rgb(175, 50, 119); 
      }
    }
  }
}
</style>
