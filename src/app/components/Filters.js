import React, { useEffect } from "react"
import { getBooksData } from "../lib/actions";

const Filters = ( { language, setLanguage, setBooks, quantity, setQuantity } ) => {

	const resetLanguage = async () => {
		const books = await getBooksData(20, language);
		setBooks(books);
	}

	const changeLanguage = async (e) => {
		const { value } = e.target;
		await setLanguage(value)
		await resetLanguage()
	}

	useEffect(() => {
		const fetchBooks = async () => {
		  await resetLanguage();
		};
		fetchBooks();
	  }, [language]); 

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col w-full p-5">
					<label className="text-sm font-semibold text-gray-400">Language</label>
					<select value={language} className="input" onChange={changeLanguage}>
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
					<label className="text-sm font-semibold text-gray-400">Likes</label>
					<input type="range" min={0} max={5} step={0.5} />
				</div>
			</div>

			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col w-full p-5">
					<label className="text-sm font-semibold text-gray-400">Review</label>
					<input type="number" className="input" max={10} min={0} />
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
