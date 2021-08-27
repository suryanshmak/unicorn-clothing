import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "uni-db-9f90d.firebaseapp.com",
  projectId: "uni-db-9f90d",
  storageBucket: "uni-db-9f90d.appspot.com",
  messagingSenderId: "666261766639",
  appId: "1:666261766639:web:8fb4ff7fdd794e1207b61a",
  measurementId: "G-T5DWVVTQSL",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

export function addDocument(user) {
  const { serverTimestamp } = firebase.firestore.FieldValue;
  const userRef = db.doc(`users/${user.uid}`);

  userRef.set({
    displayName: user.displayName,
    email: user.email,
    createdAt: serverTimestamp(),
  });
}

export const convertSnapshotToMap = (collectionsSnapshot) => {
  const transformedCollection = collectionsSnapshot.docs.map((doc) => {
    const { title, items, imageUrl, name } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      ...(items && { items }),
      title,
      ...(imageUrl && { imageUrl }),
      ...(name && { name }),
    };
  });
  return transformedCollection.reduce((accumalator, collection) => {
    accumalator[collection.title.toLowerCase()] = collection;
    return accumalator;
  }, {});
};

export default firebase;
