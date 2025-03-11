const Book = require('../models/Book')

class BookController {
    async getBooks()  {
        try {
            return await Book.find().select('-comments');
        } catch (error) {
            throw new Error("Error fetching books");
        }
    }

    async getBookById(id) {
        try {
            console.log(id)
            return await Book.findById(id).select('-commentcount')
        } catch (error) {
            throw new Error("Error fetching book")
        }
    }

    async createBook(bookTitle) {
        try {
            const book = new Book({ title: bookTitle })
            const savedBook = await book.save()
            return { _id: savedBook._id, title: savedBook.title }

        } catch (error) {
            throw new Error("Error creating book" + error)
        }
    }

    async createBookComment(comment, book) {
        try {
            book.comments.push(comment)
            const savedBook = await book.save()

            return savedBook
        } catch (error) {
            throw new Error("Error adding comment")
        }
    }

    async removeBookById(id) {
        try {
            const deletedBook = await Book.findByIdAndDelete(id)
            if (!deletedBook) return "no book exists"

            return "delete successful"
            
        } catch (error) {
            throw new Error("Error removing book")
        }
    }

    async removeAll() {
        try {
            await Book.deleteMany({})

            return "complete delete successful"
        } catch (error) {
            throw new Error("Error removing books")
        }
    }

}




module.exports = new BookController