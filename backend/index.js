const express = require('express');
const app= express();
const cors= require('cors');
const bodyParser = require('body-parser');

const { insert_user, get_user} = require('./script');
const {validatetoken}= require('./MIDDLEWARES/Auth')




app.use(bodyParser.json());
app.use(cors());







app.post('/api/auth',async (req, res) => {
    userdata=req.body;


    console.log(userdata);

    try
    {
        await insert_user(userdata);
        console.log("DATABSE UPDATED");
       
    }catch(e)
    {
        console.log(e);
       
    }

})

app.post('/api/profile',validatetoken,async(req,res)=>{


   const email= req.headers.user;
   

   const user_info= await get_user(email);
   console.log(user_info);

   res.json(user_info);
})





const PORT=process.env.PORT||5000;


app.listen(PORT,()=>{console.log("SUCCESSFULLY CONNECETD TO PORT 5000")});