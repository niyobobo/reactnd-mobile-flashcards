import { addCardToDeck } from "../../utils/api";

export const CREATE_CARD = 'CREATE_CARD';

const createCardAction = (card, deck) => {
  return {
    type: CREATE_CARD,
    deck,
    card
  }
}

export const createCard = (card, deck) => async dispatch => {
  return await addCardToDeck(card, deck).then(() => {
    return dispatch(createCardAction(card, deck))
  })
}