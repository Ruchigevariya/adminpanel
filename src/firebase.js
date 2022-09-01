
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPCesIU88qdo_UKN2b8q6loxkORa0hauk",
  authDomain: "adminpanel-cityhospital.firebaseapp.com",
  projectId: "adminpanel-cityhospital",
  storageBucket: "adminpanel-cityhospital.appspot.com",
  messagingSenderId: "240485236753",
  appId: "1:240485236753:web:a7b4db5517bfab7f4af1b0",
  measurementId: "G-7KMFWR9196"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);