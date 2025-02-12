import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const signUp = asyncHandler(async (req, res) => {

    // get user data from frontend
    const {
        name, email, password, role
    } = req.body;

    // validate- check if any field of the data is not empty
    if ((name || email || password || role) === "") {
        throw new ApiError(400, "Field should not be empty!");
    }

    // check if the user exists
    const userExists = await User.findOne({
        where: {
            email: email
        }
    })
    if (userExists) {
        throw new ApiError(409, "User already exists.");
    }

    // create user -  update to database
    const user = await User.create(
        {
            email, 
            name, 
            password, 
            role
        }
    );

    // remove password and refresh token from response and
    const createdUser = await User.findByPk(user.id, {
        attributes: {
            exclude: ['password', 'refreshToken']
        }
    }
);
    // handling errors while creating user 
    if(!createdUser){
        throw new ApiError(500, "Somthing went wrong while creating user.");
    }
    // send response to frontend.
    return res.json(
        new ApiResponse(200, createdUser, "User created successfully.")
    )

});

export {
    signUp
};