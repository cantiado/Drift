import { registerUser, logInUser } from "./authentication";
import { getImageFromLibrary } from "./filestorage";
import { auth } from "./config";

const EMAIL = "test@test.com";
const PASSWORD = "password";
const FIRST = "Test";
const LAST = "User";

export async function runTest() {
  const uid = await logInUser(EMAIL, PASSWORD);
  if (uid) {
    console.log("Success:", uid);
    console.log("User:", auth.currentUser);
  } else {
    console.log("Failed!");
  }
  getImageFromLibrary();
}

// console.log("TEST", auth.currentUser);
/*
const res = await registerUser(EMAIL, PASSWORD, FIRST, LAST);

if (res.uid) {
  console.log("Success:", res.uid);
} else {
  console.log("Failed!", res.code);
  const uid = await logInUser(EMAIL, PASSWORD);
  if (uid) {
    console.log("Success:", uid);
    console.log("User:", auth.currentUser);
  } else {
    console.log("Failed!");
  }
}
*/
