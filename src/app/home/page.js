'use client'
import { useEffect, useState, useRef } from "react";
import Categories from "../components/Categories";
import Filters from "../components/Filters";
import BookDetails from "../components/BookDetails";
import { getBooksData } from "../lib/actions";
import { Modal } from "react-bootstrap";
import seedrandom from "seedrandom";
import { likesIcon } from "../lib/icons";
import BookExpansion from "../components/BookExpansion";
import { navigate } from "../lib/navigate";

const Home = () => {
	const initialFilters = {
		likes: 5,
		reviews: 5,
		quantity: 40,
		language: "en",
	}

	const [books, setBooks] = useState([])
	const [originalBooks, setOriginalBooks] = useState([])
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
				filters?.quantity,
				filters?.language,
				filters?.likes,
				filters?.reviews
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
	}, [loadingBooks, loadMoreTrigger, view ])

	useEffect(() => {
		if (seed) {
		  setBooks(shuffleBooksBySeed(originalBooks, seed));
		}
	  }, [seed, originalBooks]);


	const loadMore = async () => {
		setLoadingBooks(true)
		const newQuantity = filters?.quantity + 20
		setFilters(prevFilters => ({
			...prevFilters,
			quantity: prevFilters.quantity + 20,
		}));

		try {
			const newData = await getBooksData(
				newQuantity,
				filters?.language,
				filters?.likes,
				filters?.reviews
			)
			setOriginalBooks(newData);
			setBooks(shuffleBooksBySeed(newData, seed)); 
		} catch (error) {
			console.log(error)
		} finally {
			setTimeout(() => {
				setLoadingBooks(false)
			}, 1000)
		}
	}

	function shuffleBooksBySeed(books, seed) {
		const rng = seedrandom(seed);
		const shuffledBooks = [...books];
		for (let i = shuffledBooks.length - 1; i > 0; i--) {
		  const j = Math.floor(rng() * (i + 1));
		  [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
		}
		return shuffledBooks;
	  }

	  const handleSeedChange = async (newSeed) => {
		setSeed(newSeed);
		setTimeout(() => {
			setBooks(shuffleBooksBySeed(originalBooks, newSeed)); 
		}, 200);
	  };

	return (
		<div className="flex flex-col items-center justify-center">
			{books ? (
				<>
					<div className="w-full h-auto flex-col static" id="toolbar">
						<div className="w-full h-auto flex flex-col md:flex-row gap-2 p-2 border-b-[2px] md:border-none">
							<Filters
								setBooks={setBooks}
								filters={filters}
								setFilters={setFilters}
								handleSeedChange={handleSeedChange}
								books={books}
								setSeed={setSeed}
								setSelectedBook={setSelectedBook}
								setModalState={setModalState}
								view={view}
								setView={setView}
							/>
						</div>
						{ view === 'list' ? (
						<div className="hidden md:flex flex-row items-center justify-around p-1 shadow-xl">
							<Categories />
						</div>
						) : (
							<></>
						) }
					</div>

					{view === "list" ? (
						<div className="w-full h-[calc(100vh-var(--toolbar-height))] w-full overflow-x-auto overflow-y-auto flex flex-col px-auto scroll-smooth">
							<div className="p-2 grid grid-cols-5 md:hidden p-2 w-[120vh] md:w-full sticky top-0 bg-white">
								<BookDetails
									book={{ index: "#", ISBN: "ISBN", title: "Title", author: "Author(s)", publisher: "Publisher"}}/> 
							</div>
							{books &&
								books.map((book, index) => {
									return (
										<div id={book?.ISBN} key={index} className={`${book?.ISBN === selectedBook.ISBN ? 'bg-blue-100' : ""} border grid grid-cols-5 w-[120vh] lg:w-full`} onClick={() => {
												selectedBook === book ? setSelectedBook({}) : setSelectedBook(book);
												navigate(`#${book?.ISBN}`)
											}}>
											<BookDetails index={index} book={book} modalState={modalState} setModalState={setModalState} selectedBook={selectedBook}/>
											<BookExpansion book={book} selectedBook={selectedBook} />
										</div>
									)
								})}
							<div
								className="p-2 grid grid-cols-5 p-2 w-[120vh]lg:w-full"
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
										<div className="w-[150px] h-[200px] brightness-50 hover:brightness-100 flex flex-col items-center justify-center rounded p-3" key={index} style={{ background:`url('${book.image}')`, backgroundSize:"cover"}} onClick={() => {
											setSelectedBook(book)
											setView("list")
											navigate(`#${book?.ISBN}`)
										}}>
											<p className="font-bold text-white brightness-150 text-center">{book.title}</p>
											<p className="font-bold text-white brightness-150 text-center">By: {book.author}</p>
										</div>
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