import { db } from "./config";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
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
const ITEM_QUALITY_TITLE2VAL = {
  "BRAND NEW": 0,
  "LIKE NEW": 1,
  "USED - EXCELLENT": 2,
  "USED - GOOD": 3,
  "USED - FAIR": 4,
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
const ITEM_TYPE_TITLE2VAL = {
  TOPS: 0,
  BOTTOMS: 1,
  DRESSES: 2,
  "COATS AND JACKETS": 3,
  "COATS & JACKETS": 3,
  "JUMPSUITS AND ROMPERS": 4,
  "JUMPSUITS & ROMPERS": 4,
  SUITS: 5,
  FOOTWEAR: 6,
  ACCESSORIES: 7,
  SLEEPWEAR: 8,
  UNDERWEAR: 9,
  SWIMWEAR: 10,
  COSTUME: 11,
};

const ITEM_DEMOGRAPHIC_VAL2TITLE = {
  0: "Men",
  1: "Women",
  2: "Children",
  3: "Unisex",
  4: "Anything",
};
const ITEM_DEMOGRAPHIC_TITLE2VAL = {
  MEN: 0,
  WOMEN: 1,
  CHILDREN: 2,
  UNISEX: 3,
  ANYTHING: 4,
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
      items: [],
      saved: [],
      cart: [],
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

/**Attempts to create new item in `items` collection
 * and adds the new item to the owner's items.
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
      id: "",
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
      sold: false,
      upload: new Date(),
    });
    await updateDoc(itemRef, { id: itemRef.id });
    let imgURLs = [];
    let index = 0;
    for (const uri of imgURIs) {
      const url = await uploadImage(uri, owner, itemRef.id, index);
      if (url === null) {
        await deleteDoc(itemRef);
        throw "An image failed to upload!";
      }
      imgURLs.push(url);
      index++;
    }

    await updateDoc(itemRef, { images: imgURLs });
    await updateDoc(doc(db, "users", owner), { items: arrayUnion(itemRef.id) });
    console.log(`Created new item with uid: ${itemRef.id}`);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

/**Add an item to a user's saved items.
 *
 * @param {string} user The user's unique ID.
 * @param {string} item The item's unique ID.
 * @returns True on success and false on fail.
 */
export async function addSavedItem(user, item) {
  const userRef = doc(db, "users", user);
  try {
    await updateDoc(userRef, { saved: arrayUnion(item) });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

/**Remove an item to a user's saved items.
 *
 * @param {string} user The user's unique ID.
 * @param {string} item The item's unique ID.
 * @returns True on success and false on fail.
 */
export async function removeSavedItem(user, item) {
  const userRef = doc(db, "users", user);
  try {
    await updateDoc(userRef, { saved: arrayRemove(item) });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

/**Add an item to a user's cart.
 *
 * @param {string} user The user's unique ID.
 * @param {string} item The item's unique ID.
 * @returns True on success and false on fail.
 */
export async function addCartItem(user, item) {
  const userRef = doc(db, "users", user);
  console.log("TEST", item);
  try {
    await updateDoc(userRef, { cart: arrayUnion(item) });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

/**Removes an item to a user's cart.
 *
 * @param {string} user The user's unique ID.
 * @param {string} item The item's unique ID.
 * @returns True on success and false on fail.
 */
export async function removeCartItem(user, item) {
  const userRef = doc(db, "users", user);
  console.log("TEST", item);
  try {
    await updateDoc(userRef, { cart: arrayRemove(item) });
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

/**Gets an item's data from the `items` collection.
 *
 * @param {string} uid The item's unique ID.
 * @returns The user's data on successful retrieval and null otherwise.
 */
export async function getItemData(uid) {
  let docSnap = null;
  try {
    docSnap = await getDoc(doc(db, "items", uid));
  } catch (error) {
    console.error(error);
  }
  if (docSnap === null || !docSnap.exists()) return null;
  return docSnap.data();
}

/**Get many items data using their item IDs
 *
 * @param {string[]} uids The IDs of the items.
 * @param {-1 | 0 | 1} isSold The sold status of the items.
 * - -1: Both sold and unsold items
 * - 0: Unsold items only
 * - 1: Sold items only
 * @returns The items' data on success and null otherwise.
 */
export async function getManyItemData(uids, isSold = 0) {
  const itemsRef = collection(db, "items");
  let q;
  switch (isSold) {
    case -1:
      q = query(itemsRef, where("id", "in", uids));
      break;
    case 0:
    case 1:
      q = query(
        itemsRef,
        where("id", "in", uids),
        where("sold", "==", isSold === 1)
      );
      break;
    default:
      console.error("Invalid isSold argument!");
      return null;
  }
  let querySnap = null;
  try {
    querySnap = await getDocs(q);
  } catch (error) {
    console.error(error);
  }
  if (querySnap === null) return null;
  return querySnap.docs.map((doc) => doc.data());
}

/**Gets all items of a certain type.
 *
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
 * @returns An array of item data on success and null otherwise.
 */
export async function getItemsByType(type) {
  if (!isValidType(type)) {
    console.error("Cannot get items of an invalid type!");
    return null;
  }
  const itemsRef = collection(db, "items");
  const q = query(itemsRef, where("type", "==", type));
  let querySnap = null;
  try {
    querySnap = await getDocs(q);
  } catch (error) {
    console.error(error);
  }
  if (querySnap === null) return null;
  return querySnap.docs.map((doc) => doc.data());
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
 * @returns True if the size is in the valid letter sizes or a number and false otherwise.
 */
export function isValidSize(size) {
  return ITEM_SIZE_CATEGORIES.has(size.toUpperCase()) || !isNaN(size);
}

/**Checks if the demographic value is valid
 *
 * @param {number} demog The value for the demographic
 * @returns True if valid and false otherwise
 */
export function isValidDemographic(demog) {
  return demog in ITEM_DEMOGRAPHIC_VAL2TITLE;
}

/**Checks if the given value matches a clothing type.
 *
 * @param {number} type The value for clothing type.
 * @returns True if valid and false otherwise.
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

/**Gets the number value corresponding to the item type title.
 *
 * @param {string} title The title of the item type.
 * @returns The number value of the item type or -1 if invalid title.
 */
export function getItemTypeValue(title) {
  title = title.toUpperCase();
  if (title in ITEM_TYPE_TITLE2VAL) return ITEM_TYPE_TITLE2VAL[title];
  return -1;
}

/**Gets the title corresponding to the item type value.
 *
 * @param {number} value The value of the item type.
 * @returns The title for the item type or "" if invalid value
 */
export function getItemTypeTitle(value) {
  if (value in ITEM_TYPE_VAL2TITLE) return ITEM_TYPE_VAL2TITLE[value];
  return "";
}

/**Gets the number value corresponding to the item quality title.
 *
 * @param {string} title The title of the item quality.
 * @returns The number value of the item quality or -1 if invalid title.
 */
export function getItemQualityValue(title) {
  title = title.toUpperCase();
  if (title in ITEM_QUALITY_TITLE2VAL) return ITEM_QUALITY_TITLE2VAL[title];
  return -1;
}

/**Gets the title corresponding to the item quality value.
 *
 * @param {number} value The value of the item quality.
 * @returns The title for the item quality or "" if invalid value
 */
export function getItemQualityTitle(value) {
  if (value in ITEM_QUALITY_VAL2TITLE) return ITEM_QUALITY_VAL2TITLE[value];
  return "";
}

/**Gets the number value corresponding to the item demographic title.
 *
 * @param {string} title The title of the item demographic.
 * @returns The number value of the item demographic or -1 if invalid title.
 */
export function getItemDemographicValue(title) {
  title = title.toUpperCase();
  if (title in ITEM_DEMOGRAPHIC_TITLE2VAL)
    return ITEM_DEMOGRAPHIC_TITLE2VAL[title];
  return -1;
}

/**Gets the title corresponding to the item demographic value.
 *
 * @param {number} value The value of the item demographic.
 * @returns The title for the item demographic or "" if invalid value
 */
export function getItemDemographicTitle(value) {
  if (value in ITEM_DEMOGRAPHIC_VAL2TITLE)
    return ITEM_DEMOGRAPHIC_VAL2TITLE[value];
  return "";
}
