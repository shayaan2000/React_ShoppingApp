import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdkv6_pniMukaDj_YLVS-Tb2jKDF9YTLk",
  authDomain: "crwn-db-a683c.firebaseapp.com",
  projectId: "crwn-db-a683c",
  storageBucket: "crwn-db-a683c.appspot.com",
  messagingSenderId: "250423907723",
  appId: "1:250423907723:web:d1a9e2dced5e0bafb3cb8e",
  measurementId: "G-8SVC0XWEK6",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ params: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, "users", userAuth.uid);
  console.log("User ref", userRef);
  const snapShot = await getDoc(userRef);
  console.log(userAuth.uid);

  console.log("SNAPSSHOT--", snapShot);

  if (!snapShot.exists()) {
    // if snapshot doesnt exist, we want to create the user
    console.log("Snapshot doesnt exist");

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error while creating user", error.message);
    }
  } else {
    console.log("Snapshot exists");
  }

  return userRef;
};

// converting snapshot to obj
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // console.log(transformedCollection);

  //converting the array of objs to an object with 5 keys and nested obs
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

//initially from shop data, not called anywhere now
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(firestore, collectionKey);
  console.log(collectionRef);
  //at this point nothing is instantiated in the firestore

  //for predictability we need all to succeed or all to fail, so we will use a batch

  // console.log("TYPE", typeof objectsToAdd);
  // console.log("OBJTOADD", objectsToAdd);

  const batch = writeBatch(firestore);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};
