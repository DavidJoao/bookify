import axios from "axios"

export const getBooksData = async (quantity, language, likes, reviews) => {
    try {
        const res = await axios.get(`/api/books?quantity=${quantity}&language=${language}&likes=${likes}&reviews=${reviews}`)
        return res?.data?.books
    } catch (error) {
        console.error("Error fetching books data", error)
    }
}

export const exportBooksData = async (books) => {
    try {
        const res = await axios.post("/api/export", books, { headers: { 'Content-Type':'application/json' } })
        if (res.status === 200) {
            const blob = new Blob([res.data], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'books.csv';
            link.click();
        }
        return res;
    } catch (error) {
        console.error("Error exporting books", error)
    }
}