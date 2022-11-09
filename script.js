const suggestionsButton = document.querySelector(".btn-suggestions");
const unorderedList = document.getElementsByClassName("list-group")[0];
const theCart = document.getElementById("secondList");
const addToCard = document.querySelector("add-to-cart");
const searchBar = document.querySelector(".form-control");
console.log(searchBar);

const listOfBooks = async () => {
  const fetchBooks = await fetch(
    "https://striveschool-api.herokuapp.com/books"
  );
  const result = await fetchBooks.json();
  theCart.style.display = "block";
  const books = result.map(function (book) {
    const bookTitles = book.title;
    const bookImages = book.img;
    return [bookTitles, bookImages];
  });
  books.forEach(([bookTitles, bookImages]) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML =
      `<h3>${bookTitles}</h3>` +
      `<img src="${bookImages}" style="width: 40%"/>` +
      `<button type="button" class="btn btn-info m-1 d-flex justify-content-center align-items-center add-to-cart" onclick="modifyCard()">Add to cart&nbsp<i class="fa-solid fa-cart-shopping"></i></button>` +
      `<button type="button" class="btn btn-danger m-1 d-flex justify-content-around add-to-cart" onclick='skip(event)'>Skip</button>`;
    unorderedList.appendChild(listItem);
  });
};
suggestionsButton.addEventListener("click", listOfBooks);

//ADDING SEARCH BAR BELOW
