'use client'
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Categories from "../components/Categories";
import Filters from "../components/Filters";
import BookDetails from "../components/BookDetails";
import { getBooksData } from "../lib/actions";

const Home = () => {

    const initialFilters = {
        likes: '',
        reviews: '',
    }

	const [books, setBooks] = useState([])
    const [quantity, setQuantity] = useState(20)

    const loadMoreTrigger = useRef(null);
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [language, setLanguage] = useState('en')



	useEffect(() => {
		const fetchBooks = async () => {
			const books = await getBooksData(quantity, language);
			setBooks(books);
		};
		fetchBooks();
	}, [])

    useEffect(() => {
        if (!loadMoreTrigger.current) return;
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !loadingBooks) {
              loadMore();
            }
          });
        });
    
        observer.observe(loadMoreTrigger.current);
    
        return () => {
          if (loadMoreTrigger.current) observer.unobserve(loadMoreTrigger.current);
        };
      }, [loadingBooks, loadMoreTrigger]);

    const loadMore = async () => {
        setLoadingBooks(true);
        const newQuantity = quantity + 20;
        setQuantity(newQuantity)

        try {
            const newData = await getBooksData(newQuantity, language);
            setBooks(prevBooks => [...prevBooks, ...newData]);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoadingBooks(false)
        }, 1000)
        }
    }

	return (
		<div className="h-screen grid grid-cols-1 grid-rows-8">
            { books ? (
                <>
                <div className="border h-full grid grid-cols-5 grid-rows-2 p-2 pb-0">
                    <Filters language={language} setLanguage={setLanguage} setBooks={setBooks} quantity={quantity} setQuantity={setQuantity}/>
                    <Categories />
                </div>
                <div className="border-[1px] border-black h-full row-span-7 grid overflow-auto">
                    {books &&
                        books?.map((book, index) => {
                            return (
                                <div key={index} className="border-[1px] border-black p-2 grid grid-cols-5">
                                    <BookDetails index={index} book={book} />
                                </div>
                            )
                        })}
                    {loadingBooks && <p className="text-center h-[20px]">Loading more data...</p>}
                    <div ref={loadMoreTrigger} className="h-[20px]"/>
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