import { AsyncStorage } from 'react-native';

const FLASHCARD_STORAGE_KEY = 'reactnano:flashcard';

export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse);
};

export const getDeck = id => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(JSON.parse)
    .then(results => results[id]);
};

export const saveDeckTitle = async title => {
  const key = title.replace(' ', '');
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [key]: {
      title,
      questions: []
    }
  })).then(async () => {
    const res = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse);
    return {
      [key]: res[key]
    };
  });
};

export const removeDeck = async (key) => {
  const data = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse)
  data[key] = undefined
  delete data[key];
  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
}

export const addCardToDeck = async (card, deck) => {
  const data = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse);
  data[deck].questions.push(card);
  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
};