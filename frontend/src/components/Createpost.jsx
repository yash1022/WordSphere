import React from 'react'
import  { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Createpost() {
    const[Value,setValue]=useState('');
  return (
    <ReactQuill theme="snow" value={Value} onChange={setValue} />
  )
}
