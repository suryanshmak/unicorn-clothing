import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectItemQuantity = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalator, currentValue) =>
        accumalator + Number(currentValue.quantity),
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalator, currentValue) =>
      accumalator + currentValue.quantity * currentValue.price,
    0
  )
);

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCarousel = createSelector(
  [selectShop],
  (shop) => shop.carousel
);

export const selectConvertedCarousel = createSelector(
  [selectCarousel],
  (carousel) =>
    carousel ? Object.keys(carousel).map((key) => carousel[key]) : null
);

export const selectConvertedCollections = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : null
);

export const selectCollection = (id) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[id] : null
  );

export const selectIsFetching = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);

const camelize = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/-/g, "");

export const selectProductFromCollections = (category, id) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[category].items[camelize(id)] : null
  );
