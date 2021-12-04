const express = require("express");
var fs = require('fs').promises;
const PORT = process.env.PORT || 8007;
const app = express();
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));


// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");
  
});

app.get("/homepage", function(req, res)  {
  res.render("homepage");
  
});

app.post("/create", (req, res) => {

    //console.log(req.body);
    return new Promise((resolve, reject) => {
    const user = req.body;
    //const userString = JSON.stringify(user);

    user.id = Math.floor(Math.random() * 600) + 1; //generate random user ID
    const id = user.id;

    fs.readFile("database1.json", "utf-8")  //read database
    .then((content) => JSON.parse(content)) //then, turn the string into an object
    .then((jsonObj) => {
      jsonObj.users.push(user)
      fs.writeFile("database1.json", JSON.stringify(jsonObj, null, 2))
      .then(() => {
      console.log("resolve")
      res.redirect("/people/" + id);  
      resolve();
      })
      .catch((err) => reject(err));
    })
    
    .catch((err) => reject(err));
  });
 
  
});

// ...




app.get("/people/:id", (req, res) => {

  const id = req.params.id;
 

  
  
  
  fs.readFile("database1.json", "utf-8")
  .then((content) => JSON.parse(content).users)
  .then(listOfusers => listOfusers.find((user) => user.id == id))
  .then(user =>  {res.render("people", { user })
  
  
})
 
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
