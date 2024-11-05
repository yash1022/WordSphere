
import React, { useContext } from 'react'
import  { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { authContext } from '../App';

import { useNavigate,Link } from 'react-router-dom';

export default function Createpost() {
    const[Value,setValue]=useState('');
    const[Title,SetTitle]=useState('');
    const[Thumbnail,SetThumbnail]=useState('');
    const[Category,SetCategory]=useState('');
    const Auth= useContext(authContext);
    const navigate = useNavigate();

    function handlechange(event)
    {
        if(event.target.name==='title')
        {
          SetTitle(event.target.value)
        }

        else if(event.target.name==='category')
        {
          SetCategory(event.target.value)
        }

        else
        {
          setValue(event.target.value)
        }
    }


    function handleimage(event)
    {
      SetThumbnail(event.target.files[0])

    }


   async function handlepost()
    {

     
      if(Category==='')
        {
          alert('Please select a category')
          return
        }


        const response= await fetch('http://localhost:5000/api/create',{
          method:'POST',
          headers: {
            'Content-Type':'application/json',
            authorization:'Bearer '+ Auth.token,
            user:Auth.User
          },

          body:JSON.stringify({

            user:Auth.User,
            title:Title,
            category:Category,
            thumbnail:Thumbnail,
            content:Value


          }),

        })

        const data= await response.json();
        
        if(data)
        {
          alert('Form created successfully')
          navigate('/home')
        }
       
    }

  return (

    


    

     Auth.token?(<div className='container'>

<h2>Create new Post</h2>
  <div className='mb-4'>

    <form action="" className='form title-form'>
      <input type='text' placeholder='Title' value={Title} name='title' onChange={handlechange}/>
    </form>

  </div>

  <div className='mb-3'>
    
    <input
      type="file"
      accept='image/*'
      onChange={handleimage}>

    </input>



  </div>


  <div className="mb-5">
            <select
                name="category"
                value={Category}
                onChange={handlechange}
                className="form-select"
            >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Self Improvement">Self Improvement</option>
                <option value="Health">Health</option>
                <option value="Psychology">Psychology</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Software Development">Software Development</option>
                <option value="Relationships">Relationships</option>
                <option value="AWS">AWS</option>
                <option value="UX Design">UX Design</option>
            </select>
        </div>

  <ReactQuill theme="snow" value={Value} onChange={setValue}/> 

<button className='btn btn-primary' type='submit' onClick={handlepost}>Create post</button>


</div>):(<Link to="/home"></Link>)

       
    
       
    
    
    
    
  )
}
