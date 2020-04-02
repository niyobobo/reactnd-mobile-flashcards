import { AsyncStorage } from "react-native"

const FLASHCARD_STORAGE_KEY = 'reactnano:flashcard'

export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse)
}

export const getDeck = (id) => {}

export const saveDeckTitle = (title) => {}

export const addCardToDeck = (card, title) => {}