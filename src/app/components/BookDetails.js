import React from 'react'
import { chevronDownIcon, chevronUpIcon } from '../lib/icons'

const BookDetails = ( {index, book, selectedBook} ) => {
  return (
    <>
      { book?.title === "Title" ? (
        <p className='text-center flex items-center justify-center min-w-[200px] w-auto m-2 font-bold'>{index + 1 || "#"}</p>
      ) : (
        <p className='text-center flex items-center justify-center min-w-[200px] w-auto m-2 font-bold'>{(selectedBook?.ISBN === book?.ISBN)? chevronUpIcon : chevronDownIcon} {index + 1 || "#"} </p>
      )} 
      <p className='text-center flex items-center justify-center min-w-[200px] w-auto m-2'>{book?.ISBN}</p>
      <p className='text-center flex items-center justify-center min-w-[200px] w-auto m-2'>{book?.title}</p>
      <p className='text-center flex items-center justify-center min-w-[200px] w-auto m-2'>{book?.author}</p>
      <p className='text-center flex items-center justify-center min-w-[200px] w-auto m-2'>{book?.publisher}</p>
    </>
  )
}

export default BookDetails