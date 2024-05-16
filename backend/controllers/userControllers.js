import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utills/generateToken.js";

// @desc      Auth User and get token
// @route     POSR api/users/login
// @access    Public
const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error("invalid email or password")
    }
})

// @desc      Register a new user
// @route     POSR api/users
// @access    Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User Already Exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc      Get user profile
// @route     GET api/users/profile
// @access    Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }
})

// @desc      Update user profile
// @route     PUT api/users/profile
// @access    Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }
})

const getUsers = expressAsyncHandler(async (req, res) => {
    const user = await User.find({})
    res.json(user)
})

// @desc      Delete user profile
// @route     delete /api/users/:id
// @access    Private/ admin
const deleteUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);
            throw new Error("User does not exist");
        }

        await user.deleteOne();
        res.json({ message: "User removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc      Get user by ID
// @route     GET api/users/:id
// @access    Private/ admin
const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error(" User not found")
    }
})

const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}