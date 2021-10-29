import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCU66yXQ03reHrkWl_xoDLihrU2x5n5b50",
	authDomain: "characterbuilder-f1603.firebaseapp.com",
	projectId: "characterbuilder-f1603",
	storageBucket: "characterbuilder-f1603.appspot.com",
	messagingSenderId: "949751757729",
	appId: "1:949751757729:web:c1173ace6581a7a10829e0",
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const provider = new firebase.auth.EmailAuthProvider();

export { auth, provider, firebase, firestore };
