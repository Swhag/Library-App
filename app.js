class Book {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
  }
}

// UI class ------------------------------------------------------

class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        status: "Read",
      },
      {
        title: "Book two",
        author: "Jane Doe",
        status: "Read",
      },
    ];

    const books = StoredBooks;
    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><button class="status-btn">${book.status}</button></td>
    <td><button class="delete-btn">delete</button></td>
    `;

    list.appendChild(row);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#status").value = "read";
  }

  static changeStatus(status) {
    if (status.innerHTML == "read") {
      status.innerHTML = "Not read";
    } else status.innerHTML = "read";
  }

  static deleteBook(el) {
    let bookName = el.parentElement.parentElement.firstElementChild.textContent;
    if (confirm(`delete "${bookName}"?`)) {
      book.innerHTML = "";
    }
  }
}

// ---------------------------------------------------------------

(function loadLibrary() {
  document.addEventListener("DOMContentLoaded", UI.displayBooks());
  document.querySelector("#library-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const status = document.querySelector("#status").value;

    const newBook = new Book(title, author, status);
    console.log(newBook);
    UI.addBookToList(newBook);
    UI.clearField();
  });

  document.querySelector("#book-list").addEventListener("click", (e) => {
    if (e.target.classList == "delete-btn") {
      UI.deleteBook(e.target);
    }
    if (e.target.classList == "status-btn") {
      UI.changeStatus(e.target);
    }
  });
})();

// Store class ---------------------------------------------------

// class Store {
//   static getBooks() {
//     let books;
//     if (localStorage.getItem("books") === null) {
//       books = [];
//     } else {
//       books = JSON.parse(localStorage.getItem("books"));
//     }

//     return books;
//   }

//   static addBook(book) {
//     const books = Store.getBooks();
//     books.push(book);
//     localStorage.setItem("books", JSON.stringify(books));
//   }

//   static removeBook(title) {
//     const books = Store.getBooks();

//     books.forEach((book, index) => {
//       if (book.title === title) {
//         books.splice(index, 1);
//       }
//     });

//     localStorage.setItem("books", JSON.stringify(books));
//   }
// }
