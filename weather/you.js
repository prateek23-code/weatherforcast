const express= require("express");
const bodyParser= require("body-parser");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',function (req,res){
    res.sendFile(__dirname +"/index.html");



});
app.post("/",function(req,res){
    const city = req.body.cityname ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d92004e993ae6104346af72aa9aab779&units=metric";
    https.get(url,function(response){
        
        console.log(response.status);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            res.send("the temprature of" +city+" is : "+temp+"celcius");

        });


    });


});
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`);
  }); 
  
