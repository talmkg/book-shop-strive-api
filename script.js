const suggestionsButton = document.querySelector(".btn-suggestions");
const unorderedList = document.getElementsByClassName("list-group")[0];
const theCart = document.getElementById("secondList");
const addToCard = document.querySelector("add-to-cart");
const searchBar = document.querySelector(".form-control");
const addToCartButton = document.querySelectorAll("add-to-cart");
console.log(searchBar);

const listOfBooks = async () => {
  const fetchBooks = await fetch(
    "https://striveschool-api.herokuapp.com/books"
  );
  const result = await fetchBooks.json();
  console.log(result);
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
      `<img src="${bookImages}" style="width: 20%"/>` +
      `<p>            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non soluta nesciunt tempore blanditiis nemo ab quas nobis, dolorem porro temporibus, quidem suscipit modi aut explicabo deserunt similique fugit quaerat itaque.
      </p>` +
      `<button type="button" class="btn btn-secondary absolute add-to-cart" onclick="addToCart(event)">Add to cart 🛒</button>` +
      `<button type="button" class="btn btn-danger absolute add-to-cart" onclick='removeCard(event)'>Skip</button>`;
    unorderedList.appendChild(listItem);
  });
};
suggestionsButton.addEventListener("click", listOfBooks);
//removing
const removeCard = (event) => {
  const currentSkipButton = event.currentTarget;
  currentSkipButton.parentElement.classList.add("display-none");
};
//modifying?
const modifyCard = (event) => {
  const currentButton = event.currentTarget;
  currentButton.parentElement.classList.add("red-color");
};
//ADDING SEARCH BAR BELOW

//add to cart
const addToCart = (event) => {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn-danger");
  deleteButton.innerText = "❌";
  deleteButton.classList.add("dblock");
  deleteButton.addEventListener("click", removeCard);
  const currentButton = event.currentTarget;
  const clonedNode = currentButton.parentElement.cloneNode(true);
  const childrenOfClone = clonedNode.childNodes;
  childrenOfClone[2].classList.add("noclick");
  childrenOfClone[3].classList.add("noclick");
  clonedNode.append(deleteButton);
  theCart.append(clonedNode);
  const currentListItem = currentButton.parentElement;
  currentListItem.classList.add("selected");
  let checkout = (function () {
    let executed = false;
    return function () {
      if (!executed) {
        executed = true;
        theCart.innerHTML = `<button type="button" class="btn btn-success checkout">
        Proceed to checkout
      </button>`;
      }
      checkout();
    };
  })();
};
