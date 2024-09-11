const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()
const {MongoClient, ObjectId} = require('mongodb');
const querystring = require('querystring')

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

    app.get('/user',
        async(req,res) => {
            try {

            let id = req.query.id;
            console.log("id : ",id);



            // let _id = new ObjectId(id);

    
            let user_data = await users.findOne({ _id : id});
            console.log("user_data7 : ",user_data);

            let str_user_data = JSON.stringify(user_data);
            console.log("str_user_data : ",str_user_data);
    
            res.status(200).send(str_user_data);
            return;
            } catch (error) {
                console.log("error : ",error)
            }
        });

        app.put('/user',
            async(req,res) =>{
             
                   let body = req.body;
                   console.log("body : ",body);
                    
                   let updated_datas = {
                    name : body.name,
                    image : body.image,
                    price : body.price,
                    category : body.category,
                    use : body.use,
                    description : body.description,
                }

                    let id =req.query.id;
                    console.log("id : ",id,typeof(id));

                    let _id = new ObjectId(id);
                    console.log("_id" ,_id,typeof(_id))
                    
                    let editdata = await users.updateOne({_id},{$set : updated_datas});
                    console.log("editdata",editdata);

                    res.status(200).send(editdata);

                    // res.writeHead(200,{"Content-Type" : "text/plain"});
                    // res.end("User Updated Successfully")


                    // let struserdataa = JSON.stringify(editdata);
                    //  console.log("struserdataa : ", struserdataa);
                    

                } 
        )

        app.delete('/user',
            async(req,res) =>{
                let id =req.query.id;
                    console.log("id : ",id,typeof(id));

                    let _id = new ObjectId(id);
                    console.log("_id" ,_id,typeof(_id))
                    
                    let editdata = await users.deleteOne({_id});
                    console.log("editdata",editdata);

                    res.status(200).send(editdata);
            }
        )


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