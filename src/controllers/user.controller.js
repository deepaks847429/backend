import { asynchandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import{User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asynchandler(async(req, res)=>{
  //get user detail from frontend
  // validation - not empty
  // check if already exists: username, email
  // check for images, and avatatr
  //upload to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response
  const{fullNmae, emaul, username, password}=req.body
  // if(fullNmae===""){
  //   throw new ApiError(400, "full name is required");
  // }
  if(
  [fullNmae, email, username, password].some((field)=>
  field?. trim()==="")
){
  throw new ApiError(400, "ALL fields are required");
}
const existUser=User.findOne({
  $or:[{username},{email}]
})
if(existUser){
  throw new ApiError(409, "user with email and username already existed")
}
const avatarLOcalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;
if(!avatarLOcalPath){
   throw new ApiError(400, "avatar is required");
}
const avatar = await uploadOnCloudinary(avatarLOcalPath)
const coverImaage=await uploadOnCloudinary(coverImageLocalPath);
if(!avatar){
  throw new ApiError(400, "Avatar file is required");
}
const user= await User.create({
  fullname,
  avatar: avatar.url,
  coverImage: coverImaage?.url || "",
  email,
  password,
  username: username.toLowerCase()
  
})

const createdUser=user.findById(user._id).select(
" -password -refreshToken"
)
if(!createduser){
  throw new ApiError(500, "Something went wrong while registering a user")
}

return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"))

})

export{registerUser};