<script setup lang="ts">
import {
  CloseOutlined,
} from '@ant-design/icons-vue'
const props = defineProps(['routes'])
props


</script>
<template>
  <div class="HeaderRouyer">
    <div class="flex_box" v-for="item, index in routes" :key="item.path"
      :style="index == routes.length - 1 ? ' background-color: rgba(0, 0, 0, .1);' : ''">
      <RouterLink class="box" :to="{ name: item.path }">
        <slot :name="item.icon"></slot>
        <span>{{ item.breadcrumbName }}</span>
      </RouterLink>
      <CloseOutlined class="cursor" @click="$emit('close', index)" v-if="item.isExit" />
    </div>
  </div>
</template>
<style scoped>
.HeaderRouyer {
  display: flex;
}

.box {
  /* display: block; */
  color: #000;
  height: 40px;
  line-height: 40px;
}

.flex_box {
  width: 120px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  border-radius: 10px;
  justify-content: space-around;
}

.flex_box:hover {
  background-color: rgba(0, 0, 0, .1);
}

.cursor {
  cursor: pointer
}
</style>