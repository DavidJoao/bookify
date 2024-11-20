'use client'
import { useEffect, useState, useRef } from "react";
import Categories from "../components/Categories";
import Filters from "../components/Filters";
import BookDetails from "../components/BookDetails";
import { getBooksData } from "../lib/actions";
import { Modal } from "react-bootstrap";

const Home = () => {
	const initialFilters = {
		likes: 5,
		reviews: 5,
		quantity: 20,
		language: "en",
	}

	const [books, setBooks] = useState([])
	const loadMoreTrigger = useRef(null)
	const [loadingBooks, setLoadingBooks] = useState(false)
	const [filters, setFilters] = useState(initialFilters)
	const [modalState, setModalState] = useState(false)
	const [selectedBook, setSelectedBook] = useState({})

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

	return (
		<div className="h-screen grid grid-cols-1 grid-rows-8">
			{books ? (
				<>
					<div className="border h-full grid grid-cols-5 grid-rows-2 p-2 pb-0">
						<Filters setBooks={setBooks} filters={filters} setFilters={setFilters} />
						<Categories />
					</div>
					<div className="border-[1px] border-black h-full row-span-7 grid overflow-auto">
						{books &&
							books.map((book, index) => {
								return (
									<div key={index} className="border-[1px] border-black p-2 grid grid-cols-5" onClick={() => {
											setSelectedBook(book)
											setModalState(true)
										}}>
										<BookDetails index={index} book={book} modalState={modalState} setModalState={setModalState} />
									</div>
								)
							})}
						<Modal show={modalState} onHide={() => setModalState(false)}>
							<Modal.Header closeButton>{selectedBook?.title}</Modal.Header>
						</Modal>
						{loadingBooks && (
							<p className="text-center h-[20px]">Loading more data...</p>
						)}
						<div ref={loadMoreTrigger} className="h-[20px]" />
					</div>
				</>
			) : (
				<>
					<p>loading</p>
				</>
			)}
		</div>
	)
}

export default Home