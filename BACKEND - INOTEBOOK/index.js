const express = require("express");
const connectToDB = require("./db");
var cors = require('cors')
connectToDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Admin page to fetch all the list of users present without their password and notes, only details
// app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/notes",require("./routes/notes"));

app.get("/",(req,res)=>{
    res.send("/get");
})

app.listen(port, () => {
    console.log(`server is running on port no. ${port}`);
});
// var fs = require("fs");



