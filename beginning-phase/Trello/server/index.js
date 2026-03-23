const data = require("./data");
const express = require("express");
const { users, organizations, issues, boards } = data;
const { authMiddleware } = require("./authMiddleware");
const jwt = require("jsonwebtoken");
require("dotenv").config();




let ORGANIZATION_ID = 1;
let USER_ID = 1;
let BOARD_ID = 1;
let ISSUE_ID = 1;
const app = express();

app.use(express.json());

// Post endpoints 

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const UserExists = users.find(user => user.username == username);
    if (UserExists) {
        res.status(411).json({
            message: "user already exists"
        })
        return;
    }

    users.push({
        username,
        password,
        id: USER_ID++
    })

    res.status(200).json({ username, password });
    return;
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const UserExists = users.find(user => user.username == username && user.password == password);
    if (!UserExists) {
        res.status(403).json({
            message: "invalid credentials"
        })
        return;
    }

    const token = jwt.sign({ UserId: UserExists.id, username: UserExists.username }, process.env.JWT_SECRET);
    UserExists.token = token;
    res.json({ token, UserExists });
})


app.post("/organization", authMiddleware, (req, res) => {
    const UserId = req.USER_ID;

    organizations.push({
        id: ORGANIZATION_ID++,
        title: req.body.title,
        description: req.body.description,
        admin: UserId,
        members: []
    })
    req.status(200).json({
        message: "organization created successfully",
        id: ORGANIZATION_ID - 1,
    })
});

app.post("/add-member-to-organization", authMiddleware, (req, res) => {
    const UserId = req.UserId;
    const organizationId = req.body.organizationId;
    const memberUsername = req.body.email;

    const organization = organizations.find(org => org.id == organizationId)

    if (!organization || organization.admin != UserId) {
        res.status(411).json({
            message: "either this org doesnt exist or you are not admin"
        })

        return;
    }

    const MemberUsername = users.find(user => user.username == memberUsername);

    if (!MemberUsername) {
        res.status(411).json({
            message: "something went wrong"
        })
    }
    organization.members.push(MemberUsername.id);

    res.json({
        message: "new member added !!"
    })

})


app.post("/board", authMiddleware, (req, res) => {
    const UserId = req.USER_ID;

    const UserExists = organizations.map(org => org.admin == UserId)
});

app.post("/issue", (req, res) => {

});

// get endpoints 

app.get("/organization/:organizationId", (req , res) => {
    
} )


// delete endpoints

app.delete("/members", (req, res) => {
    const UserId = req.UserId;
    const organizationId = req.body.organizationId;
    const memberUsername = req.body.email;

    const organization = organizations.find(org => org.id == organizationId)

    if (!organization || organization.admin != UserId) {
        res.status(411).json({
            message: "either this org doesnt exist or you are not admin"
        })

        return;
    }

    const MemberUsername = users.find(user => user.username == memberUsername);

    if (!MemberUsername) {
        res.status(411).json({
            message: "something went wrong"
        })
    }
    organization.members = organization.members.filter(user => user.id != memberUsername.id);

    res.json({
        message: "deleted member !!"
    })

})








app.listen(3000);

