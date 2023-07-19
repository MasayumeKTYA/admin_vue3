import { defineStore } from "pinia";
import { ref } from "vue";

export const useIndexStore = defineStore("main", () => {
  const val = ref(0);
  return { val };
});
