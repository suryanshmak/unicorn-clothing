import { takeLatest, call, put } from "redux-saga/effects";
import { convertSnapshotToMap, db } from "../firebase/util";
import {
  fetchCollectionsSuccess,
  fetchCollectionsError,
  fetchCarouselSuccess,
  fetchCarouselError,
} from "../actions";
import {
  FETCH_COLLECTIONS_START,
  FETCH_CAROUSEL_START,
} from "../actions/types";

function* fetchData(collectionPath, fetchDataSuccess, fetchDataError) {
  try {
    const collectionRef = db.collection(collectionPath);
    const snapshot = yield collectionRef.get();
    const collections = yield call(convertSnapshotToMap, snapshot);
    yield put(fetchDataSuccess(collections));
  } catch (error) {
    yield put(fetchDataError(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(FETCH_COLLECTIONS_START, () =>
    fetchData("collections", fetchCollectionsSuccess, fetchCollectionsError)
  );
}

export function* fetchCarouselStart() {
  yield takeLatest(FETCH_CAROUSEL_START, () =>
    fetchData("carousel", fetchCarouselSuccess, fetchCarouselError)
  );
}
