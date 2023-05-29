import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

const firebaseConfig = {
    apiKey: 'AIzaSyDqqkhcTvg1qfduRL9LcbNGXA3WCHB6aKw',
    authDomain: 'moviewebadmin.firebaseapp.com',
    projectId: 'moviewebadmin',
    storageBucket: 'moviewebadmin.appspot.com',
    messagingSenderId: '365032820768',
    appId: '1:365032820768:web:670918a4b7093aa2002c45',
    measurementId: 'G-DRQSF5D91W',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (imageUpload) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((val) => {
        getDownloadURL(imageRef).then((url) => {
            console.log('url', url);

            toast.success('Upload image success!!!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return url;
        });
    });
};
