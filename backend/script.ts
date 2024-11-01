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