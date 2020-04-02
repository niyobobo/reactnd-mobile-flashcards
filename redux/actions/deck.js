import {
  getDecks,
  saveDeckTitle,
  removeDeck
} from "../../utils/api";

export const GET_ALL_DECKS = 'GET_ALL_DECKS';
export const CREATE_DECK = 'CREATE_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

const getDecksAction = (decks) => {
  return {
    type: GET_ALL_DECKS,
    decks
  }
}

const createDeckAction = (deck) => {
  return {
    type: CREATE_DECK,
    deck
  }
}

const removeDeckAction = (key) => {
  return {
    type: REMOVE_DECK,
    key
  }
}

export const getAllDecks = () => async dispatch => {
  const results = await getDecks();
  return dispatch(getDecksAction(results));
}

export const createADeck = (title) => async dispatch => {
  const deck = await saveDeckTitle(title);
  return dispatch(createDeckAction(deck));
}

export const deleteDeck = (key) => dispatch => {
  dispatch(removeDeckAction(key));
  return removeDeck(key);
}