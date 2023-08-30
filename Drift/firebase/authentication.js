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
 * - -10: Email already in use
 * - -11: Invalid email
 * - -20: Weak password
 * - -40: Could not create user in database
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
      return -40;
    }
    return 1;
  } catch (error) {
    console.error(error);
    switch (error.code) {
      case "auth/email-already-in-use":
        return -10;
      case "auth/invalid-email":
        return -11;
      case "auth/weak-password":
        return -20;
      default:
        return -999;
    }
  }
  return NaN;
}

/**Attempts to log in a user.
 *
 * On success, authenticates and logs in the user and returns 1.
 *
 * On failure, returns one of the following values corresponding to the cause of failure:
 * - -11: Invalid email
 * - -21: Wrong password
 * - -30: User disabled
 * - -31: User not found
 * - -999: Other error
 *
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns 1 on success and a negative number on failure.
 */
export async function logInUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return 1;
  } catch (error) {
    console.error(error);
    switch (error.code) {
      case "auth/invalid-email":
        return -11;
      case "auth/user-disabled":
        return -30;
      case "auth/user-not-found":
        return -31;
      case "auth/wrong-password":
        return -21;
      default:
        return -999;
    }
  }
  return NaN;
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
