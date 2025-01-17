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


export const saved_article= async(user_id:any,org_author_id:any,article_id:any)=>{

    try{

        let userid = await prisma.user.findUnique({
            where:
            { 
                email:user_id

            }
        })

        if(!userid){
            console.log("USER NOT FOUND");
            return;
        }

        const authorid = userid.id;

    await prisma.savedArticle.create({
        data:{

            author_id:authorid,
            original_author_id:org_author_id,
            article_id:article_id
        }

        
    })
    console.log("ARTICLE SAVED SUCCESSFULY")
   }
   catch(e)
   {
    console.error('Error saving article:', e);
    throw e;
   }finally {
    await prisma.$disconnect();
  }



}

export const get_saved =async(user_id:any)=>{
    try
    {
        const user =await prisma.user.findUnique({
            where:
            {
                email:user_id
            }
        })

        if(!user)
        {   console.log("No user")
            return
        }

       

        user_id= user.id;
      const saved_article=  await prisma.savedArticle.findMany({
            where:{
            
                author_id:user_id,
                
            },
           
            include:{
            
                article:true,
                originalAuthor:true

            }

        })
        console.log(saved_article);
        return saved_article;
    }

    catch(e)
    {
     console.error('Error fetching saved-article:', e);
     throw e;
    }finally {
     await prisma.$disconnect();
   }
}


export const delete_article = async(userid:any, article_id:any)=>{

    try{

    const user_data=  await prisma.user.findUnique({
        where:{
            email:userid
        }
    })

    if(!user_data)
    {
        console.log("USER NOT FOUND")
        return;
    }

    const user_id = user_data.id

    await prisma.savedArticle.delete({

        where:{

            author_id_article_id:{
             author_id:user_data.id,
             article_id:article_id,
         }
        }
    })

}

catch(e)
    {
     console.error('Error fetching saved-article:', e);
     throw e;
    }finally {
     await prisma.$disconnect();
   }

}


export const getInfo = async (user: any, article_id: any) => {

    try{const userData = await prisma.user.findUnique({
        where: {
          email: user,
        },
      });
    
     
      if (!userData) {
        return { error: 'User not found' };
      }
    
     
      const likeCheck = await prisma.likes.findUnique({
        where: {
          author_id_article_id: {
            author_id: userData.id,  
            article_id: article_id,
          },
        },
      });
    
      
      if (!likeCheck) {
        return false ;  
      }

      else
      {
        return true;
      }
    
      
      
    
    }
      
      catch(e)
      {
       console.error('Error fetching saved-article:', e);
       throw e;
      }finally {
       await prisma.$disconnect();
     }
  
      
  };

  export const likes= async(user:any,article_id:any,like:any)=>{
    try
    {
        const user_data =await prisma.user.findUnique({
            where:{
                email:user
            }
        })

        if(!user_data) return


        if(!like)
        {
            await prisma.article.update({
                where:{
                    id: article_id,
                },

                data:{
                    count:{
                        increment:1
                    }
                }
            })


            await prisma.likes.create({
                data:{
                    author_id:user_data.id,
                    article_id:article_id
                }
                   
            })


        }


        else 
        {
            await prisma.article.update({
                where:{
                    id: article_id,
                },

                data:{
                    count:{
                        decrement:1
                    }
                }
            })

            await prisma.likes.delete({
                where:{
                    author_id_article_id:{
                        author_id:user_data.id,
                        article_id:article_id,
                    }
                }
            })
        }
    }
    catch(e)
    {
     console.error('Error fetching saved-article:', e);
     throw e;
    }finally {
     await prisma.$disconnect();
   }

  }