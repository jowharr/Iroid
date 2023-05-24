const express = require('express')
const Router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const RegisterData = require('../models/RegisterData')
const checkAuth = require('../middleware/checkAuth')

Router.post('/sign-up', async (req, res) => {
    try {
        var hash = await bcrypt.hash(req.body.password, 12)
        const inputSignUp = {
            FullName: req.body.fullname,
            Email: req.body.email,
            Password: hash
        }
        RegisterData(inputSignUp).save().then((value) => {
            res.status(200).json({
                success: true,
                error: false,
                message: value
            })
        })
    } catch (err) {
        res.status(400).json({
            success: false, error: true, message: "somthing went wrong!"
        })
    }
})

Router.post('/log-in', async (req, res) => {
    try {
        const inputfields = {
            Email: req.body.email,
            Password: req.body.password
        }
        RegisterData.findOne({ Email: inputfields.Email }).then((value) => {
            if (!value) {
                return res.status(400).json({
                    success: false, error: true, message: "Incorrect Username"
                })
            }
            bcrypt.compare(inputfields.Password, value.Password, function (err, result) {
                const token = jwt.sign({ fullname: value.FullName }, "secret", { expiresIn: "1h" })
                if (result) {
                    res.status(200).json({
                        success: true,
                        error: false,
                        message: "Login success",
                        token: token,
                        data: value
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        error: true,
                        message: "Incorrect Password"
                    })
                }
            })
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: true,
            message: error
        })

    }
})

Router.get('/user-profile', checkAuth, (req, res) => {
    const name = req.userdata.fullname
    return res.status(200).json({
        success: true,
        data: name,
        message: 'User Active'
    })

})

Router.delete('/logout', checkAuth, (req, res) => {
    req.userdata.fullname;
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = Router