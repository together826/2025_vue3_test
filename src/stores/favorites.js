import { ref } from 'vue'
import { defineStore } from 'pinia'
// 不用做到local storage，不過有做的話可以加10分

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const list = ref([])

  // 任務8. 加入我的最愛
  const addFav = (target) => {
    console.log(target);
  }

  // 移除我的最愛
  const removeFav = (target) => {
    const targetID = target && target.id? target.id : null
    if (!targetID) return
    
    if (list.value.length === 0) return

    const idx = list.value.findIndex(fav => fav.id == targetID)
    if (idx < 0) return

    const item = list.value[idx]
    if (item.count > 1) {
      item.count -= 1
    }else{
      list.value.splice(idx, 1)
    }
  }

  return { list, addFav, removeFav }
})
