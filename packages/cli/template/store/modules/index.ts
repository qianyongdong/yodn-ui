import { defineStore } from 'pinia';

enum StoreKey {
  INDEX_LIST = 'index-total'
}

interface DataItem {
  title: string;
  id: string;
  finish: boolean;
  editing?: boolean;
}

interface IndexState {
  total: DataItem[]; //总个数
  testName: string;
}

/**
 * 生成一个用不重复的ID
 * @param { Number } randomLength
 */
function getUUID(randomLength: number) {
  return Number(
    Math.random().toString().substr(2, randomLength) + Date.now()
  ).toString(36);
}

export const useIndexStore = defineStore('index', {
  state: (): IndexState => {
    return {
      total: [],
      testName: '测试一下'
    };
  },
  actions: {
    deleteItem(item: DataItem) {
      const arr = this.total;
      const index = arr.findIndex((item2: DataItem) => item2.id == item.id);
      if (index != -1) {
        arr.splice(index, 1);
      }
    },
    addItem(item: DataItem) {
      const arr = this.total;

      arr.push({
        id: getUUID(16),
        title: item.title,
        finish: false
      });
    },

    clearData() {
      this.total = [];
    },

    restoreData() {
      const totalStr = localStorage.getItem(StoreKey.INDEX_LIST);
      if (totalStr) {
        this.total = JSON.parse(totalStr);
      }
    }
  }
});
