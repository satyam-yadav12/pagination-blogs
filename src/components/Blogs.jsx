import { useEffect, useState } from 'react'

import {removeBlog, moveToPage, fetchBlogs} from "../fetures/BlogSlice"
import { useDispatch, useSelector } from 'react-redux'

const Blogs = ()=>{
  const {blogs, countBlogs, blogUpdated, currentPage, loading, error  } = useSelector((state)=>state.blogs)
  const dispatch = useDispatch()

  const [currentBlogs, setCurrentBlogs] = useState([])
  const [pageNumbers, setPageNumbers]  = useState([])
  const limit  = 6

  useEffect(()=>{
    const blogsTemp = dispatch(fetchBlogs())
   
  },[])

  useEffect(()=>{
    if(!loading){
    const skip = (currentPage-1)*limit
    const temp = blogs.slice(skip, skip+limit)
    setCurrentBlogs(temp)}
  }, [currentPage, loading, blogUpdated])

  useEffect(()=>{
   let count = 1
    let pages = []
    const pageLimit = countBlogs/6
   for(count; count<= pageLimit ; count++){
    pages.push(count)
   }
   setPageNumbers(pages)
  },[countBlogs])


    return (
        <>
        <p className='text-2xl m-5 ml-[5%]'>Blogs</p>
            <div className='grid grid-cols-3 gap-3 m-[5%] mt-5'>
                {currentBlogs?currentBlogs.map((value)=>{
                    return (<div key={value.id} className='w-full h-[400px] border p-3 m-3 overflow-y-auto rounded-2xl'>
                        <button onClick={()=>dispatch(removeBlog(value.id))} className='text-red-500 p-2 m-2 border rounded bg-gray-300 hover:bg-gray-500'>delete</button>
                        <p>Blog id: {value.id}</p>
                        <p>title : {value.title}</p>
                        <p>Description: {value.body}</p>
                    </div>)
                }):<p>No blogs to show</p>}
            </div>

            <div>
                {loading&& <p>loading ... </p>}
                {error && <p>{error}</p>}
            </div>

            <div className='flex flex-row gap-2 items-center justify-center m-5 '>
                {pageNumbers?pageNumbers.map((value)=>{
                    return <p key={value} onClick={()=>dispatch(moveToPage(value))} className='border p-2 rounded-full m-2 cursor-pointer'>{value}</p>
                }):<p>no pages</p>}
            </div>
        </>
    )
}

export default Blogs