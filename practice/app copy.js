class Books {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
  }
}

// UI -------------------------------------------------------------

class UI {
  static displayBooks() {
    const storedBooks = [
      {
        title: "Book One",
        author: "John Doe",
        status: "read",
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        status: "read",
      },
    ];

    storedBooks.forEach((book) => this.addBookToList(book));
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

  static changeStatus(el) {
    if (el.textContent == "read") {
      el.textContent = "not read";
    } else el.textContent = "read";
  }

  static deleteBook(el) {
    let bookRow = el.parentElement.parentElement;
    let bookTitle = bookRow.firstElementChild.textContent;
    if (confirm(`Delete ${bookTitle}?`)) {
      bookRow.innerHTML = "";
    }
  }
}

// ----------------------------------------------------------------

(function loadLibrary() {
  document.addEventListener("DOMContentLoaded", UI.displayBooks());
  document.querySelector("#library-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const status = document.querySelector("#status").value;

    let newBook = new Books(title, author, status);

    UI.addBookToList(newBook);
    UI.clearField();
  });
  document.querySelector("#book-list").addEventListener("click", (e) => {
    if (e.target.className == "delete-btn") {
      UI.deleteBook(e.target);
    }
    if (e.target.className == "status-btn") {
      UI.changeStatus(e.target);
    }
  });
})();
