import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import treeJson from '../utils/tree.json'

type treeJsonMap = {
  [key: string]: string[]
}
export const useBlogTreeStore = defineStore('BlogTree', () => {
  treeJson.forEach((item) => {
    item.children.sort((a, b) => a.sort - b.sort)
  })
  const treeJsonMap = computed(() => {
    const map = {} as treeJsonMap
    for (const item of treeJson) {
      map[item.groupName] = item.children.map((child) => child.name)
    }
    return map
  })
  return { treeJson, treeJsonMap }
})
