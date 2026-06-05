const express = require("express");

const USERS = [{
    id: 1,
    username: "Krutant",
    password: "123456", 
},{
    id:2,
    username: "Tvesa",
    password: "1234"
}];
const ORGANIZATIONS = [{
    id: 1,
    name: "Sprinklr",
    description: "A SaaS platform",
    admin: [1,2],
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

});

app.post("/signin", (req,res) => {

});

app.post("/create-organisation", (req,res) => {

});

app.post("/add-member", (req,res) =>{

});


app.post("/create-board", (req,res) => {

});

app.post("/create-issue", (req,res) => {

});

// GET ENDPONTS

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

app.delete("/members", (req,res) => {

});





app.listen(3000, () => {
    console.log("Server running on port 3000");
});

