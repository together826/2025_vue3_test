<script setup>
import { ref, onMounted } from 'vue'
// 任務1. 引入FavList組件到App.vue的aside中

// 如果使用pinia
// import useFavoriteStore from '@/stores/favorites'
// const favoriteStore = useFavoriteStore()

// 任務2. 顯示專輯資料
// 目前畫面中僅呈現defaultData
// 請將資料替換成`public/albums.json`中的專輯資料
// （提示：想一下怎麼把資料帶進來？）
const defaultData = {
  "id": 1,
  "images": "https://i.scdn.co/image/ab67616d00001e023e59f3e73b99ed248ab7bae2",
  "name": "Day & Night (feat. Jay Park)",
  "artists": "Lee Young Ji"
}
onMounted(()=>{})

// 任務3:開啟關閉側拉選單(收藏列表)
const asideToggle = ref(false)
const toggleAside = () => {}

// 任務4.專輯資料可以被input搜尋
const search = ref('')

// 任務5.加入我的收藏
// 不限定方式，如果不知道怎麼使用pinia可以用其他方式
const addFav = (item) => {
  console.log(item);
}

</script>

<template>
  <header>
    <input type="search" v-model="search" />
    <button @click="toggleAside">
      <img src="~@/assets/heartRed.png" alt="收藏列表" />
    </button>
  </header>

  <main>
    <div class="card">
      <img :src="defaultData.images" />
      <div class="card_body">
        <h6>{{ defaultData.name }}</h6>
        <p>{{ defaultData.artists }}</p>
      </div>
      <div class="card_footer">
        <button class="favoriteBtn" @click="addFav(defaultData)">
          <img src="~@/assets/heartBlack.png" alt="收藏專輯" />
        </button>
      </div>
    </div>
  </main>

  <aside :class="{ open: asideToggle }"></aside>
</template>

<style lang="scss" scoped>
header ,main{
  width: 100%;
  display: inline-flex;
}
header {
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
main {
  flex-wrap: wrap;
  gap: 0.5rem;
}
aside {
  width: 20rem;
  height: 100vh;
  position: fixed;
  top: 0;
  right: -20rem;

  background-color: #2a2a2b;
  color: #f9f9f9;

  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: right 1s;

  &.open {
    right: 0;
  }
}

button{
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  padding: 0.2rem;
}

.card {
  width: 12rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #1a1a1a;
  color: #f9f9f9;

  &_body {
    height: 3.5rem;
  }
  &_footer {
    text-align: right;
    .favoriteBtn {
      width: 2rem;
      height: 2rem;
      border-radius: 2rem;
      padding: 0.2rem;
      background-color: #f9f9f9;
      filter: sepia(0);
      &:hover {
        filter: sepia(1);
      }
    }
  }
}
</style>
