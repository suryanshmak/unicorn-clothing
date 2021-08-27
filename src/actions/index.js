import {
  SIGN_IN,
  SIGN_OUT,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  SET_QUANTITY,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_ERROR,
  FETCH_COLLECTIONS_START,
  FETCH_CAROUSEL_START,
  FETCH_CAROUSEL_SUCCESS,
  FETCH_CAROUSEL_ERROR,
} from "./types";

export const signIn = () => ({
  type: SIGN_IN,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const clearProduct = (product) => ({
  type: CLEAR_PRODUCT,
  payload: product,
});

export const setQuantity = (product, quantity) => ({
  type: SET_QUANTITY,
  payload: { product, quantity },
});

export const fetchCollectionsStart = () => ({
  type: FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collections) => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: collections,
});

export const fetchCollectionsError = (errorMessage) => ({
  type: FETCH_COLLECTIONS_ERROR,
  payload: errorMessage,
});

export const fetchCarouselStart = () => ({
  type: FETCH_CAROUSEL_START,
});

export const fetchCarouselSuccess = (carousel) => ({
  type: FETCH_CAROUSEL_SUCCESS,
  payload: carousel,
});

export const fetchCarouselError = (errorMessage) => ({
  type: FETCH_CAROUSEL_ERROR,
  payload: errorMessage,
});
