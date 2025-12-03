<template>
  <div class="avatar single-user-avatar radial" v-if="!props.multy && props.avatar"
    :style="{ width: (props.size) ? props.size + 'px' : null, height: (props.size) ? props.size + 'px' : null }"
    :class="props.square && 'square'">
    <img class="single-avatar radial" :src="props.avatar">
    <div v-if="props.status" class="status radial" :class="props.status">
    </div>
    <div v-if="props.mentions && props.mentions > 0" class="mentions radial">
      {{ (props.mentions < 1000) ? props.mentions : (props.mentions / 1000).toFixed(1) + 'k+' }} </div>
        <div class="activity radial" v-if="props.activity"
          :class="defineActivity(), (props.active == true) ? 'my_activity' : null"></div>
    </div>
    <div class="avatar single-user-avatar radial user-logo" v-else-if="!props.multy && !props.avatar"
      :style="{ width: (props.size) ? props.size + 'px' : null, height: (props.size) ? props.size + 'px' : null }"
      :class="props.square && 'square'">
      <img class="single-avatar radial" src="@/assets/img/svg/logo.svg">
      <div v-if="props.status" class="status radial" :class="props.status"></div>
      <div v-if="props.mentions && props.mentions > 0" class="mentions radial">
        {{ (props.mentions < 1000) ? props.mentions : (props.mentions / 1000).toFixed(1) + 'k+' }} </div>
      </div>

      <div class="avatar multi-user-avatar" v-else-if="props.multy && props.avatars"
        :style="{ width: (props.size) ? props.size + 'px' : null, height: (props.size) ? props.size + 'px' : null }">
        <img class="multi-avatar radial" :src="props.avatars[0] || '@/assets/img/svg/logo.svg'"
          :class="!props.avatars[0] && 'user-logo'">
        <img class="multi-avatar radial" :src="props.avatars[1] || '@/assets/img/svg/logo.svg'"
          :class="!props.avatars[0] && 'user-logo'">
        <div v-if="props.status" class="status radial" :class="props.status"></div>
      </div>
