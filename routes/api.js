/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const bookController = require('../controllers/bookController')

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const books = await bookController.getBooks()
  
        res.json(books)
        
      } catch (error) {
        res.json({ error: "Error fetching books" })
      }
    })
    
    .post(async function (req, res){
      const { title } = req.body;
      //response will contain new book object including atleast _id and title
      if (!title) return res.json("missing required field title")

      try {
        const newBook = await bookController.createBook(title)

        res.json(newBook)
      } catch (error) {
        res.json({ error: "Error adding book" + error })
      }
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'

      try {
        const response = await bookController.removeAll()
        res.json(response)
      } catch (error) {
        res.json({ error: "Error removing books" })
      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      const { id } = req.params;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      try {
        const book = await bookController.getBookById(id)
        if (!book) return res.json("no book exists")

        res.json(book)
      } catch (error) {
        res.json("no book exists")
      }
    })
    
    .post(async function(req, res){
      const { id } = req.params;
      const { comment } = req.body;
      //json res format same as .get

      if(!comment) return res.json("missing required field comment")

      try {
        const book = await bookController.getBookById(id)
        if (!book) return res.json("no book exists")

        const updatedBook = await bookController.createBookComment(comment, book)

        res.json(updatedBook)
      } catch (error) {
        res.json({ error: "Error adding comment to book with id " + id })
      }
    })
    
    .delete(async function(req, res){
      const { id } = req.params;
      //if successful response will be 'delete successful'
      if (!id) return res.json("bookId required")

      try {
        const response = await bookController.removeBookById(id)

        res.json(response)
      } catch (error) {
        res.json({ error: "Error removing book with id " + id })
      }
    });
  
};
