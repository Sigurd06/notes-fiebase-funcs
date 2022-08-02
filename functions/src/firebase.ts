const credentials = require("../credentials.json");
import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

export const db = admin.firestore();
