
const express=require("express");

const users=require('./MOCK_DATA.json')
const fs = require("fs");
const app=express();
const PORT=8000;
// middleware 
app.use(express.urlencoded({extended:false}))

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

app.route("/api/user/:id").get( (req, res) => {
    //get user by id
const id=Number(req.params.id);
const user=users.find((user)=>user.id===id);
 return res.json(user)
}).patch((req, res) => {
  //edit user by id
  return res.join({ status: "Pending" });
}).delete( (req, res) => {
  //delete user by id
  return res.join({ status: "Pending" });
});
;

// app.get("/api/users/:id", (req, res) => {
//     //get user by id
// const id=Number(req.params.id);
// const user=users.find((user)=>user.id===id);
//  return res.json(user)
// });

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