const myLibrary = [];

// Takes the info from input fields and saves it as variables
// When button is pressed takes values and stores them as books
const nameField = document.querySelector("#title");
const authorField = document.querySelector("#author");
const pagesField = document.querySelector("#pages");
const statusField = document.querySelector("#isRead");
const formField = document.querySelector("form");
formField.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(
    nameField.value,
    authorField.value,
    pagesField.value,
    statusField.checked
  );
  formField.reset();
  removeElementsByClass("books");
  displayLibrary();
});

// Creates an Object for the book with stored data
function Book(
  title = `Unknown`,
  author = `Unknown`,
  pages = `Unknown`,
  isRead = false
) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    let info = `${title} by ${author}, ${pages} pages, ${isRead}`;
    return info;
  };
}

// Adds book to Library
function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

// To use to remove elements
function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// Used to add any new paragraph with given information
function makeParagraph(className, content, parent) {
  const el = document.createElement("p");
  el.classList.add(className);
  el.textContent = content;
  parent.appendChild(el);
}

//Displays all Books from Array in the table
function displayLibrary() {
  let i = 0;
  for (const book of myLibrary) {
    // Creates a new div for each book to be displayed it
    const container = document.querySelector(".container");
    const newDiv = document.createElement("div");

    newDiv.classList.add("books");
    container.appendChild(newDiv);
    // Uses a function to add any new paragraph with given information
    makeParagraph("paraT", book.title, newDiv);
    makeParagraph("paraA", book.author, newDiv);
    makeParagraph("paraP", book.pages, newDiv);
    // Creates a Read or Unread Button for Each Book
    const buttonRead = document.createElement("BUTTON");
    // Displays either Read or Unread depending on Information
    let buttonReadText;
    if (book.isRead === true) {
      buttonReadText = document.createTextNode("Read");
    } else {
      buttonReadText = document.createTextNode("Unread");
    }
    buttonRead.addEventListener("click", () => {
      if (book.isRead) {
        book.isRead = false;
      } else {
        book.isRead = true;
      }
      removeElementsByClass("books");
      displayLibrary();
    });
    buttonRead.classList.add("read");
    buttonRead.appendChild(buttonReadText);
    newDiv.appendChild(buttonRead);
    // Creates a Remove Button for Each Book
    const buttonDel = document.createElement("BUTTON");
    const buttonDelText = document.createTextNode("Remove");
    const index = i;
    buttonDel.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      removeElementsByClass("books");
      displayLibrary();
    });
    buttonDel.classList.add("del");
    buttonDel.appendChild(buttonDelText);
    newDiv.appendChild(buttonDel);
    // Updates Counter to match book index
    i++;
  }
}

displayLibrary();
