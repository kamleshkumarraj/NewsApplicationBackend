
export const generateJWTAndLogin = async (res , user) => {
    const token = await user.generateJWTTocken();

    const option = {
        expires : new Date(
            Date.now() + process.env.TOCKEN_EXPIRY*60*60*1000
        ),
        httpOnly: true, 
        path : '/'
    }

    res.status(200).cookie('token',token,option).json({
        success : true,
        message : "User Logged in successfully",
        user,
        token
    })
}
