import { auth } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";

/**Attempts to register a new user. On success,
 * saves the user information to the firestore and returns the user's uid.
 * Otherwise, returns null.
 *
 * @param {string} email
 * @param {string} password
 * @param {string} first
 * @param {string} last
 * @returns The user's uid on success and null otherwise.
 */
export async function registerUser(email, password, first, last) {
  let userCredential = null;
  try {
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error) {
    console.error(error);
  }
  return null;
}

/**
 *
 * @param {*} email
 * @param {*} password
 * @returns
 */
export function logInUser(email, password) {
  return 1;
}


