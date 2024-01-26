import React from "react";

export default function CreateListing() {
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
            <input className="p-3 border shadow-sm bg-gray-50 rounded w-full" type="file" id="images" accept="image/*" multiple
            />
            <button className="my-3 hover:shadow-lg hover:bg-green-200 shadow-sm disabled:opacity-80 rounded-lg border border-green-700 text-green-700 p-3 uppercase">Upload</button>
          </div>
          <button className="hover:opacity-85 p-3 border rounded-lg bg-slate-700 text-white">Create Listing</button>
        </div>
        
      </form>
    </main>
  );
}
