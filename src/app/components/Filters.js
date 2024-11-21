import React, { useEffect, useState } from "react"
import { getBooksData } from "../lib/actions";
import { arrowRight, galleryIcon, listIcon, random } from "../lib/icons";

const Filters = ({ setBooks, filters, setFilters, handleSeedChange, setModalState, setSeed, setSelectedBook, getBookBySeed, view, setView }) => {

	const [seedSearch, setSeedSearch] = useState("")

	const resetLanguage = async () => {
		const books = await getBooksData(
			filters.quantity,
			filters.language,
			filters.likes,
			filters.reviews
		)
		await setBooks(books)
	}

	const changeFilters = e => {
		const { name, value } = e.target
		if (filters[name] !== value) {
			setFilters(prevFilters => ({
				...prevFilters,
				[name]: value,
			}))
		}
	}

	const changeSeed = (e) => {
		handleSeedChange(seedSearch)
		setSeedSearch("")
	}

	const changeRandomSeed = (e) => {
		const newSeed = Math.floor(Math.random() * 1000000);
		setSeed(newSeed.toString());
		setSeedSearch(newSeed.toString())
		setSelectedBook(getBookBySeed(newSeed.toString()));
		setModalState(true)
	}

	useEffect(() => {
		const fetchBooks = async () => {
			await resetLanguage()
		}
		fetchBooks()
	}, [filters.language])

	return (
		<>
			<div className="flex flex-col items-center justify-center p-2 w-full">
				<div className="flex flex-row items-center justify-center w-full my-auto">
					<label className="text-sm font-semibold text-gray-400 w-full text-center">
						Language
					</label>
					<select name="language" value={filters?.language} className="input w-full" onChange={changeFilters}>
						<option value="en">English</option>
						<option value="es">Spanish</option>
						<option value="fr">French</option>
					</select>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center p-2 w-full">
				<div className="flex flex-row w-full my-auto">
					<input placeholder="Seed" className="border w-1/2 input" value={seedSearch} onChange={(e) => setSeedSearch(e.target.value)}/>
					<button className="w-1/4 input flex items-center justify-center bg-blue-500 text-white font-xl" onClick={changeSeed}>{arrowRight}</button>
					<button className="w-1/4 input flex items-center justify-center bg-blue-500 text-white font-xl" onClick={changeRandomSeed}>{random}</button>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center p-2 w-full">
				<div className="flex flex-col w-full my-auto">
					<label className="text-sm font-semibold text-gray-400">
						Likes: {filters?.likes}
					</label>
					<input
						name="likes"
						value={filters.likes}
						type="range"
						min={0}
						max={5}
						step={0.1}
						onChange={changeFilters}
					/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-centerp-2 w-full">
				<div className="flex flex-row items-center w-full my-auto">
					<label className="text-sm font-semibold text-gray-400">Reviews:</label>
					<input name="reviews" value={filters.reviews} type="number" className="input" onChange={changeFilters} step={0.1}/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center p-2 w-full">
				<div className="flex flex-row justify-center items-center w-full my-auto">
					<button className="input w-full flex justify-center bg-blue-500 text-white focus:bg-black" onClick={() => setView("list")}>{listIcon}</button>
					<button className="input w-full flex justify-center bg-blue-500 text-white focus:bg-black" onClick={() => setView("gallery")}>{galleryIcon}</button>
				</div>
			</div>
		</>
	)
}

export default Filters
