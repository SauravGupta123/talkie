import generateTokenandSetCookie from "../../utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup= async (req,res)=>
{
    try{
        
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if(password!==confirmPassword)
    {
        return res.status(400).json({error:"Passwords do not match"});

    }
    const user = await User.findOne({username});
    if(user)
    {
        return res.status(400).json({error : "Username already exists"});
    }
    //HASH PASSOWORD HERE
    const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
    //Profile Pic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
        fullName,
        username,
        password:hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    
    if(newUser)
    {
        //generated JWT token here.
        generateTokenandSetCookie(newUser._id,res)
        //if the new user is created successfully save it to DB
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    }
    else {
        res.status(400).json({ error: "Invalid user data" });
    }
}
    catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}



}

export const login= async (req,res)=>
{
    try {
        const {username,password} = req.body;
        //find the user
        const user = await User.findOne({username});
        //user?.password||" " means check if user exists , if it doesnt compare password with a null string.
        const isPasswdValid = await bcrypt.compare(password,user?.password||"")
        if(!user|| !isPasswdValid)
        {
            return res.status(400).json({error: "Invalid username or password"});

        }
        //generate jwt here.
        generateTokenandSetCookie(user._id,res);
        //return succesful login status.
        res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
        
    } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
        
    }

}
export const logout=async (req,res)=>
{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
        
    }
}
