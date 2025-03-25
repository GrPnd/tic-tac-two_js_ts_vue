import { ref } from 'vue'
import { defineStore } from 'pinia'
import { GameBrain } from '../bll/gameBrain'

export const useGameStore = defineStore('gameData', () => {
  const game = ref()
  return { game }
})
