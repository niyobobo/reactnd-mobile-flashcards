import { getDecks } from "../../utils/api";

export const GET_ALL_DECKS = 'GET_ALL_DECKS';
export const CREATE_DECK = 'CREATE_DECK';

const getDecksAction = (decks) => {
  return {
    type: GET_ALL_DECKS,
    decks
  }
}

export const getAllDecks = () => async dispatch => {
  const results = await getDecks();
  return dispatch(getDecksAction(results));
}