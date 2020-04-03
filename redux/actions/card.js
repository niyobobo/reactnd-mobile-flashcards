import { addCardToDeck } from "../../utils/api";

export const CREATE_CARD = 'CREATE_CARD';

const createCardAction = (card, deck) => {
  return {
    type: CREATE_CARD,
    deck,
    card
  }
}

/**
 * Handling send request to the API to create a card and
 * send action to reducer to be updated
 *
 * @param { object} card - card object data (question and answer)
 * @param {string} deck - deck key
 */
export const createCard = (card, deck) => async dispatch => {
  return await addCardToDeck(card, deck).then(() => {
    return dispatch(createCardAction(card, deck))
  })
}