
const Book = require('../db/bookModel');

// GET /books Gets all books in the system
const getAllBooks = async (req, res) => {
  console.log("In GET All books function");
  return res.json(await Book.find());
};

const getBookById = async (req, res) => {
  console.log("In GET Book By ID function");
  const{bookId} = req.params;
  return res.json(
    await Book.findOne({id: bookId})
  )
};

// GET /books/genre/{genre} Gets a book by a specific Genre
const getBooksByGenre = async (req, res) => {
  console.log("In GET Books By Genre function");
  // Retrieve the genre path
  const {genre} = req.query;
  return res.json(
    await Book.find({genre})
  );
};

// POST /books Create new book
const createBook = async (req, res) =>{
  console.log("In POST new book function");
  //Retrieve body object
  const {body} = req;
  return res.json(
    await Book.create(body)
  );
};

// PUT /books/{bookId} Update book
const updateBook = async (req, res) => {
  console.log("In PUT update book function");
  // Retrieve Body
  const {body} = req;
  const {bookId} = req.params;
  await Book.updateOne({ id: bookId }, body)
  return res.json(
    await Book.findOne({id: bookId})
  );
}

// DELETE /books/{bookId} Deletes a book by ID
const deleteBook = async (req, res) => {
  console.log("In DELETE books function")
  const {bookId} = req.params;
  await Book.deleteOne({id: bookId});
  return res.sendStatus(204);
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByGenre,
  createBook,
  updateBook,
  deleteBook,
}
