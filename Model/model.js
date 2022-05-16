require('dotenv').config();
var mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const res = require("express/lib/response");
var Schema = mongoose.Schema;

var data = new Schema({
    _Id: mongoose.Schema.ObjectId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    Tokens: [{
        Token: {
            type: String,
            required: true
        }
    }]
});

//generating token
//instance.methods.generateAuthToken() function


data.methods.generateAuthToken = async function() {
    try {
        console.log("The id is:" + this._id)
        const Token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.Tokens = this.Tokens.concat({ Token: Token })
        await this.save();
        return Token;
    } catch (error) {

        console.log(error)
    }

}


//converting passswords into hash
data.pre("save", async function(next) {
    if (this.isModified("password")) {
        console.log(`The current password is ${this.password}`);
        // this.password = await bcrypt.hash("this.password", 10);
        // console.log(`The current password is ${this.password}`);
        this.confirmPassword = await bcrypt.hash(this.password, 10);
        console.log(`The confirmed password is ${this.confirmPassword}`);
        //this.confirmPassword = undefined;
    }
    next();
})
module.exports = mongoose.model("Data", data);