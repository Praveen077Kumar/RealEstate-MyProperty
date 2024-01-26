import Mongoose from "mongoose";

const listingSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  bathRooms: {
    type: Number,
    required: true,
  },
  bedRooms: {
    type: Number,
    required: true,
  },
  furniture: {
    type: Boolean,
    required: true,
  },
  parking:{
    type: Boolean,
    required: true,
  },
  petsAllow:{
    type: Boolean,
    required: true,
  },
  propertyType:{
    type:String,
    required: true,
  },
  offer:{
    type:Boolean,
    required: true,
  },
  imageUrls:{
    type:Array,
    required: true,
  },
  userRef:{
        type:String,
        required: true,
  }
},{timestamps:true});


const Listing = Mongoose.model('Listing', listingSchema);
export default Listing;