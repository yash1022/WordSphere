import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Readpost() {

    const location =useLocation();
    const post= location.state?.post;
  return (
    <div>

      { post.content?(<p>{post.content}</p>):(<p>NO content</p>)}
      
    </div>
  )
}

