<template>
  <div class="img-queue">
    <div class="imgs  flex row">
      <img :src="i" alt="" v-for="i in props.imgs" class="radial">
    </div>
  </div>
</template>
<script setup>
/* Данный компонент получает на вход массив изображений и возвращает их в очереди
Пример в навбаре - сервер Nice cats - при наведении всплывает тултип,
внутри которого аватары активных юзеров 
Можно импортировать изображения вида:

let imgs = ["https://avatars.githubusercontent.com/u/28786802?v=4&size=40","https://avatars.githubusercontent.com/u/51343579?s=60&v=4"]
или
let imgs1 = [require('@/assets/img/Discovery.svg'), require('@/assets/img/Discovery.svg')];
*/
const props = defineProps({
  imgs: {
    type: Object,
    required: true,
  },
  /* borderColor: String,
  size, 
  maxLength,  */
});
</script>
<style lang="scss">
.img-queue {
  .imgs {
    img {
      width: 24px;
      aspect-ratio: 1/1;
      background-position: center center;
      margin-right: -5px;
      border: 1px solid var(--icon-color);
    }
  }
}

</style>