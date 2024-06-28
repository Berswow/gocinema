import User from "../../models/user.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const generateJwt = (email, id, password) => {
    return jwt.sign(
        {_id: id, email: email, password: password},
        process.env.JWT_SECRET,
        {expiresIn: '1h'})
}

class Auth {
    async register(req, res) {
        const {email, password} = req.body;
        try {
            const isUserExists = await User.findOne({email});
            if (isUserExists) {
                return res
                    .status(409)
                    .json({error: "User already exists"})
            }
            const user = new User({email, password})
            await user.save()
            const token = generateJwt(email, user._id, user.password)
            // res.status(201).json({message: "User has been registered!"})
            res.status(202).json({accessToken: token, user: {id: user._id, email: user.email}})
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    async login(req, res) {
        const {email, password} = req.body;
        try {
            const user = await User.findOne({email});

            if (!user) {
                return res
                    .status(404)
                    .json({error: "Username or password incorrect"})
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return res
                    .status(401)
                    .json({error: "Username or password incorrect"})
            }
            const token = generateJwt(email, user._id, user.password)
            res.status(202).json({accessToken: token, user: {id: user._id, email: user.email}})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Internal server Error", error: e.message})
        }
    }
    async check(req, res) {
        const token = generateJwt(req.user.email, req.user._id, req.user.password)
        return res.status(202).json({accessToken: token, user: {id: req.user._id, email: req.user.email}})
    }
}


export default new Auth()