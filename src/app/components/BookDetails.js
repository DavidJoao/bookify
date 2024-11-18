import React from 'react'

const BookDetails = ( {index, book} ) => {
  return (
    <>
      <p className='text-center'>{index + 1}</p>
      <p className='text-center'>{book?.ISBN}</p>
      <p className='text-center'>{book?.title}</p>
      <p className='text-center'>{book?.author}</p>
      <p className='text-center'>{book?.publisher}</p>
    </>
  )
}

export default BookDetails