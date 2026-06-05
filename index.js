const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");

const JWT_SECRET = "flowBoard";

let USERS_ID = 1;
let ORGANISATION_ID = 1;
let BOARD_ID = 1;
let ISSUE_ID = 1;

const USERS = [];
const ORGANIZATIONS = [{
    id: 1,
    name: "Sprinklr",
    description: "A SaaS platform",
    admin: [1,2],
    members: []
}];
const BOARDS = [{
    id: 1,
    title: "Sprinklr Board",
    orgId: 1,
}];
const ISSUES = [{
    id: 1,
    title: "Issue 1",
    description: "Description 1",
    boardId: 1,
    state: "DONE"
}];

const app = express();

app.use(express.json());

// CREATE ENDPOINTS

app.post("/signup", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const userExists = USERS.find(user => user.username === username)

    if(userExists){
        res.status(400).json({
            message: "User already exists"
        })
        return
    }

    USERS.push({
        id: USERS_ID++,
        username,
        password
    })

    res.status(201).json({
        message: "Signed Up Successfully!!"
    })
});

app.post("/signin", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = USERS.find(user => user.username === username && user.password === password)

    if(!userExists){
        res.status(403).json({
            message: "Invalid credentials"
        })
        return
    }

    // create a jwt for the user
    const token = jwt.sign({
        userId: userExists.id
    }, JWT_SECRET);

    res.json({
        token
    })
});

// AUTHENTICATED ROUTE
app.post("/create-organisation",authMiddleware, (req,res) => {
    const userId = req.userId;
    ORGANIZATIONS.push({
        id: ORGANISATION_ID++,
        name: req.body.name,
        description: req.body.description,
        admin: [userId],
        members:[]
    })
    res.json({
        message: "org created",
        id: ORGANISATION_ID - 1
    })
});

app.post("/add-member",authMiddleware, (req,res) =>{
    const userId = req.userId;
    const orgId = req.body.orgId;
    const userEmail = req.body.userEmail;

    const orgExists = ORGANIZATIONS.find(organisation => organisation.id === orgId);

    // check if the org exists
    if(!orgExists){
        res.status(404).json({
            message: "Organisation not found"
        })
        return
    }

    // check if the user is admin
    if(!orgExists.admin.includes(userId)){
        res.status(403).json({
            message: "You are not admin"
        })
        return
    }

    // check if the user we want to add to org exists in the database
    const userExists = USERS.find(user => user.email === userEmail);
    if(!userExists){
        res.status(404).json({
            message: "User not found"
        })
        return
    }

    // check if the member already exists in the org
    if(orgExists.members.includes(userExists.id)){
        res.status(400).json({
            message: "Member already exists"
        })
        return
    }

    // add member to org
    orgExists.members.push(userExists.id);
    res.json({
        message: "Member added successfully"
    })
});


app.post("/create-board", (req,res) => {

});

app.post("/create-issue", (req,res) => {

});

// GET ENDPONTS

app.get("/organisations",authMiddleware,(req,res) => {
    
});

app.get("/boards", (req,res) => {
    
});

app.get("/issues", (req,res) => {
    
});

app.get("/members", (req,res) => {
    
});

// PUT ENDPOINTS

app.put("/update-issue", (req,res) => {

});

// DELETE ENDPOINTS

app.delete("/members", authMiddleware, (req,res) => {
    const userId = req.userId;
    const orgId = req.body.orgId;
    const userEmail = req.body.userEmail;

    const orgExists = ORGANIZATIONS.find(organisation => organisation.id === orgId);

    // check if the org exists
    if(!orgExists){
        res.status(404).json({
            message: "Organisation not found"
        })
        return
    }

    // check if the user is admin
    if(!orgExists.admin.includes(userId)){
        res.status(403).json({
            message: "You are not admin"
        })
        return
    }

    // check if the user we want to add to org exists in the database
    const userExists = USERS.find(user => user.email === userEmail);
    if(!userExists){
        res.status(404).json({
            message: "User not found"
        })
        return
    }

    // delete member from the org
    orgExists.members = orgExists.members.filter(id => id !== userExists.id);

    
    res.json({
        message: "Member deleted successfully"
    })
});





app.listen(3000, () => {
    console.log("Server running on port 3000");
});

