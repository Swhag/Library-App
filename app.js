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
    const books = Store.getBooks();
    books.forEach((book) => UI.addBook(book));
  }

  static addBook(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><button class="status-btn">${book.status}</button></td>
    <td><button class="delete-btn">delete</button></td>
    `;

    list.appendChild(row);
  }

  static clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#status').value = 'read';
  }

  static changeStatus(status) {
    if (status.innerHTML == 'read') {
      status.innerHTML = 'Not read';
    } else status.innerHTML = 'read';
  }

  static deleteBook(bookRow, bookName) {
    if (confirm(`Delete ${bookName}?`)) {
      Store.deleteBook(bookName);
      bookRow.innerHTML = '';
    }
  }
}

// Store class ---------------------------------------------------

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static findBook(bookName) {
    const books = Store.getBooks();

    if (books.length === 0 || books === null) {
      return;
    }

    for (let book of books)
      if (book.title === bookName) {
        return books.indexOf(book);
      }
  }

  static changeStatus(i) {
    const books = Store.getBooks();

    if (books[i].status === 'read') {
      books[i].status = 'not read';
    } else if (books[i].status === 'not read') {
      books[i].status = 'read';
    }
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteBook(bookName) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === bookName) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// ---------------------------------------------------------------

function loadDefaultBooks() {
  const DefaultBooks = [
    {
      title: 'Book One',
      author: 'John Doe',
      status: 'read',
    },
    {
      title: 'Book two',
      author: 'Jane Doe',
      status: 'read',
    },
  ];

  if (localStorage.getItem('books') === null) {
    DefaultBooks.forEach((book) => Store.addBook(book));
  }
}

// ---------------------------------------------------------------

(function loadLibrary() {
  document.addEventListener(
    'DOMContentLoaded',
    loadDefaultBooks(),
    UI.displayBooks()
  );
  document.querySelector('#library-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const status = document.querySelector('#status').value;

    const newBook = new Book(title, author, status);

    Store.addBook(newBook);
    UI.addBook(newBook);
    UI.clearField();
  });

  document.querySelector('#book-list').addEventListener('click', (e) => {
    let bookRow = e.target.parentElement.parentElement;
    let bookName = bookRow.firstElementChild.textContent;

    if (e.target.classList == 'delete-btn') {
      UI.deleteBook(bookRow, bookName);
    }
    if (e.target.classList == 'status-btn') {
      Store.changeStatus(Store.findBook(bookName));
      UI.changeStatus(e.target);
    }
  });
})();

// ---------------------------------------------------------------
