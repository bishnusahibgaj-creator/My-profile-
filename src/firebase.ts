import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0127005591",
  appId: "1:583978699134:web:7f48b4f2da499a0b9ecb2f",
  apiKey: "AIzaSyAJZJnZQ_yFyYCVFbg0Sp4MmRvWo7gF5Tk",
  authDomain: "gen-lang-client-0127005591.firebaseapp.com",
  storageBucket: "gen-lang-client-0127005591.firebasestorage.app",
  messagingSenderId: "583978699134",
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, "ai-studio-bizgrowdigitalst-88aab89c-e5ab-4435-833c-26ca4b2f93a3");
export const auth = getAuth(app);
