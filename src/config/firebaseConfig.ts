import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../api/v1/firebaseKey/fb_key.json"; // new import

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

//allows us to use firebase authentication system, the auth object provides some authenication methods
const auth: Auth = getAuth();

const db: Firestore = getFirestore();

export { auth, db };