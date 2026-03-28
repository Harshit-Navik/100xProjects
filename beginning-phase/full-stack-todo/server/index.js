const express = require("express");
const { userModel , todoModel } = require("./models/todo.models");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "nachhhoooo";
const app = express();


app.post("/signup" , (req, res) => {

})