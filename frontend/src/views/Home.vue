<template>
  <div class="container">
    <h1 class="mt-4 mb-4">Bookshop</h1>
    
    <!-- Create Book Form -->
    <div>
      <h2 class="mb-3">Add New Book</h2>
      <form @submit.prevent="addBook">
        <div class="mb-3">
          <input
            type="text"
            v-model="newBook.title"
            class="form-control"
            placeholder="Title"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            v-model="newBook.author"
            class="form-control"
            placeholder="Author"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            v-model="newBook.price"
            class="form-control"
            placeholder="Price"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            v-model="newBook.stock"
            class="form-control"
            placeholder="Stock"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Add Book</button>
      </form>
    </div>

    <!-- Book List -->
    <ul class="list-group mt-4">
      <li v-for="book in books" :key="book._id" class="list-group-item d-flex justify-content-between align-items-center">
        <span>{{ book.title }} - {{ book.author }}</span>
        
        <!-- Update Book Button -->
        <button @click="editBook(book)" class="btn btn-warning btn-sm">Edit</button>
        
        <!-- Delete Book Button -->
        <button @click="deleteBook(book._id)" class="btn btn-danger btn-sm">Delete</button>
      </li>
    </ul>

    <!-- Update Book Form (conditionally displayed) -->
    <div v-if="isEditing" class="mt-4">
      <h2>Edit Book</h2>
      <form @submit.prevent="updateBook">
        <div class="mb-3">
          <input
            type="text"
            v-model="currentBook.title"
            class="form-control"
            placeholder="Title"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            v-model="currentBook.author"
            class="form-control"
            placeholder="Author"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            v-model="currentBook.price"
            class="form-control"
            placeholder="Price"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            v-model="currentBook.stock"
            class="form-control"
            placeholder="Stock"
            required
          />
        </div>
        <button type="submit" class="btn btn-success">Update Book</button>
        <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      newBook: {
        title: "",
        author: "",
        price: null,
        stock: null
      },
      currentBook: {
        _id: "",
        title: "",
        author: "",
        price: null,
        stock: null
      },
      isEditing: false,
    };
  },
  created() {
    this.fetchBooks();
  },
  methods: {
    // Fetch all books
    async fetchBooks() {
      try {
        const response = await axios.get("https://bookshop-lx5f.onrender.com");
        this.books = response.data;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },

    // Add a new book
    async addBook() {
      try {
        const response = await axios.post("https://bookshop-lx5f.onrender.com/addBook", this.newBook);
        this.books.push(response.data);
        this.newBook = { title: "", author: "", price: null, stock: null }; // Reset form
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },

    // Edit a book
    editBook(book) {
      this.isEditing = true;
      this.currentBook = { ...book }; // Create a copy to edit
    },

    // Update the book
    async updateBook() {
      try {
        const response = await axios.put(`https://bookshop-lx5f.onrender.com/${this.currentBook._id}`, this.currentBook);
        const index = this.books.findIndex((book) => book._id === this.currentBook._id);
        this.books[index] = response.data;
        this.cancelEdit(); // Reset edit state
      } catch (error) {
        console.error("Error updating book:", error);
      }
    },

    // Delete a book
    async deleteBook(bookId) {
      try {
        await axios.delete(`https://bookshop-lx5f.onrender.com/${bookId}`);
        this.books = this.books.filter((book) => book._id !== bookId); // Remove book from list
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    },

    // Cancel editing
    cancelEdit() {
      this.isEditing = false;
      this.currentBook = { _id: "", title: "", author: "", price: null, stock: null }; // Reset currentBook
    },
  },
};
</script>

<style scoped>
/* Bootstrap classes are already adding styling, but you can add additional styles here if needed */
</style>
