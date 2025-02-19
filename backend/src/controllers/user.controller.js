import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { where } from "sequelize";


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
    });
    // handling errors while creating user 
    if(!createdUser){
        throw new ApiError(500, "Somthing went wrong while creating user.");
    }
    // send response to frontend.
    return res.json(
        new ApiResponse(200, createdUser, "User created successfully.")
    )

});

const logIn = asyncHandler(async(req, res)=>{
    
    
    //data extraction from request
    const {email, password}= req.body



    //validation :  check that fiels is not empty
    if ((email || password) === "") {
        throw new ApiError(400, "Field should not be empty");
    }




    //check if the user exist or not
    console.log("Trying to get user !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    const user = await User.findOne({
        where: { email }
    });
    console.log(user);

    //if exist check weather the password is correct
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    console.log("4. Attempting password check");
    const passwordCheck = await user.isPasswordCorrect(password);
    console.log("5. Password check result:", passwordCheck);
    
    //refrest jwt
    
    
    if (!passwordCheck) {
        throw new ApiError(401, "password is incorrect");
    }


    const {refreshToken , accessToken} = await genRefreshAndAccessToken(user);
    console.log("tokens.....................", accessToken, "\n\n\n", refreshToken);

    
    
    const logInUser = await User.findByPk(user.id, 
        {
            attributes: {
                exclude: ["password","refreshToken"]
            }
        }
    );


    const option = {
        httpOnly: true,
        secure: true
    }



    // return res
    return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, {user: logInUser, accessToken, refreshToken}, "User logged in successfully"));
});

const genRefreshAndAccessToken = async(user)=>{
    try{
        
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();
        console.log("tokens", accessToken, "\n\n\n", refreshToken);
        
        user.refreshToken = refreshToken;
        await user.save({validate: false});
        console.log("executing save!!!! !!!! !!! !!!");
        return {refreshToken, accessToken};
    }catch{
        throw new ApiError(500, "Error while generating refresh or access token");
    }
};

const logOut = asyncHandler(async (req, res) => {
    
    await User.findByPk()
})

export {
    signUp, logIn
};