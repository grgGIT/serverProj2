 mongoose = require("mongoose");
 const models = require('../models');
 const { Book } = models;

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  reviews: [{
    user: String,
    comment: String,
    date: { type: Date, default: Date.now },
  }],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

BookSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  author: doc.author,
  genre: doc.genre,
  price: doc.price,
  quantity: doc.quantity,
  reviews: doc.reviews.map((review) => ({ user: review.user, comment: review.comment, date: review.date })),
  createdDate: doc.createdDate,
});

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find().lean().exec();
    return res.status(200).json({ 
      count: books.length,
      data: books });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving books' });
  }
};

const addBook = async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.price || !req.body.quantity) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const bookData = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  try {
    const newBook = new BookModel(bookData);
    await newBook.save();
    return res.status(201).json({ book: newBook });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred adding the book' });
  }
};

//get one book in the mongoDB database by its id
const getBookById = async (req, res) => {
  try {
      const {id} = req.params;
      const book = await Book.findById(id);
      if (!book) return res.status(404).send({ message: 'Book not found' });
      return res.status(200).json(book);
  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: 'Server Error'});
  }

}

// Update a book's listed info in the mongoDB database by its id
const updateById = async (req, res) => {
  try {
      if (!req.body.title ||!req.body.author || !req.body.publicationDate) {
          return res.status(400).send({ message: 'Missing required fields, please enter everything into the book info' });
      }
      const {id} = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
      if (!result) return res.status(404).send({ message: 'Book not found' });
      return res.status(200).json({
          message: 'Book updated successfully'});
  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: 'Server Error'});
  }
}

// Delete a book from the mongoDB database by its id
const deleteById = async (req, res) => {
  try {
      const {id} = req.params;
      const result = await Book.findByIdAndDelete(id);
      if (!result) return res.status(404).send({ message: 'Book not found' });
      return res.status(200).json({
          message: 'Book deleted successfully'});
  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: 'Server Error'});
  }
};

// Implement updateBook and deleteBook similarly
const BookModel = mongoose.model('Book', BookSchema);

module.exports = {
  addBook,
  getBooks,
  deleteById,
  getBookById,
  updateById,
};