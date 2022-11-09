const suggestionsButton = document.querySelector(".btn-suggestions");
const unorderedList = document.getElementsByClassName("list-group")[0];
const theCart = document.getElementsByClassName("list-group")[1];

const listOfBooks = async () => {
  const fetchBooks = await fetch(
    "https://striveschool-api.herokuapp.com/books"
  );
  const result = await fetchBooks.json();
  console.log(result);
  const books = await result.map(function (book) {
    const bookTitles = book.title;
    return bookTitles;
  });
  books.forEach((info) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML =
      `${info}` +
      `<button type="button" class="btn btn-info d-flex justify-content-center align-items-center add-to-cart" onclick="modifyCard()">Add to cart&nbsp<i class="fa-solid fa-cart-shopping"></i></button>`;
    unorderedList.appendChild(listItem);
  });
};
suggestionsButton.addEventListener("click", listOfBooks);
