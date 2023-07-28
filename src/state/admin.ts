import { defineStore, } from "pinia";
import { shopStore } from './index'
export const adminStore = defineStore("admin", {
  state: () => ({

  }),
  actions: {
    text() {
      console.log(shopStore().name);

    }
  },
});

