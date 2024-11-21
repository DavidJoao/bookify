'use client'
import { useEffect, useState, useRef } from "react";
import Categories from "../components/Categories";
import Filters from "../components/Filters";
import BookDetails from "../components/BookDetails";
import { getBooksData } from "../lib/actions";
import { Modal } from "react-bootstrap";
import seedrandom from "seedrandom";
import Image from "next/image";

const Home = () => {
	const initialFilters = {
		likes: 5,
		reviews: 5,
		quantity: 40,
		language: "en",
	}

	const [books, setBooks] = useState([])
	const loadMoreTrigger = useRef(null)
	const [loadingBooks, setLoadingBooks] = useState(false)
	const [filters, setFilters] = useState(initialFilters)
	const [modalState, setModalState] = useState(false)
	const [selectedBook, setSelectedBook] = useState({})
	const [toolbarHeight, setToolbarHeight] = useState(0)
	const [seed, setSeed] = useState(50)
	const [view, setView] = useState("list")	

	useEffect(() => {
		const toolbar = document.getElementById("toolbar")
		if (toolbar) {
			setToolbarHeight(toolbar.offsetHeight)
			document.documentElement.style.setProperty(
				"--toolbar-height",
				`${toolbar.offsetHeight}px`
			)
		}
	}, [])

	useEffect(() => {
		const fetchBooks = async () => {
			const books = await getBooksData(
				filters.quantity,
				filters.language,
				filters.likes,
				filters.reviews
			)
			setBooks(books)
		}
		fetchBooks()
	}, [filters])

	useEffect(() => {
		if (!loadMoreTrigger.current) return

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !loadingBooks) {
					loadMore()
				}
			})
		})
		observer.observe(loadMoreTrigger.current)
		return () => {
			if (loadMoreTrigger.current) observer.unobserve(loadMoreTrigger.current)
		}
	}, [loadingBooks, loadMoreTrigger])

	const loadMore = async () => {
		setLoadingBooks(true)
		const newQuantity = filters?.quantity + 20
		setFilters({ ...filters, ["quantity"]: newQuantity })

		try {
			const newData = await getBooksData(
				newQuantity,
				filters?.language,
				filters?.likes,
				filters?.reviews
			)
			setBooks(prevBooks => [...prevBooks, ...newData])
		} catch (error) {
			console.log(error)
		} finally {
			setTimeout(() => {
				setLoadingBooks(false)
			}, 1000)
		}
	}

	function getBookBySeed(seed) {
		const rng = seedrandom(seed)
		const randomIndex = Math.floor(rng() * books.length)
		return books[randomIndex]
	}

	const handleSeedChange = async seed => {
		setSeed(seed)
		setSelectedBook(getBookBySeed(seed))
		setModalState(true)
	}

	return (
		<div className="flex flex-col items-center justify-center">
		<Modal show={modalState} onHide={() => setModalState(false)}>
			<Modal.Header className="font-bold text-[20px]" closeButton>{selectedBook?.title} by {selectedBook.author}</Modal.Header>
			<Modal.Body>
				<div className="h-[300px] w-[200px] mx-auto rounded" style={{ background:(`url("${selectedBook.image}")`), backgroundSize:'cover' }}></div>
				<div className="flex flex-col m-2 items-center justify-evenly">
					<p>Publisher: {selectedBook.publisher}</p>
					<p>Likes</p>
				</div>
				<div>
					<p className="text-center mt-3 bg-slate-200 p-1 rounded-t font-bold shadow-lg">Reviews: {selectedBook?.reviews?.length}</p>
					<div className="border h-[400px] md:h-[250px] overflow-auto rounded-b">
						{ selectedBook?.reviews?.map((review, index) => {
							return (
							<div key={index} className="border p-2 hover:bg-slate-100">
								<p className="font-bold">{review?.name}</p>
								<p className="text-slate-400 italic text-sm">- {review?.review}</p>
							</div>
							)
						}) }
					</div>
				</div>
			</Modal.Body>
		</Modal>
			{books ? (
				<>
					{/* // Toolbar Div */}
					<div className="w-full h-auto flex-col static" id="toolbar">
						<div className="w-full h-auto flex flex-col md:flex-row gap-2 p-2">
							<Filters
								setBooks={setBooks}
								filters={filters}
								setFilters={setFilters}
								handleSeedChange={handleSeedChange}
								books={books}
								setSeed={setSeed}
								setSelectedBook={setSelectedBook}
								setModalState={setModalState}
								getBookBySeed={getBookBySeed}
								view={view}
								setView={setView}
							/>
						</div>
						<div className="hidden md:flex flex-row items-center justify-around p-1 shadow-xl">
							<Categories />
						</div>
					</div>

					{view === "list" ? (
						<div className="w-full h-[calc(100vh-var(--toolbar-height))] w-full overflow-x-auto overflow-y-auto flex flex-col px-auto">
							<div className="p-2 grid grid-cols-5 md:hidden p-2 w-[120vh] md:w-full sticky top-0 bg-white">
								<BookDetails
									book={{
										index: "#",
										ISBN: "ISBN",
										title: "Title",
										author: "Author(s)",
										publisher: "Publisher",
									}}
								/>
							</div>
							{books &&
								books.map((book, index) => {
									return (
										<div
											key={index}
											className="grid grid-cols-5 p-2 shadow-lg w-[120vh] md:w-full"
											onClick={() => {
												setSelectedBook(book)
												setModalState(true)
											}}>
											<BookDetails
												index={index}
												book={book}
												modalState={modalState}
												setModalState={setModalState}
											/>
										</div>
									)
								})}
							<div
								className="p-2 grid grid-cols-5 p-2 w-[120vh] md:w-full"
								ref={loadMoreTrigger}>
								<BookDetails
									book={{
										index: "Loading",
										ISBN: "Loading",
										title: "Loading",
										author: "Loading",
										publisher: "Loading",
									}}
								/>
							</div>
							{loadingBooks && (
								<p className="text-center h-[20px]">Loading more data...</p>
							)}
						</div>
					) : (
						<div className="w-full h-[calc(100vh-var(--toolbar-height))] grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-3 p-3">
							{ books.map((book, index) => {
								return (
									<>
										<div className="w-[150px] h-[200px] brightness-50 hover:brightness-100 flex flex-col items-center justify-center rounded p-3" key={index} style={{ background:`url('${book.image}')`, backgroundSize:"cover"}} onClick={() => {
											setSelectedBook(book)
											setModalState(true)
										}}>
											<p className="font-bold text-white brightness-150 text-center">{book.title}</p>
											<p className="font-bold text-white brightness-150 text-center">By: {book.author}</p>
										</div>
									</>
								)
							}) }
							<div className="w-[150px] h-[200px] brightness-50 hover:brightness-100 flex items-center justify-center rounded p-3 border" ref={loadMoreTrigger}></div>
						</div>
					)}
				</>
			) : (
				<p>Loading Books...</p>
			)}
		</div>
	)
}

export default Home