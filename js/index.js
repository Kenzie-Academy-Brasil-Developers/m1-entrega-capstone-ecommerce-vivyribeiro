// IMPORTNG ULs TO RENDER THE LI PRODUCTS
let ulProducts = document.querySelector(".products__list"),
	ulCart = document.querySelector(".cart__list");

// CREATING LI CARD AND LISTING IT
function listingCardProduct(list, ul) {
	ul.innerHTML = "";

	let classLi = "",
		classButton = "",
		contentQuantity = "",
		classQuantity = "",
		idValeuQuantity = "";

	if (ul.className == "cart__list") {
		classLi += "cart__productCard";
		classButton += "remove__cart";
		contentQuantity += "cart__contentQuantity";
		classQuantity += "btn__quantityCart";
		idValeuQuantity += "cart__qnt";
	} else {
		classLi += "product__card";
		classButton += "add__cart";
		contentQuantity += "product__contentQuantity";
		classQuantity += "btn__quantityProduct";
		idValeuQuantity += "product__qnt";
	}

	for (let product of list) {
		let imgUrl = product.img,
			imgAlt = product.nameItem,
			category = product.tag.join(""),
			name = product.nameItem,
			description = product.description,
			price = product.value.toFixed(2).replace(".", ","),
			id = product.id,
			btn = product.addCart,
			quantity = product.quantityNumbers;

		ul.insertAdjacentHTML(
			"beforeend",
			`
    <li class="${classLi}">
        <img
          class="product__img"
          src=${imgUrl}
          alt=${imgAlt}
        />
        <div class="product__info">
          <span class="category">${category}</span>
          <h2 class="product__title">${name}</h2>
          <p class="product__description">
            ${description}
          </p>
          <span class="product__price">R$ ${price}</span>
          <button id="${id}" class="${classButton}">${btn}</button>
        </div>
				<div class="${contentQuantity}">
    			<button class="${classQuantity}" onclick="decrementQuantityCart(${id})"> - </button>
    			<span id="${idValeuQuantity + id}">${quantity}</span>
    			<button class="${classQuantity}" onclick="incrementQuantityCart(${id})"> + </button> 
				</div>
				
    </li>
    `
		);
	}
	/*
<i class="fa-regular fa-plus" ></i>
<i class="fa-regular fa-minus" >

	<!--<label>
					 <input class="${classQuantity}" type="number" min="1" value="1" readonly> 
				</label>-->
onclick="updateQuantityCart('plus', ${id}, ${list})"
onclick="updateQuantityCart('minus', ${id}, ${list})"
*/
	let btnRemover = document.querySelectorAll(".remove__cart");

	for (let btn of btnRemover) {
		btn.innerText = "Remover produto";
	}

	let productQntContent = document.querySelectorAll(
		".product__contentQuantity"
	);
	// productQntContent.remove();
}

listingCardProduct(data, ulProducts);

// IMPORTING ELEMENTS FROM SECTION CART
let mainCart = document.querySelector(".cart__content"),
	emptyCart = mainCart.querySelector(".empty__cart"),
	sectionResult = document.querySelector(".result__cart"),
	totalListQuantity = sectionResult.querySelector(".quantity__result"),
	totalListPrice = sectionResult.querySelector(".total__result");

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
				return product;
			}
		});

		addProductCart(product, ulCart, listCart);
	}
}

function addProductCart(product, ul, list) {
	if (product !== undefined) {
		if (list.some(item => item.id === product.id)) {
			incrementQuantityCart(product.id);
		} else {
			list.push(product);
		}
	}

	listingCardProduct(list, ul);
	updateCart(product.id);
	// console.log(list);
}

function incrementQuantityCart(id) {
	let selecteProduct = id;

	let searchItem = listCart.find(item => item.id === selecteProduct);

	searchItem.quantityNumbers += 1;

	updateCart(selecteProduct);
}

function decrementQuantityCart(id) {
	let selecteProduct = id;

	let searchItem = listCart.find(item => item.id === selecteProduct);

	if (searchItem.quantityNumbers === 1) {
		removeProductCart(listCart, searchItem);
	} else {
		searchItem.quantityNumbers -= 1;
	}

	updateCart(selecteProduct);
}

function updateCart(id) {
	let searchItem = listCart.find(item => item.id === id);
	let quantityValeu = (document.getElementById(`cart__qnt${id}`).innerText =
		searchItem.quantityNumbers);

	calcProductsCart(listCart);
}

function calcProductsCart(listCart) {
	let listTotalPrice = 0,
		listTotalQuantity = 0;

	for (let i = 0; i < listCart.length; i++) {
		listTotalPrice += listCart[i].quantityNumbers * listCart[i].value;
		listTotalQuantity += listCart[i].quantityNumbers;
	}
	// console.log(listTotalPrice);
	// console.log(listTotalQuantity);

	totalListPrice.innerText = `R$ ${listTotalPrice.toFixed(2)}`.replace(
		".",
		","
	);

	if (listTotalQuantity == 1) {
		totalListQuantity.innerText = `${listTotalQuantity} item`;
	} else {
		totalListQuantity.innerText = `${listTotalQuantity} itens`;
	}
}

// INTERCEPTING, REMOVE AND SUBTRACTING PRODUCT TO CART LIST
ulCart.addEventListener("click", interceptingListCart);

function interceptingListCart(event) {
	let btnRemoveCart = event.target;

	if (
		btnRemoveCart.tagName == "BUTTON" &&
		btnRemoveCart.className == "remove__cart"
	) {
		let idProduct = btnRemoveCart.id;

		let productCart = listCart.find(product => product.id == idProduct);

		removeProductCart(listCart, productCart);
	}
}

function removeProductCart(list, product) {
	let indexProduct = list.indexOf(product);

	if (product.quantityNumbers === 1) {
		list.splice(indexProduct, 1);
		calcProductsCart(list);
	} else if (product.quantityNumbers > 1) {
		decrementQuantityCart(product.id);
	}

	listingCardProduct(list, ulCart);

	//updateCart(product.id);
	if (list.length == 0) {
		emptyCart.style.display = "grid";
		mainCart.style.height = "16rem";
		mainCart.style.display = "grid";
		ulCart.style.display = "none";
		sectionResult.style.display = "none";
	}

	return list;
}

// IMPORTING ELEMENTS TO FURTHER FUNCTIONS
const form = document.getElementById("form"),
	overlayModal = document.getElementById("overlay"),
	modalMessage = overlayModal.querySelector(".result__message");

const ulCategories = document.querySelector(".header__nav--menu"),
	linksCategories = ulCategories.querySelectorAll(".menu__link");

// ACTIVE MENU LINK OF CATEGORY WHEN CLICKED IT
for (let link of linksCategories) {
	// console.log(link);
	link.addEventListener("click", function () {
		let current = document.getElementsByClassName("active");

		current[0].classList.remove("active");
		this.classList.add("active");

		if (link.textContent == "Conjuntos") {
			link.classList.remove("active");

			linksCategories[0].className += " active";
		}
	});
}

// FILTER PRODUCTS BY CATEGRIES NAV SELECTION
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
		ulProducts.setAttribute("id", "todos");
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
