import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.port || 3000;


//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");

//Routes
app.get("/", (req,res) =>{
    res.render("index.ejs", {weather:null, error:null});
});

app.post("/", async(req, res) =>{
    const city = req.body.city;
    const apiKey =process.env.API_kEY;
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      try{
        const response = await axios.get(url);
        const data = response.data;
        const weather ={
            city : data.name,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: "/images/weather.png"
        };
        res.render("index.ejs", {weather, error:null});
      }catch(error){
        console.error("API error:", error.response?.data || error.message);
        res.render("index.ejs", {weather:null, error:"City not found or API error"});
      }
});

//start server
 app.listen(port, () =>{
    console.log(`Server started on port ${port} `);
 });