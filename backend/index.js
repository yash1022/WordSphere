const express = require('express');
const app= express();
const cors= require('cors');
const bodyParser = require('body-parser');

const { insert_user, get_user, create_article, find_article,saved_article,get_saved,delete_article} = require('./script');
const {validatetoken}= require('./MIDDLEWARES/Auth');
const { constrainedMemory } = require('process');
const { console } = require('inspector');




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
   
    res.json(articles);
    }

   
    }
    catch(e)
    {
        console.log(e);
    }
})

app.post('/api/save',(req,res)=>{

    const{user_id,org_author_id,article_id}= req.body;

    saved_article(user_id,org_author_id,article_id);


})

app.post('/api/getsaved',async (req,res)=>{
    const {user}= req.body;
    

    const saved_articles= await get_saved(user);

    if(!saved_articles)
    {
        console.log("No saved articles");
    }

    console.log(saved_articles);

    res.json(saved_articles);

    
})

app.post('/api/delete',async(req,res)=>{

    const {user,article_id}= req.body;
    delete_article(user,article_id);
   

})

const PORT=process.env.PORT||5000;


app.listen(PORT,()=>{console.log("SUCCESSFULLY CONNECETD TO PORT 5000")});