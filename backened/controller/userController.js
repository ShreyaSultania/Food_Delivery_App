import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// bcrypt is a library used to securely store passwords.
import validator from 'validator'
// validator is a library used to check (validate) user input.


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        console.log(user)
        if (!user) {
            return res.json({
                success: false,
                message: "user doesn't exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = createToken(user._id);
        res.json({
            success: true,
            token
        })

    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "error",
        })
    }
}
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //check user is already exist or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            res.json({
                success: false,
                message: "user Already exist"
            })
        }
        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "please enter valid email",
            })
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "password should be atleast 8 digits"
            })
        }
        // hashing userpassword
        const salt = await bcrypt.genSalt(10)
        const HashPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: HashPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({
            success: true, token
        })

    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "error"
        })
    }
}

// get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId; // This comes from auth middleware (req.userId, not req.body.userId)
        const user = await userModel.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error fetching user profile"
        });
    }
}

export { loginUser, registerUser, getUserProfile }


