<script setup>
import { ref, computed, onMounted } from 'vue'
import FavList from './components/FavList.vue'
import heartBlack from '@/assets/heartBlack.png'
import heartRed from '@/assets/heartRed.png'
import albumsRaw from '@/assets/albums.json'

import { useFavoriteStore } from '@/stores/favorites'
const favoriteStore = useFavoriteStore()

// 取得並正規化資料
const albums = ref([])
onMounted(() => {
  const raw = Array.isArray(albumsRaw) ? albumsRaw : (albumsRaw.albums ?? [])

  albums.value = raw.map((r, i) => {
    const img = Array.isArray(r.images)
      ? (r.images[0]?.url ?? r.images[0] ?? '')
      : (r.images ?? '')
    const artistText = Array.isArray(r.artists)
      ? r.artists.join(', ')
      : (r.artists ?? '')
    return {
      id: r.id ?? i,
      name: r.name ?? '',
      artists: artistText,
      images: img
    }
  })
  console.log('albums loaded:', albums.value.length)
})

// 搜尋
const search = ref('')
const filteredAlbums = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return albums.value
  return albums.value.filter(a =>
    String(a.name).toLowerCase().includes(q) ||
    String(a.artists).toLowerCase().includes(q)
  )
})

// 側欄
const asideToggle = ref(false)
const toggleAside = () => { asideToggle.value = !asideToggle.value }

// 收藏相關（呼叫 store）
const isFavorite = (album) => favoriteStore.has(album)
const addFav = (album) => favoriteStore.toggleFav(album)
const handleRemoveFavorite = (album) => favoriteStore.removeFav(album)
</script>

<template>
  <header>
    <div>
      <input type="search" v-model="search" placeholder="搜尋專輯或歌手..."/>
      <button @click="toggleAside" aria-label="收藏清單">
        <img :src="heartRed" alt="收藏列表" />
      </button>
    </div>
  </header>

  <main>
    <div class="card" v-for="album in filteredAlbums" :key="album.id">
      <img :src="album.images" :alt="album.name" />
      <div class="card_body">
        <h6>{{ album.name }}</h6>
        <p>{{ album.artists }}</p>
      </div>
      <div class="card_footer">
        <button class="favoriteBtn" @click="addFav(album)">
          <img :src="isFavorite(album) ? heartRed : heartBlack" alt="收藏專輯" />
        </button>
      </div>
    </div>
  </main>

  <aside :class="{ open: asideToggle }">
    <FavList
      :favorites="favoriteStore.list"
      @remove-favorite="handleRemoveFavorite"
    />
  </aside>
</template>

<style lang="scss">
button{
  width: 2rem; 
  height: 2rem; 
  border-radius: 2rem; 
  padding: 0.2rem;
  img{ width: 100%; }
}
</style>


<style lang="scss" scoped>

header {
  position: fixed; 
  width: 100%; 
  z-index: 2; 
  background-color: #f9f9f9;
  >div{
    display: flex; 
    justify-content: space-between;
    width: 100%; 
    max-width: 57rem; 
    margin: auto; 
    padding: 0.5rem; 
    box-sizing: border-box;
  }
}

main {
  width: 100%; 
  display: flex; 
  flex-wrap: wrap; 
  justify-content: space-evenly; 
  gap: 0.5rem;
  max-width: 57rem; 
  margin: 3rem auto; 
  padding: 0.5rem; 
  box-sizing: border-box;
}

aside {
  width: 20rem; 
  height: 100vh; 
  position: fixed; 
  overflow-y: auto; 
  z-index: 1;
  top: 0; 
  right: -20rem; 
  background-color: #2a2a2b; 
  color: #f9f9f9;
  box-shadow: 0 2px 3px rgba(0,0,0,.3); 
  transition: right 1s;
  &.open { right: 0; }
}


.card {
  width: 12rem; 
  padding: 0.75rem; 
  border-radius: 0.5rem; 
  background: #1a1a1a; 
  color:#f9f9f9;
  &_body { height: 3.5rem; }
  &_footer {
    text-align: right;
    .favoriteBtn { 
      background: #f9f9f9; 
      filter: sepia(0); 
      &:hover{ filter: sepia(1); } 
    }
  }
}
</style>
