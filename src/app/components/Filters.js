import React, { useEffect, useState } from "react"
import { getBooksData } from "../lib/actions";
import { arrowRight, galleryIcon, listIcon, random } from "../lib/icons";
import ExportButton from "./ExportButton";

const Filters = ({ books, setBooks, filters, setFilters, handleSeedChange, setModalState, setSeed, setSelectedBook, getBookBySeed, view, setView }) => {

	const [seedSearch, setSeedSearch] = useState("")

	const resetLanguage = async () => {
		const books = await getBooksData(filters?.quantity, filters?.language, filters?.likes, filters?.reviews)
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
						<option value="en">English (USA)</option>
						<option value="es">Spanish (Mexico)</option>
						<option value="fr">French (France)</option>
					</select>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center p-2 w-full">
				<div className="flex flex-row items-center justify-around w-full my-auto">
					<input required placeholder="Seed" className="border w-1/2 input" value={seedSearch} onChange={(e) => setSeedSearch(e.target.value)}/>
					<button className={"rounded-full border-[1px] border-blue-500 text-blue-500 p-2 focus:bg-blue-500 focus:text-white button-transition"} onClick={changeSeed}>{arrowRight}</button>
					<button className={"rounded-full border-[1px] border-blue-500 text-blue-500 p-2 focus:bg-blue-500 focus:text-white button-transition"} onClick={changeRandomSeed}>{random}</button>
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
						max={10}
						step={0.1}
						onChange={changeFilters}
					/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-centerp-2 w-full">
				<div className="flex flex-row items-center w-full my-auto gap-2">
					<label className="text-sm font-semibold text-gray-400">Reviews:</label>
					<input name="reviews" value={filters.reviews} type="number" className="input" onChange={changeFilters} step={0.1}/>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center p-2 w-full">
				<div className="flex flex-row justify-center items-center w-full my-auto gap-5">
					<button className={view === 'list' ? "rounded-full border-[1px] p-2 bg-blue-500 text-white" : "rounded-full border-[1px] border-blue-500 text-blue-500 p-2 button-transition"} onClick={() => setView("list")}>{listIcon}</button>
					<button className={view === 'gallery' ? "rounded-full border-[1px] p-2 bg-blue-500 text-white" : "rounded-full border-[1px] border-blue-500 text-blue-500 p-2 button-transition"} onClick={() => setView("gallery")}>{galleryIcon}</button>
					<ExportButton books={books} />
				</div>
			</div>
		</>
	)
}

export default Filters
