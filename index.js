const express = require('express');
const bcrypt = require('bcryptjs')
const http = require('http');
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();
const router = express.Router();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require("mongoose");
const { ObjectId, Db } = require('mongodb');
const Data = require("./Model/model");
const req = require('express/lib/request');
const { resolve } = require('path');
const res = require('express/lib/response');

const jwt = require("jsonwebtoken");
require('./database/con');

const auth = require('./middleware/auth')

const data = require('./Model/model')

const { route } = require('express/lib/application');

const { createUsers, updateData, deleteData, findData, loginDetails } = require('./controllers/userdata');






//route.get(userdata.createUsers)

/**************server Started*******************/
app.listen(process.env.PORT, () => {
    console.log("Server started")

})