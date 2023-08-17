import { auth } from "./config";
import { createUser } from "./database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  updateProfile,
} from "firebase/auth";

/**Attempts to register a new user.
 *
 * On success, saves the user information to the firestore and
 * returns 1.
 *
 * On failure, returns one of the following values corresponding to the cause of failure:
 * - -1: Email already in use
 * - -2: Invalid email
 * - -3: Weak password
 * - -4: Could not create user in database
 * - -999: Other error
 *
 * @param {string} email
 * @param {string} password
 * @param {string} first
 * @param {string} last
 * @returns 1 on success and a negative number on failure.
 */
export async function registerUser(email, password, first, last) {
  let userCredential = null;
  try {
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: first + " " + last[0] + ".",
    });
    const success = await createUser(
      userCredential.user.uid,
      email,
      first,
      last
    );
    if (!success) {
      await deleteUser(userCredential.user);
      return -4;
    }
    return 1;
  } catch (error) {
    console.error(error);
    switch (error.code) {
      case "auth/email-already-in-use":
        return -1;
      case "auth/invalid-email":
        return -2;
      case "auth/weak-password":
        return -3;
      default:
        return 0;
    }
  }
  return NaN;
}

/**Attempts to log in a user. On success, returns the user's uid.
 * Otherwise, returns null.
 *
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns The user's UID on success and null otherwise.
 */
export async function logInUser(email, password) {
  let userCredential = null;
  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  } catch (error) {
    console.error(error);
  }
  return null;
}

/**Gets the currently authenticated user's UID. If there is no authenticated user, returns null.
 *
 * @returns The user's UID or null.
 */
export function getCurrentUserUID() {
  return auth.currentUser ? auth.currentUser.uid : null;
}

/**Gets the currently authenticated user's display name (default: FirstName LastName).
 * If there is no authenticated user, returns null.
 *
 * @returns The user's display name or null.
 */
export function getCurrentUserDisplayName() {
  return auth.currentUser ? auth.currentUser.displayName : null;
}

/**Logs out the currently authenticated user.
 *
 * @returns True if successful and false otherwise
 */
export async function logOut() {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}
