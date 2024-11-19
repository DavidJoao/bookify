import axios from "axios"

export const getBooksData = async (quantity, language, likes, reviews) => {
    try {
        const res = await axios.get(`/api/books?quantity=${quantity}&language=${language}&likes=${likes}&reviews=${reviews}`)
        return res?.data?.books
    } catch (error) {
        console.error("Error fetching books data", error)
    }
}