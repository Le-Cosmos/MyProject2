import Express from 'express';
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import Sneaker from "./models/sneaker.js";
import Player from "./models/user.js";
import UserSchema from "./models/userSchema.js";
import getProductsAndInfo from "./controller/getprod.js";
//import passport from "passport";
//import passportLocalMongoose from "passport-local-mongoose";
//import session from "express-session";
//learn typescript
const app = Express();
const URL = "mongodb://127.0.0.1:27017/Sneakdb";
const Millidays= 86400000;
var userid = 0;
dotenv.config()
app.use(Express.json());


//app.use(session({
//  secret: "c'est une phrase longue",
//  resave: false,
//  saveUninitialized: false
//}));
//app.use(passport.initialize());
//app.use(passport.session());

mongoose.connect(URL);

//UserSchema.plugin(passportLocalMongoose);

//passport.use((typeof User.createStrategy !== "undefined") && User.createStrategy());
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

const getDAll = () =>{
getProductsAndInfo ("", 1000, (err, prod) => {
  prod.forEach((s) => {
    const name =  s.styleID;
    Sneaker.countDocuments({styleID: name}, async (err, count) => {
      if (count === 0){
         s.save();
      } else {
       Sneaker.findOneAndRemove({styleID: name}, function(err){
         if (err){
           console.log(err);
         }
       });
       s.save();
      }
    });
  });
  console.log("Update");
});
}

setInterval(getDAll, 600000);

app.get("/api/alldata", (req, res) => {
  getProductsAndInfo ("", 1000, (err, prod) => {
    prod.forEach((shoe) => {
      Sneaker.countDocuments({shoeName: `${shoe.shoeName}`, releaseDate:`${shoe.releaseDate}`}, (err, count) => {
        if (count > 0){
          console.log("allready in db");
        } else {
          shoe.save();
        }
      });
    });
    console.log("allready in db ");
    console.log("ok");
    res.json(prod);
  });
});

app.get("/nextreleasedate", (req, res) => {
      var today = new Date();
      var dateArray = [];
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      Sneaker.find({releaseDate: { $gt: today.getTime(), $ne: 'NaN'}}).sort('releaseDate').exec((err, products) => {
        const data = products;
        data.forEach((shoe) => {
          if (!(dateArray.includes(shoe.date))){
            dateArray.push(shoe.date);
          }
        })
        res.json(dateArray)
      });
});

app.get("/home", (req, res) => {
  Sneaker.find({}, (err, products) => {
    res.json(products);
  });
});

app.get("/bestDeal", (req, res) => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  Sneaker.find({releaseDate: { $gt: today.getTime(), $ne: 'NaN'}}).sort('-diffPrice').exec((err, products) => {
    const data = products;
    res.json(products);
  });
});

app.get("/date/:date", (req, res) => {
  Sneaker.find({date: req.params.date}, (err, prod) =>{
    res.json(prod);
  });
});

app.get("/search/:search", (req, res) =>{
  const s = req.params.search;
  const regEx = new RegExp(`.*${s}.*`, "i");
  Sneaker.find({$or: [{shoeName: regEx}, {styleID: regEx}, {date: regEx}, {colorway : regEx}]}, async (err, products) => {
    const data = await products;
    res.json(data.slice(0, 10));
  })
});

app.get("/user/loggin", (req, res) => {
  Player.find({mail: req.body.mail, password: req.body.password},async (err, product) => {
      const data = await product;
      if(data){
        res.json(data);
      } else {
        res.json({});
      }
  })
});

app.post("/user/register", (req, res) => {
  const userInfo = req.body;
  let d = new Player({
    fName: userInfo.fName,
    lName: userInfo.lName,
    mail: userInfo.mail,
    password: userInfo.password,
  });
  d.save((err) => {
    if (err){
      console.log(err)
    }
  });
});


app.listen(5000, ()=> {
  console.log("connected my brother");
});
