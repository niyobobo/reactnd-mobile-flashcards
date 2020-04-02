import {
  AsyncStorage
} from 'react-native';

const FLASHCARD_STORAGE_KEY = 'reactnano:flashcard';

export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse);
};

export const getDeck = id => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(JSON.parse)
    .then(results => results[id]);
};

export const saveDeckTitle = title => {
  const key = title.replace(' ', '');
  return AsyncStorage.mergeItem(
    FLASHCARD_STORAGE_KEY,
    JSON.stringify({
      [key]: title
    })
  );
};

export const addCardToDeck = (card, title) => {};