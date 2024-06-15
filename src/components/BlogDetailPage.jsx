import React from 'react';
import {useLocation} from "react-router-dom"

const BlogDetailPage = () => {
    const location =useLocation()
  return (
    <div className='px-96 bg-gray-200 min-h-screen'>
      <h1 className='text-5xl font-bold uppercase pt-4 font-mono'>{location.state.title}</h1>
      <div className='' ><img className='h-96 mx-auto  object-contain' src={location.state.image}/></div>
      <p >{location.state.description}</p>
    </div>
  )
}

export default BlogDetailPage
