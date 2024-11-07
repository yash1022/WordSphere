import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const insert_user= async(data:any)=>{

    if(!data)
    {
        console.log("DATA IS NOT PROVIDED");
        return;  // return if data is not provided. This helps in preventing unnecessary database operations.
 
    }


    try{
             const existinguser = await prisma.user.findUnique({
                where:{
                    email: String(data.email)
                },
             });


             if(existinguser)
             {  console.log("USER ALREADY EXITS");
                return;
             }

             


             await prisma.user.create({
                data:{

                    name:data.displayName,
                    email:data.email,
                    profile_pic:data.photoURL

                
                }
             })
                
 }catch (error) {
    console.error('Error inserting user:', error);
    throw error;
} finally {
    await prisma.$disconnect();
}



}


export const get_user= async(Email:String)=>{

    try{
    const user = await prisma.user.findUnique({
        where:{
            email: String(Email),
        },

        include:{
            articles:true,
            
        },
    });
    return user;
  }catch(e)
  {
    console.error('Error finding user:', e);
    throw e;
  }finally {
    await prisma.$disconnect();
}
}

export const create_article = async(Email:String, Title:String,Content:String,Category:any,Picture_url:String)=>{

    try{

        

    let categoryRecord= await prisma.category.findUnique({
        where:{
            name:Category,
        }

         
    })

    if (!categoryRecord) {
        
       console.log('No category record');
       return;  
    }

    let author = await prisma.user.findUnique({
        where:{
            email:String(Email),
        }
    })


    if (!author) {
        console.log("USER NOT FOUND");
        return;
    }


    const createArticle= await prisma.article.create({
        data:{
            title:String(Title),
            content:String(Content),
            // picture: String(Picture_url),
            author_id:author.id,
            category_id:categoryRecord.id,

        }

    })

    return createArticle;

}catch(e)
{
  console.error('Error finding user:', e);
  throw e;
}finally {
  await prisma.$disconnect();
}

}


export const find_article=async(Email:String,Category:String)=>{

    try {

        if(Category===' '){
            const articleRecord = await prisma.article.findMany({
                include:{
    
                    author:true,
    
                }
               })
    
               return articleRecord;
        }
        else{

        let categoryRecord = await prisma.category.findUnique({

            where:{
                name:String(Category),
            }
    
            
              
    
    
            
        })
    
        if(!categoryRecord){
    
            return;
                
        }
        
        let articleRecord = await prisma.article.findMany({
            where:{
    
                category_id:categoryRecord.id,
    
            },

            include:{
                author:true,
                
            }
        }) 
    
        return articleRecord;
        }
        
    



}
    catch(e)
{
  console.error('Error finding user:', e);
  throw e;
}finally {
  await prisma.$disconnect();
}

    

}