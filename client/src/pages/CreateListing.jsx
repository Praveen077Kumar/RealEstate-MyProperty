import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setfiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [uploading,setUploading ] = useState(false);
  const [imageUploadErrors, setImageUploadErrors] = useState(null);
  console.log(formData, "formdata");

  const handleImageUpload = async (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadErrors(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadErrors(false);
      }).catch((error) => {
        setImageUploadErrors('Image upload error (max 2 mb per image)');
        setUploading(false);
      });
    }
    else{
      setImageUploadErrors('You can only upload  upto 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
             setUploading(false)
          });
        }
      );
    });
  };

  const hanldeDeleteUploadedImage =(index)=>{
     setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_,i) => i !== index),
     })
  }
  return (
    <main className="p=3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6 uppercase p-2">
        Listing Product
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded"
            id="address"
            required
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furniture" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <input
                placeholder="0"
                type="number"
                id="bedrooms"
                min="0"
                max="10"
                required
                className="p-3 border  border-grey-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                placeholder="0"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border  border-grey-300 rounded-lg"
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                placeholder="0"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border  border-grey-300 rounded-lg"
              />
              <p className="flex flex-col items-center">
                Regular Price
                <span className="text-xs">($/month)</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                placeholder="0"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-grey-300 rounded-lg"
              />
              <p className="flex flex-col items-center">
                Discounted Price
                <span className="text-xs">($/month)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            image:
            <span className="font-normal ml-2">
              first image will be the cover (max:6)
            </span>
          </p>
          <div className="flex gap-4 bg-grey-800 p-2">
            <input
              onChange={(e) => setfiles(e.target.files)}
              className="p-3 border shadow-sm bg-gray-50 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
              className=" my-3 hover:shadow-lg hover:bg-green-200 shadow-sm disabled:opacity-80 rounded-lg border border-green-700 text-green-700 p-3 uppercase"
            >
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
           <p className="text-red-800 text-sm">{imageUploadErrors && imageUploadErrors}</p>
           {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(
              <div key={url} className="flex justify-between p-3 border bg-slate-150 items-center">
                <img src={url} alt="listing items" className="w-20 h-20 object-contain rounded-lg"/>
                <button type="button" onClick={()=>hanldeDeleteUploadedImage(index)} className="p3 mx-4 rounded-lg uppercase opacity-75 text-red-700">Delete</button>
              </div>
              
             
            ))
           }
          <button className="hover:opacity-85 p-3 border rounded-lg bg-slate-700 text-white">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
