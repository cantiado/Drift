import { db } from "./config";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**Attempts to create new user in `users` collection.
 *
 * @param {string} uid The user's unique ID.
 * @param {string} email The user's email.
 * @param {string} first The user's first name.
 * @param {string} last The user's last name.
 * @returns True on success and false otherwise.
 */
export async function createUser(uid, email, first, last) {
  try {
    await setDoc(doc(db, "users", uid), {
      email,
      first,
      last,
    });
    console.log(`Created new user with uid: ${uid}`);
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}

/**Gets a user's data from the `users` collection.
 *
 * @param {string} uid The user's unique ID.
 * @returns The user's data on successful retrieval and null otherwise.
 */
export async function getUserData(uid) {
  let docSnap = null;
  try {
    docSnap = await getDoc(doc(db, "users", uid));
  } catch (error) {
    console.error(error);
  }
  if (docSnap === null || !docSnap.exists()) return null;
  return docSnap.data();
}
