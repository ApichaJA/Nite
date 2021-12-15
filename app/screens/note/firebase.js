import { initializeApp } from "firebase/app";

import * as firebase from 'firebase/compat'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { useLinkProps } from "@react-navigation/native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDktj4-QZhDhR9E4hdN8NYSPAUWaA4xxm0",
  authDomain: "nite-5b18b.firebaseapp.com",
  projectId: "nite-5b18b",
  storageBucket: "nite-5b18b.appspot.com",
  messagingSenderId: "605794103717",
  appId: "1:605794103717:web:7190e75d62bad208e9f84c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase

const storage = getStorage();
const firestore = getFirestore();


export async function addFile(blob, name){
    return new Promise((resolve, _) => {
        const storageRef = ref(storage, name)
        try{
            uploadBytes(storageRef, blob).then(() => {
                getDownloadURL(ref(storage, name)).then((url) => {
                    resolve(url)
                })
            })
        }
        catch(e){
            console.log(e)
        }
    })
}