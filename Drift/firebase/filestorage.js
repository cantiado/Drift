import { storage } from "./config";
import { ref, uploadBytes, uploadString } from "firebase/storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

/**
 *
 * @param {string} uri
 * @returns
 */
async function uploadImage(uri) {
  const IMAGE_REF = ref(storage, "testpath");
  await uploadString(IMAGE_REF, uri, "data_url");
  return 1;
}

export async function getImageFromLibrary() {
  const RESULT = await launchImageLibrary({
    mediaType: "photo",
    selectionLimit: 1,
  });
  console.log(RESULT.assets[0]);
  await uploadImage("", RESULT.assets[0].uri);
}
