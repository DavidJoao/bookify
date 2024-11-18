import axios from "axios"

export const getBooksData = async (quantity, language) => {
    try {
        const res = await axios.get(`/api/books/${quantity}/${language}`)
        return res?.data?.books
    } catch (error) {
        console.error("Error fetching books data", error)
    }
}