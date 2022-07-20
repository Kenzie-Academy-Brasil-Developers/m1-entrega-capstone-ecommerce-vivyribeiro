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

	if (list.length == 1) {
		totalListQuantity.innerText = `${list.length} item`;
	} else {
		totalListQuantity.innerText = `${list.length} itens`;
	}

	totalListPrice.innerText = `R$ ${listTotalPrice.toFixed(2)}`.replace(
		".",
		","
	);

	// return listTotalPrice;
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
