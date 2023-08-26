import { storage } from "./config";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const IMAGE_SELECTION_LIMIT = 5;

/**Uploads a user's image of an item to the cloud storage
 * and returns the file path `<user>/<item>/<fname>`.
 *
 * @param {string} uri The image URI.
 * @param {string} user The user's unique ID.
 * @param {string} item The item's unique ID.
 * @param {string} fname The image's file name.
 * @returns The image URL on success and null otherwise.
 */
export async function uploadImage(uri, user, item, fname) {
  const fpath = `${user}/${item}/${fname}`;
  const imageRef = ref(storage, fpath);
  let url;
  try {
    await uploadString(imageRef, uri, "data_url");
    url = await getDownloadURL(imageRef)
  } catch (error) {
    console.error(error);
    return null;
  }
  return url;
}

/**Opens the user's image library to select images.
 *
 * @returns An array of image URIs on success and null otherwise.
 */
export async function getImagesFromLibrary() {
  const result = await launchImageLibrary({
    mediaType: "photo",
    selectionLimit: IMAGE_SELECTION_LIMIT, // Doesn't work on web
  });
  console.log(result);
  if (result.errorCode) {
    console.error(result.errorCode, ":", result.errorMessage);
    return null;
  }
  if (result.didCancel) {
    console.log("Canceled");
    console.error(result.errorCode, ":", result.errorMessage);
    return null;
  }
  if (result.assets.length > IMAGE_SELECTION_LIMIT) {
    console.error(
      `Exceeded image selection limit (${result.assets.length} > ${IMAGE_SELECTION_LIMIT})!`
    );
    return null;
  }
  return result.assets.map((img) => String(img.uri));
}
