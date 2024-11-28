import { Request, Response } from "express";
// import { LoginReqBody } from "../../models/authentication/Auth";
import { generateAccessToken, generateRefreshToken } from "../../services/TokenGeneration";
import asyncHandler from "express-async-handler";  // Import asyncHandler
import supabase from "../../database/SupabaseClient";
import bcrypt from "bcrypt";
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user and returns an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sign-in successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI...
 *       400:
 *         description: Missing required inputs
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
export const Login = asyncHandler(async (req:Request, res:Response) :Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please fill up all the required inputs" });
        return;
    }

    try{

        const { data:userData, error:fetchCredential } = await supabase
        .from('users')
        .select('id, password')
        .eq('email', email)
        .single()

        if (fetchCredential || !userData) {
            res.status(500).json({ message: fetchCredential?.message || "Error fetching user data" });
            return;
        }
        
        const hashPassword = bcrypt.compareSync(password, userData.password);


        if (!hashPassword) {
            res.status(401).json({ message: "Invalid password, please try again." });
            return;
        }

        const accessToken = generateAccessToken(userData.id);
        const refreshToken = generateRefreshToken(userData.id);
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })


        res.status(200).json({
            message: "Sign-in successful",
            token: accessToken
        });

    }catch(error){
        if(error instanceof Error){
            res.status(403).json({ message: error.message })
            return;
        }else{
            res.status(500).json({message: "Invalid Request Please try again later."})
            return;
        }
    }

});


export const Register =  asyncHandler(async (req:Request, res:Response) : Promise<void> => {
    const { email, first_name, last_name, middle_name, password } = req.body;


    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hashSync(password, salt);


    const { data, error:insertError } = await supabase
    .from('users')
    .insert({email: email, password: passwordHash })
    .select()
    .single()
    
    if(insertError){
        res.status(400).json({ message: insertError.message || "Invalid Email" });
        return;
    }

    const { error:insertInfo } = await supabase
    .from('users_information')
    .insert({ user_id: data?.id,  first_name: first_name, middle_name: middle_name, last_name: last_name })


    if(insertInfo){
        res.status(400).json({ message: insertInfo.message || "Error on inserting record." })
        return;
    }

    res.status(200).json({ message: "User successfully registered." })

});





// res.status(200).send({message: "Login Successfull", token: accessToken});