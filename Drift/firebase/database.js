import { db } from "./config";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { uploadImage } from "./filestorage";

const MAX_ITEM_NAME_LENGTH = 60;
const MAX_ITEM_DESCRIPTION_LENGTH = 1000;
const MIN_ITEM_PRICE = 0.0;

const ITEM_QUALITY_VAL2TITLE = {
  0: "Brand New",
  1: "Like New",
  2: "Used - Excellent",
  3: "Used - Good",
  4: "Used - Fair",
};

const ITEM_TYPE_VAL2TITLE = {
  0: "Tops",
  1: "Bottoms",
  2: "Dresses",
  3: "Coats and Jackets",
  4: "Jumpsuits and Rompers",
  5: "Suits",
  6: "Footwear",
  7: "Accessories",
  8: "Sleepwear",
  9: "Underwear",
  10: "Swimwear",
  11: "Costume",
};

const ITEM_DEMOGRAPHIC_VAL2TITLE = {
  0: "Men",
  1: "Women",
  2: "Children",
  3: "Unisex",
  4: "Anything",
};

const ITEM_SIZE_CATEGORIES = new Set([
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
]);

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

/**Attempts to create new item in `items` collection.
 *
 * @param {string} owner The unique ID of the user who owns the item.
 * @param {string} name The name of the item.
 * @param {number} price The price of the item.
 * @param {string} desc The description of the item.
 * @param {number} type The type of clothing of the item.
 * - 0: Tops,
 * - 1: Bottoms,
 * - 2: Dresses,
 * - 3: Coats and Jackets,
 * - 4: Jumpsuits and Rompers,
 * - 5: Suits,
 * - 6: Footwear,
 * - 7: Accessories,
 * - 8: Sleepwear,
 * - 9: Underwear,
 * - 10: Swimwear,
 * - 11: Costume,
 * @param {number} quality The quality of the item.
 * - 0: Brand New
 * - 1: Like New
 * - 2: Used - Excellent
 * - 3: Used - Good
 * - 4: Used - Fair
 * @param {string | number} size The size of the item. (XS, S, M, L, XL, XXL, XXXL, or a number)
 * @param {number} demog The target demographic of the item.
 * - 0: Men,
 * - 1: Women,
 * - 2: Children,
 * - 3: Unisex,
 * - 4: Anything
 * @param {string[]} imgURIs The image URI(s) of the item.
 * @param {string} brand (Optional) The brand of the item. Default is "".
 * @param {string[]} otherTags (Optional) Additional tags for the item. Default is [].
 * @returns True on success and false otherwise.
 */
export async function createItem(
  owner,
  name,
  price,
  desc,
  type,
  quality,
  size,
  demog,
  imgURIs,
  brand = "",
  otherTags = []
) {
  try {
    const itemRef = await addDoc(collection(db, "items"), {
      owner,
      name,
      price,
      description: desc,
      type,
      quality,
      size,
      demographic: demog,
      images: [],
      brand,
      otherTags,
      upload: new Date(),
    });
    let imgRefs = [];
    let index = 0;
    for (const uri of imgURIs) {
      const ref = await uploadImage(uri, owner, itemRef.id, index);
      if (ref === null) {
        await deleteDoc(itemRef);
        throw "An image failed to upload!";
      }
      imgRefs.push(ref);
      index++;
    }
    await updateDoc(itemRef, { images: imgRefs });
    console.log(`Created new item with uid: ${itemRef.id}`);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

/**Checks if the user exists.
 *
 * @param {string} uid The user's unique ID.
 * @returns True if user exists and false otherwise.
 */
export async function isExistingUser(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

/**Checks if the item name's length is at most `MAX_ITEM_NAME_LENGTH`.
 *
 * @param {string} name The item's name.
 * @returns True if name does not exceed `MAX_ITEM_NAME_LENGTH` and false otherwise.
 */
export function isValidItemName(name) {
  return name.length <= MAX_ITEM_NAME_LENGTH;
}

/**Checks if the item description's length is at most `MAX_ITEM_DESCRIPTION_LENGTH`.
 *
 * @param {string} text The item's description.
 * @returns True if text does not exceed `MAX_ITEM_DESCRIPTION_LENGTH` and false otherwise.
 */
export function isValidItemDesc(text) {
  return text.length <= MAX_ITEM_DESCRIPTION_LENGTH;
}

/**Checks if the item price is at least `MIN_ITEM_PRICE`.
 *
 * @param {number} price The item's price.
 * @returns True if price is at least `MIN_ITEM_PRICE` and false otherwise.
 */
export function isValidPrice(price) {
  return MIN_ITEM_PRICE <= price;
}

/**Checks if the item quality is a valid option.
 *
 * @param {number} quality The value corresponding to a quality category.
 * @returns True if quality is a valid option and false otherwise.
 */
export function isValidQuality(quality) {
  return quality in ITEM_QUALITY_VAL2TITLE;
}

/**Checks if the item size is a valid category or a number.
 *
 * @param {string | number} size The item's size
 * @returns
 */
export function isValidSize(size) {
  return size in ITEM_SIZE_CATEGORIES || !isNaN(size);
}

/**
 *
 * @param {number} demog
 * @returns
 */
export function isValidDemographic(demog) {
  return demog in ITEM_DEMOGRAPHIC_VAL2TITLE;
}

/**
 *
 * @param {number} type
 * @returns
 */
export function isValidType(type) {
  return type in ITEM_TYPE_VAL2TITLE;
}

/**Converts text input into a number with two places after the decimal.
 *
 * @param {string} text The text to parse
 * @returns Financial number or `NaN` if unable to parse.
 */
export function financial(text) {
  const result = Number.parseFloat(text).toFixed(2);
  return result === "NaN" ? NaN : Number.parseFloat(result);
}
