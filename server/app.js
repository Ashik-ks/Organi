const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

app.use(express.static('../client'));
app.use(express.json());//middlewear to parse JSON datas
app.use(express.urlencoded({extended : true}));

async function mongoConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connection established");
    } catch (error) {
        console.log("Database Connection error : ",error);
    }

    
}
   mongoConnect() ;

   let usersSchema = new mongoose.Schema({
    name : String,
    image : String,
    price : Number,
    category : String,
    use : String,
    description : String,
});

let users = mongoose.model("users",usersSchema);

app.post('/submit',
    async (req, res) => {

        let body = req.body;
        console.log("body : ", body);

        let name = body.name;
        console.log("name : ", name)

        let new_user = await users.create(body);

        if (new_user) {
            res.status(200).send("User created successfully");
            return;
        }
        else {
            res.status(400).send("User creation failed");
            return;
        }
    }
)

app.get('/submit', async (req,res) => {
    let userData = await users.find();
    console.log("userData : ",userData);

    res.status(200).send(userData);
    return;
    });


   app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})


















// app.get('/test',
//     (req, res, next) => {
//         console.log("first Middlewear")
//         next()
//     },
//     (req,res,next) => {
//         console.log("second Middlewear")
//         next()
//     },
//     (req,res) => {
//         console.log("third Middlewear")
//     }

// )