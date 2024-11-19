import React, { useEffect } from "react"
import { getBooksData } from "../lib/actions";

const Filters = ( { setBooks, filters, setFilters } ) => {

	const resetLanguage = async () => {
		const books = await getBooksData(20, filters?.language, filters?.likes, filters?.reviews);
		setBooks(books);
	}

	const changeFilters = async (e) => {
		const { name, value } = e.target;
		await setFilters({
			...filters,
			[name]: value
		})
	}

	useEffect(() => {
		const fetchBooks = async () => {
		  await resetLanguage();
		};
		fetchBooks();
	  }, [filters]); 

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col w-full p-5">
					<label className="text-sm font-semibold text-gray-400">Language</label>
					<select name="language" value={filters?.language} className="input" onChange={changeFilters}>
						<option value='en'>English</option>
						<option value='es'>Spanish</option>
						<option value='fr'>French</option>
					</select>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col w-full p-5">
					<label className="text-sm font-semibold text-gray-400">Seed</label>
					<select className="input"></select>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col w-full p-5">
					<label className="text-sm font-semibold text-gray-400">Likes: {filters?.likes}</label>
					<input name="likes" value={filters.likes} type="range" min={0} max={5} step={0.1} onChange={changeFilters}/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col w-full p-5">
					<label className="text-sm font-semibold text-gray-400">Reviews:</label>
					<input name="reviews" value={filters.reviews} type="number" className="input" onChange={changeFilters}/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-row justify-center w-full p-5">
					<button>List</button>
					<button>Gallery</button>
				</div>
			</div>
		</>
	)
}

export default Filters
