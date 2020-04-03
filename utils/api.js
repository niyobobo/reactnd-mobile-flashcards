import { AsyncStorage } from 'react-native';

const FLASHCARD_STORAGE_KEY = 'reactnano:flashcard';
/**
 * @return all of the decks along with their titles, questions, and answers.
 */
export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse);
};

/**
 * Return a deck associated to the provided id.
 * @param { string } id - Deck to be retrieved
 * @returns { Object } - deck
 */
export const getDeck = id => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(JSON.parse)
    .then(results => results[id]);
};

/**
 * Create a deck based on the provided title.
 * @param {*} title - deck title
 * @returns { Object } - created deck
 */
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

/**
 * Delete a deck matches provided key
 * @param {*} key - Formatted key (from title) referred as deckId
 */
export const removeDeck = async (key) => {
  const data = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse)
  data[key] = undefined
  delete data[key];
  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
}

/**
 * Create a new question related to a deck
 * @param {Object} card - payload data of the question to be created
 * @param {string} deck  - associated deck where the question is assigned to
 */
export const addCardToDeck = async (card, deck) => {
  const data = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(JSON.parse);
  data[deck].questions.push(card);
  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
};