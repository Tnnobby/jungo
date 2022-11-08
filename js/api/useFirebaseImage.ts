import { initializeApp } from "firebase/app";
import { getBlob, getDownloadURL, getStorage, ref } from "firebase/storage"
import { useState } from "react";
import { useRef } from "react";
import * as FileSystem from 'expo-file-system'
import firebaseConfig from "../../firebase.config";

type Url = string

export const useFirebaseImage = () => {
  const [img, setImg] = useState<null | string>(null);
  const app = useRef(initializeApp(firebaseConfig)).current;
  const storage = useRef(getStorage(app)).current;
  
  const getImg = async (url: Url) => {
    const fileName = url.split('/')[1]
    const fileInfo = await checkCache(fileName);
    if (fileInfo) {
      console.log('File Found in Cache')
      setImg(fileInfo.uri)
    } else {
      console.log('File Not Found In Cache')
      const downloadUrl = await getUrl(url);
      FileSystem.downloadAsync(downloadUrl, FileSystem.cacheDirectory + fileName)
        .then((response) => {
          console.log('Got Image')
          setImg(response.uri)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const checkCache = async (url: Url) => {
    const fileInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + url)
    return fileInfo.exists ? fileInfo : false
  }

  const getUrl = async (url: Url) => {
    const imageRef = ref(storage, url)
    return getDownloadURL(imageRef)
  }

  return {
    getImg,
    getUrl,
    imgUrl: img

  }
}