import React from "react"
import { likesIcon } from "../lib/icons"

const BookExpansion = ({ book, selectedBook }) => {
	return (
		<>
			<div className={`${ book?.ISBN === selectedBook.ISBN ? "flex" : "hidden"} border h-auto lg:h-[500px] bg-blue-50 col-span-5 rounded flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center pb-5 lg:p-2`}>
				<div className="w-full md:w-1/4 h-auto lg:h-full flex flex-col items-center p-2 gap-2">
					<div className="h-[300px] w-[200px] rounded" style={{ background: `url("${book?.image}")`, backgroundSize: "cover",}}></div>
					<p className="flex justify-center gap-2 bg-blue-500 rounded-full w-[50px] p-2 text-white font-semibold"> {book?.likes} {likesIcon}</p>
				</div>

				<div className="w-full p-2 flex flex-col border-[1px]">
					<h1 className="font-bold text-[20px]">{book?.title}</h1>
					<p>
						By <span className="italic font-semibold">{book?.author}</span>
					</p>
					<p>{book?.publisher} Group</p>
					<p className="font-bold mt-2">Reviews ({book?.reviews?.length})</p>
					<div className="h-auto overflow-y-auto bg-white rounded-lg">
						{book?.reviews?.map((review, index) => {
							return (
								<div key={index} className="border p-2 hover:bg-slate-100">
									<p className="font-semibold">{review?.name}</p>
									<p className="text-slate-400 italic text-sm">
										- {review?.review}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export default BookExpansion
