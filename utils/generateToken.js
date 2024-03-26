import jwt from "jsonwebtoken";

const generateTokenandSetCookie=(userId,res)=>
{
    //deconstruct the userId
    const token= jwt.sign({userId},process.env.JWT_SECRET_KEY,
        {
            expiresIn:"15d"
        });
    res.cookie("jwt",token,
    {
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		//checks the security of cookie.

    }
    );

        

}
export default generateTokenandSetCookie

