import {INVALIDATE_CHARACTERS, RECEIVE_CHARACTERS, REQUEST_CHARACTERS, SET_TOKEN, URL_API} from './constants'
import axios from "axios/index";

function setToken(token) {
  return {
    type: SET_TOKEN,
    payload: {token}
  };
}

function requestCharacters() {
  return {
    type: REQUEST_CHARACTERS,
  };
}

function invalidateCharacters() {
  return {
    type: INVALIDATE_CHARACTERS,
  };
}

function receiveCharacters(characters) {
  return {
    type: RECEIVE_CHARACTERS,
    payload: {characters}
  };
}


function fetchCharacters() {
  return function (dispatch) {
    dispatch(requestCharacters());
    return axios.get(`${URL_API}/characters`)
      .then(res => {
        const characters = res.data.characters;
        dispatch(receiveCharacters(characters))
      });
  };
}

function fetchCharactersIfNeeded() {
  return function (dispatch, getState) {
    const {invalidated} = getState();

    if (invalidated) {
      dispatch(fetchCharacters())
    }
  };
}


function modifyCharacter(character) {
  return function (dispatch) {
    return axios.post(`${URL_API}/characters/${character._id}`, character)
      .then(res => {
        dispatch(invalidateCharacters());
        dispatch(fetchCharactersIfNeeded());
      })
      .catch(error => {
        console.log(error)
      });
  };
}


function deleteCharacter(characterId) {
  return function (dispatch, getState) {
    const {token} = getState();
    return axios.delete(`${URL_API}/characters/${characterId}`, {
      headers: {Authorization: token}
    })
      .then(res => {
        dispatch(invalidateCharacters());
        dispatch(fetchCharactersIfNeeded());
      })
      .catch(error => {
        console.log(error)
      });
  };
}


export default {
  setToken,
  fetchCharactersIfNeeded,
  modifyCharacter,
  deleteCharacter
};