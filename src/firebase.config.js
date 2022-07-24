import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABHkQTAwfDHsvMdJoTBkFU_-QTngI-h5w",
  authDomain: "doctors-protal-4c050.firebaseapp.com",
  databaseURL: "https://doctors-protal-4c050.firebaseio.com",
  projectId: "doctors-protal-4c050",
  storageBucket: "doctors-protal-4c050.appspot.com",
  messagingSenderId: "227772383151",
  appId: "1:227772383151:web:b3af193e6cbfbb9d74b95a",
  measurementId: "G-DC51SEWFY6",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
