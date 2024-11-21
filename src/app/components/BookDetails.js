import React from 'react'

const BookDetails = ( {index, book} ) => {
  return (
    <>
      <p className='text-center flex items-center justify-center w-[200px]'>{index + 1 || '#'}</p>
      <p className='text-center flex items-center justify-center w-[200px]'>{book?.ISBN}</p>
      <p className='text-center flex items-center justify-center w-[200px]'>{book?.title}</p>
      <p className='text-center flex items-center justify-center w-[200px]'>{book?.author}</p>
      <p className='text-center flex items-center justify-center w-[200px]'>{book?.publisher}</p>
    </>
  )
}

export default BookDetails