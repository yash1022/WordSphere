const express = require('express');
const app= express();
const cors= require('cors');
const bodyParser = require('body-parser');

const { insert_user, get_user, create_article, find_article} = require('./script');
const {validatetoken}= require('./MIDDLEWARES/Auth');
const { constrainedMemory } = require('process');




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

   
   

   res.json(user_info);
})


app.post('/api/create', validatetoken, async(req,res)=>{

   

    const {user,title,category,thumbnail,content}= req.body;

    

   



    try{
        await create_article(user,title,content,category,thumbnail)
        {
            console.log("ARTICLE CREATED SUCCESSFULLY");
            res.json({message:"Article created successfully"})
        }
       
    }
    catch(e)
    {
        console.log(e);
    }


    




      


})


app.post('/api/feed',validatetoken,async(req,res)=>{
    const {user,category}= req.body;
    
    

    try{

    const articles= await find_article(user,category);
    if(articles)
    {
    console.log(articles)
    res.json(articles);
    }

   
    }
    catch(e)
    {
        console.log(e);
    }
})

const PORT=process.env.PORT||5000;


app.listen(PORT,()=>{console.log("SUCCESSFULLY CONNECETD TO PORT 5000")});