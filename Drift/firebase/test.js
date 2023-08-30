import { registerUser, logInUser, getCurrentUserUID } from "./authentication";
import { createItem } from "./database";
import { getImagesFromLibrary } from "./filestorage";
import { auth } from "./config";

const EMAIL = "test@test.com";
const PASSWORD = "password";
const FIRST = "Test";
const LAST = "User";

export async function run() {
  console.log("START TEST SCRIPT");
  console.log("Before login:", getCurrentUserUID());
  await logInUser(EMAIL, PASSWORD);
  console.log("After login:", getCurrentUserUID());
  const imgURIs = await getImagesFromLibrary();
  if (imgURIs === null) {
    console.log("Failed to select images")
    return
  }
  const success = await createItem(
    getCurrentUserUID(),
    "TEST ITEM 1",
    19.99,
    "My first test item",
    0,
    0,
    "M",
    0,
    imgURIs,
    "Calvin Klein",
    ["Some", "other", "tags"]
  );
  if (success) {
    console.log("SUCCESS!");
  } else {
    console.log("FAILURE");
  }
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
