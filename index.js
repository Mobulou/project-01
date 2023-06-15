
const express=require("express");
const mongoose=require("mongoose")
const users=require('./MOCK_DATA.json')
const fs = require("fs");
const app=express();
const PORT=8000;

//Schema
const userSchema=new mongoose.Schema({
  first_name:{
    type:String,
    required:true,
  },
  last_name:{
    type:String,
  },
  email:{
   type:String,
   required:true,
   unique:true
  },
  jobTitle:{
    type:String,
    required:true,
  },
  gender:{
    type:String
  }
})

const User=mongoose.model

// middleware 
app.use(express.urlencoded({extended:false}))


app.use((req,res,next)=>{
  console.log("MiddleWare 1")
  fs.appendFile("log.txt",`\n${Date.now()}:${req.method}:${req.path}\n`,(err,data)=>{
    next()
  })
  // return res.json({message:"Its me from middleware 1"})
  next()
})
//Routes
app.get("/users", (req, res) => {
  const html = `
<ul>
${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;
  res.send(html);
});
// Rest Api
app.get("/api/users",(req,res)=>{
    //get list
  return res.json(users)
})

// app.route("/api/user/:id").get( (req, res) => {
//     //get user by id
//     console.log("harish")
// const id=Number(req.params.id);
// const user=users.find((user)=>user.id===id);
//  return res.json(user)
// }).patch((req, res) => {
//   //edit user by id
//   return res.join({ status: "Pending" });
// }).delete( (req, res) => {
//   //delete user by id
//   return res.join({ status: "Pending" });
// });


app.get("/api/users/:id", (req, res) => {
    //get user by id
const id=Number(req.params.id);
const user=users.find((user)=>user.id===id);
   if(!user){
    return res.json({message:"user not found"})
   }
 return res.json(user)
});

app.post("/api/users", (req, res) => {
  //create user
  const body=req.body;
  users.push({...body,id:users.length+1})
  fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
     return res.json({ status: "Success",id:users.length });
  })

  console.log("Body",body)

});

// app.patch("/api/users/:id", (req, res) => {
//   //edit user by id
//   return res.join({ status: "Pending" });
// });

// app.delete("/api/users/:id", (req, res) => {
//   //delete user by id
//   return res.join({ status: "Pending" });
// });

app.listen(PORT,(req,res)=>{
    console.log("just Chill")
})



































//show dbs
//use <db_name>
//show collections
//db.coll.find()
//db.coll.insert()




















//Currently, I am working as a React developer. Experience in integrating REST API using the Knowledge of front-end development using React js Redux, Bootstrap, and JavaScript. I have also worked on bug fixes and Converting UI HTML to React js. I have also basic knowledge of Node js Express Mongo DB, Now I am looking for Job Change.