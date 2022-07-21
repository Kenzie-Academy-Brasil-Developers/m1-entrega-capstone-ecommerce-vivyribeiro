// IMPORTNG ULs TO RENDER THE LI PRODUCTS
let ulProducts = document.querySelector(".products__list"),
	ulCart = document.querySelector(".cart__list");

// CREATING LI CARD AND LISTING IT
function listingCardProduct(list, ul) {
	ul.innerHTML = "";

	let classButton = "";

	if (ul.className == "cart__list") {
		classButton += "remove__cart";
	} else {
		classButton += "add__cart";
	}

	for (let product in list) {
		ul.insertAdjacentHTML(
			"beforeend",
			`
    <li class="product__card">
        <img
          class="product__img"
          src=${list[product].img}
          alt=${list[product].nameItem}
        />
        <div class="product__info">
          <span class="category">${list[product].tag.join("")}</span>
          <h2 class="product__title">${list[product].nameItem}</h2>
          <p class="product__description">
            ${list[product].description}
          </p>
          <span class="product__price">R$ ${list[product].value
						.toFixed(2)
						.replace(".", ",")}</span>
          <button id="${list[product].id}" class="${classButton}">${
				list[product].addCart
			}</button>
        </div>
    </li>
    `
		);
	}
}

listingCardProduct(data, ulProducts);

// IMPORTING ELEMENTS FROM SECTION CART
let mainCart = document.querySelector(".cart__content"),
	emptyCart = document.querySelector(".empty__cart"),
	sectionResult = document.querySelector(".result__cart"),
	totalListQuantity = document.querySelector(".quantity__result"),
	totalListPrice = document.querySelector(".total__result");

//INTERCEPTING, ADDING AND SUM UP PRODUCT TO CART LIST
ulProducts.addEventListener("click", interceptingProductsList);

let listCart = [];

function interceptingProductsList(event) {
	let btnAddCart = event.target;

	if (btnAddCart.tagName == "BUTTON") {
		emptyCart.style.display = "none";
		mainCart.style.height = "20.5rem";
		mainCart.style.display = "block";
		ulCart.style.display = "grid";
		sectionResult.style.display = "grid";

		let idProduct = btnAddCart.id;

		let product = data.find(product => {
			if (product.id == idProduct) {
				product.addCart = "Remover produto";

				return product;
			}
		});

		addProductCart(product);
	}
}

function addProductCart(product) {
	if (product !== undefined) {
		listCart.push(product);

		listingCardProduct(listCart, ulCart);

		sumProductsCart(listCart);
	}
}

function sumProductsCart(list) {
	let listTotalPrice = list.reduce(
		(previousValue, currentValue) => previousValue + currentValue.value,
		0
	);

	let quantity = list.length;

	if (quantity == 1) {
		totalListQuantity.innerText = `${quantity} item`;
	} else {
		totalListQuantity.innerText = `${quantity} itens`;
	}

	totalListPrice.innerText = `R$ ${listTotalPrice.toFixed(2)}`.replace(
		".",
		","
	);
}

// INTERCEPTING, REMOVE AND SUBTRACTING PRODUCT TO CART LIST
ulCart.addEventListener("click", interceptingListCart);

function interceptingListCart(event) {
	let btnRemoveCart = event.target;

	if (btnRemoveCart.tagName == "BUTTON") {
		let idProduct = btnRemoveCart.id;

		let product = listCart.find(product => {
			if (product.id == idProduct) {
				return product;
			}
		});

		removeProductCart(listCart, product);
	}
}

function removeProductCart(list, product) {
	let indexProduct = list.indexOf(product);

	list.splice(indexProduct, 1);

	updateValueCart(list);
	listingCardProduct(list, ulCart);

	if (list.length == 0) {
		emptyCart.style.display = "grid";
		mainCart.style.height = "16rem";
		mainCart.style.display = "grid";
		ulCart.style.display = "none";
		sectionResult.style.display = "none";
	}

	return list;
}

function updateValueCart(list) {
	let listTotalPrice = list.reduce(
		(previousValue, currentValue) => previousValue + currentValue.value,
		0
	);

	if (listCart.length == 1) {
		totalListQuantity.innerText = `${listCart.length} item`;
	} else {
		totalListQuantity.innerText = `${listCart.length} itens`;
	}

	totalListPrice.innerText = `R$ ${listTotalPrice.toFixed(2)}`.replace(
		".",
		","
	);

	// return listTotalPrice;
}

// IMPORTING ELEMENTS TO FURTHER FUNCTIONS
let form = document.getElementById("form"),
	overlayModal = document.getElementById("overlay"),
	modalMessage = document.querySelector(".result__message");

// FILTER PRODUCTS BY CATEGRIES NAV SELECTION
let ulCategories = document.querySelector(".header__nav--menu");

ulCategories.addEventListener("click", e => {
	e.preventDefault();

	let link = e.target,
		clickedLink = e.target.textContent.toLowerCase();

	link.href = `#${clickedLink}`;
	ulProducts.setAttribute("id", `${clickedLink}`);

	showProductsByCategory(clickedLink, data);
});

function showProductsByCategory(tag, list) {
	let categoryList = [];

	for (let product of list) {
		let tagProduct = product.tag.join("").toLowerCase();

		if (tagProduct == tag) {
			categoryList.push(product);
		} else if (tag == "todos") {
			categoryList.push(product);
		}
	}

	if (categoryList.length == 0) {
		modalMessage.innerText = "Ops! Ainda não há produtos nessa categoria! 😅";
		noResultToList(categoryList);
		listingCardProduct(data, ulProducts);
	} else {
		listingCardProduct(categoryList, ulProducts);
	}

	return categoryList;
}

// SEARCH FUNCTION
form.addEventListener("submit", e => {
	e.preventDefault();

	let inputValue = e.target[0].value.trim();

	let resultSearch = userSearch(inputValue, data);

	if (resultSearch.length == 0) {
		modalMessage.innerText = "Produto não encontrado! ☹️";

		noResultToList(resultSearch);
	} else {
		listingCardProduct(resultSearch, ulProducts);
	}

	form.reset();
	// console.log(e.target[0].value);
});

function userSearch(inputValue, list) {
	let arrResultSearch = [];

	list.map(item => {
		let product = item.nameItem.toLowerCase(),
			valueSearch = inputValue.toLowerCase();

		if (product.includes(valueSearch)) {
			arrResultSearch.push(item);
		}
	});

	return arrResultSearch;
}

// MESSAGE TO SHOW WHEN EVEN THE SEARCH EITHER CATEGORIES NAV RETURN EMPTY OR NOT FOUND
function noResultToList(list) {
	if (list.length == 0) {
		overlayModal.style.display = "block";

		document.querySelector(".close__modal").addEventListener("click", () => {
			overlayModal.style.display = "none";
		});
	}
}
