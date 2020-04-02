import { CREATE_CARD } from '../actions/card';
import { CREATE_DECK, GET_ALL_DECKS, REMOVE_DECK } from "../actions/deck";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case CREATE_DECK:
      return {
        ...state,
        ...action.deck
      };
    case REMOVE_DECK:
      return Object.assign({}, state, {
        [action.key]: undefined
      });
    case CREATE_CARD:
      const { card, deck } = action;
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: state[deck].questions.concat(card)
        }
      };
    default:
      return state;
  }
}