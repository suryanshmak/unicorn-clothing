import { all, call } from "redux-saga/effects";
import { fetchCarouselStart, fetchCollectionsStart } from "./sagas";

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart), call(fetchCarouselStart)]);
}