</template>
<script setup>
const icons = {
  call: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 10C40 9.11598 39.6488 8.26813 39.0237 7.64301C38.3985 7.01789 37.5507 6.6667 36.6666 6.6667H36.4666C36.004 6.66357 35.5457 6.75679 35.121 6.94044C34.6964 7.12408 34.3146 7.39412 34 7.73337L19.7333 23.3334H9.99996C9.1159 23.3334 8.26806 23.6846 7.64294 24.3097C7.01782 24.9348 6.66663 25.7826 6.66663 26.6667V53.3334C6.66663 54.2174 7.01782 55.0653 7.64294 55.6904C8.26806 56.3155 9.1159 56.6667 9.99996 56.6667H19.7333L34 72.2667C34.3146 72.6059 34.6964 72.876 35.121 73.0596C35.5457 73.2433 36.004 73.3365 36.4666 73.3334H36.6666C37.5507 73.3334 38.3985 72.9822 39.0237 72.3571C39.6488 71.7319 40 70.8841 40 70V10ZM50.3333 69.1667C48.4 69.6334 46.6666 68.0667 46.6666 66.1V66C46.6666 64.3334 47.9 62.9334 49.5 62.5C54.4289 61.1462 58.7768 58.2113 61.8758 54.1464C64.9747 50.0815 66.6531 45.1115 66.6531 40C66.6531 34.8886 64.9747 29.9186 61.8758 25.8536C58.7768 21.7887 54.4289 18.8539 49.5 17.5C48.7084 17.3096 48.0018 16.8635 47.4895 16.2307C46.9773 15.5979 46.6881 14.8139 46.6666 14V13.9C46.6666 11.9 48.4 10.3667 50.3333 10.8334C56.8815 12.4098 62.7088 16.144 66.8769 21.4347C71.045 26.7253 73.3115 33.2647 73.3115 40C73.3115 46.7354 71.045 53.2747 66.8769 58.5654C62.7088 63.8561 56.8815 67.5902 50.3333 69.1667Z" fill="#ABABAB"/>
<path d="M50.5333 55.0333C48.6333 55.9667 46.6666 54.3667 46.6666 52.2667V51.8C46.6666 50.3667 47.6 49.1333 48.7666 48.4C50.1701 47.4934 51.3241 46.2497 52.1231 44.7823C52.9221 43.315 53.3408 41.6708 53.3408 40C53.3408 38.3292 52.9221 36.685 52.1231 35.2177C51.3241 33.7503 50.1701 32.5065 48.7666 31.6C47.6 30.8333 46.6666 29.6 46.6666 28.2V27.7333C46.6666 25.6333 48.6333 24.0667 50.5333 24.9667C53.3692 26.324 55.7633 28.4559 57.4392 31.116C59.1151 33.7761 60.0044 36.856 60.0044 40C60.0044 43.144 59.1151 46.2239 57.4392 48.884C55.7633 51.5441 53.3692 53.6759 50.5333 55.0333Z" fill="#ABABAB"/>
</svg>
`,
  display: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.07815 16.9542C7.07815 14.3348 8.11871 11.8226 9.97096 9.97036C11.8231 8.11819 14.3353 7.07764 16.9547 7.07764H63.0452C65.6647 7.07764 68.1768 8.11819 70.029 9.97036C71.8812 11.8226 72.9218 14.3348 72.9218 16.9542V43.2916C72.9218 45.911 71.8812 48.4232 70.029 50.2754C68.1768 52.1276 65.6647 53.1682 63.0452 53.1682H16.9547C14.3353 53.1682 11.8231 52.1276 9.97096 50.2754C8.11871 48.4232 7.07815 45.911 7.07815 43.2916V16.9542ZM59.7531 26.8307C59.7406 25.9624 59.3857 25.134 58.7654 24.5262L48.8889 14.6497C48.6058 14.2723 48.245 13.9602 47.8309 13.7344C47.4168 13.5086 46.959 13.3745 46.4885 13.341C46.018 13.3076 45.5458 13.3757 45.1039 13.5406C44.662 13.7056 44.2607 13.9635 43.9272 14.2971C43.5937 14.6306 43.3357 15.0319 43.1708 15.4738C43.0058 15.9156 42.9378 16.3878 42.9712 16.8584C43.0046 17.3289 43.1388 17.7867 43.3645 18.2008C43.5903 18.6149 43.9024 18.9757 44.2798 19.2587L48.4938 23.5386H43.2921C38.0533 23.5386 33.029 25.6196 29.3246 29.324C25.6201 33.0285 23.5391 38.0528 23.5391 43.2916C23.5391 44.1647 23.8859 45.0022 24.5033 45.6195C25.1207 46.2369 25.9581 46.5838 26.8312 46.5838C27.7044 46.5838 28.5417 46.2369 29.1591 45.6195C29.7766 45.0022 30.1235 44.1647 30.1235 43.2916C30.1235 39.7991 31.5108 36.4496 33.9804 33.9799C36.4501 31.5103 39.7996 30.1229 43.2921 30.1229H48.5267L44.2469 34.4028C43.7117 35.0363 43.4354 35.8486 43.4731 36.677C43.5108 37.5056 43.86 38.2893 44.4505 38.8716C45.0411 39.4538 45.8297 39.7918 46.6587 39.8178C47.4876 39.8437 48.2958 39.5559 48.9218 39.0118L58.7983 29.1352C59.4065 28.5221 59.7494 27.6944 59.7531 26.8307Z" fill="#ABABAB"/>
<path d="M43.2921 64.6906C43.2921 65.6125 44.0164 66.3367 44.9383 66.3367H49.8765C50.7496 66.3367 51.5871 66.6836 52.2044 67.301C52.8218 67.9184 53.1687 68.7558 53.1687 69.6289C53.1687 70.5021 52.8218 71.3395 52.2044 71.9569C51.5871 72.5743 50.7496 72.9211 49.8765 72.9211H30.1235C29.2503 72.9211 28.4129 72.5743 27.7955 71.9569C27.1781 71.3395 26.8312 70.5021 26.8312 69.6289C26.8312 68.7558 27.1781 67.9184 27.7955 67.301C28.4129 66.6836 29.2503 66.3367 30.1235 66.3367H35.0617C35.4983 66.3367 35.9169 66.1633 36.2257 65.8547C36.5343 65.5459 36.7078 65.1273 36.7078 64.6906V58.1063C36.7078 57.1845 37.4321 56.4602 38.3539 56.4602H41.646C42.5679 56.4602 43.2921 57.1845 43.2921 58.1063V64.6906Z" fill="#ABABAB"/>
</svg>
`,
  camera: `<svg width="74" height="54" viewBox="0 0 74 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10V43.3333C0 45.9855 1.05357 48.529 2.92893 50.4044C4.8043 52.2798 7.34784 53.3333 10 53.3333H46.6667C49.3188 53.3333 51.8624 52.2798 53.7377 50.4044C55.6131 48.529 56.6667 45.9855 56.6667 43.3333V36.2667C56.6623 36.8879 56.8317 37.4979 57.1557 38.028C57.4796 38.5581 57.9452 38.9871 58.5 39.2667L68.5 44.2667C69.01 44.5237 69.5774 44.6453 70.1479 44.62C70.7184 44.5947 71.2728 44.4232 71.758 44.1221C72.2431 43.8209 72.6428 43.4002 72.9187 42.9002C73.1945 42.4002 73.3373 41.8377 73.3333 41.2667V12.0667C73.3373 11.4956 73.1945 10.9331 72.9187 10.4331C72.6428 9.93315 72.2431 9.5124 71.758 9.21125C71.2728 8.9101 70.7184 8.73865 70.1479 8.71333C69.5774 8.68801 69.01 8.80968 68.5 9.06667L58.5 14.0667C57.9452 14.3462 57.4796 14.7752 57.1557 15.3053C56.8317 15.8354 56.6623 16.4454 56.6667 17.0667V10C56.6667 7.34784 55.6131 4.8043 53.7377 2.92893C51.8624 1.05357 49.3188 0 46.6667 0H10Z" fill="#ABABAB"/>
</svg>
`,
};
const props = defineProps({
  status: {
    type: String,
    required: false
  },
  activity: {
    type: String,
    required: false
  },
  active: { // Для зеленого цвета в activity
    type: Boolean,
    required: false
  },
  mentions: {
    type: String,
    required: false
  },
  square: {
    type: Boolean,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  avatars: { // Для вывода двух аватаров
    type: Object,
    required: false
  },
  multy: { // Выводит два аватара 
    type: Boolean,
    required: false
  },
  size: {
    type: Number,
    required: false
  }
})
/* console.log(props.avatars[0]) */
const defineActivity = () => {
  if (props.activity == 'call') return 'call';
  else if (props.activity == 'display') return 'display';
  else if (props.activity == 'camera') return 'camera';
  else return null;
};
</script>
<style lang="scss" scoped>
.avatar {
  position: relative;

  .mentions {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
  }

  &.square {
    img {
      border-radius: 13px;
    }
  }

  .single-user-avatar {
    img.single-avatar {}
  }

  .multi-user-avatar {
    img.multi-avatar {}
  }
}

.user-logo {
  background-color: var(--system-purple-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 18%;
  }
}

img {
  background-position: center center;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>