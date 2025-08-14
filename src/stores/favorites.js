import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const list = ref([])



  const has = (target) => {
    const id = target?.id
    if (!id) return false
    return list.value.some(item => item.id === id)
  }



  const addFav = (target) => {
    const id = target?.id
    if (!id) return
    if (!has(target)) list.value.push({ ...target })
  }



  const removeFav = (target) => {
    const id = target?.id
    if (!id) return
    const idx = list.value.findIndex(fav => fav.id === id)
    if (idx >= 0) list.value.splice(idx, 1)
  }



  const toggleFav = (target) => {
    if (has(target)) removeFav(target)
    else addFav(target)
  }

  
  return { list, has, addFav, removeFav, toggleFav }
})
