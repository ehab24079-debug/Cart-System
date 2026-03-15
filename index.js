let productsDivJS = document.querySelector("#productsDiv");
let tabllee = document.querySelector("table tbody");
let TotalSpanN = document.querySelector("#TotalSpan");

// ShowProducts
let ShowProducts = () => {
  productsDivJS.innerHTML = "";
  products.forEach((el, index) => {
    productsDivJS.innerHTML += `
          <div class="col-12 col-md-6 col-lg-4 d-flex flex-wrap">
            <div class="card p-3 pb-0 bg-white shadow border-secondary" >
              <img height="200" src="${el.img}" class="card-img-top object-fit-contain " alt="..." />
              <div class="card-body">
                <h5 class="card-title">${el.name}</h5>
                <p class="card-text">
                 Price : $ ${el.price}                                                                                   
                </p>
                <button onclick="AddToCart(${index})"  class="btn btn-dark col-12" data-bs-toggle="modal" data-bs-target="#AddCartModal">Add to cart</button>
              </div>
            </div>
          </div>
        `;
  });
};

ShowProducts();

// CalcTotal
let CalcTotal = () => {
  let Total = 0;
  Cart.forEach((el, index) => {
    Total = Total + el.price * el.qut;
  });
  TotalSpanN.textContent = "$" + Total;
};

// ShowCart
let ShowCart = () => {
  tabllee.innerHTML = "";
  Cart.forEach((el, index) => {
    tabllee.innerHTML += `<tr>
              <td>${index + 1}</td>
              <td>${el.name}</td>
              <td>$ ${el.price}</td>
              <td>
                <div class="d-flex align-items-center justify-content-between" >
                  <button onclick="decrementQty(${index})" class="btn btn-danger">-</button>
                  <p class="m-0">${el.qut}</p>
                  <button onclick="incrementQty(${index})" class="btn btn-success">+</button>
                </div>
              </td>
              <td>$ ${el.price * el.qut}</td>
            </tr>`;
  });
  CalcTotal();
};
ShowCart();

// AddToCart
let AddToCart = (indexToAdd) => {
  let product = products[indexToAdd];
  let productIndexIncart = Cart.findIndex((el, index) => {
    return el.name == product.name;
  });
  if (productIndexIncart == -1) {
    product.qut = 1;
    Cart.push(product);
  } else {
    Cart[productIndexIncart].qut++;
  }
  let CartJson = JSON.stringify(Cart);
  localStorage.setItem("CartData", CartJson);
  ShowCart();
};

// incrementQty
let incrementQty = (index) => {
  Cart[index].qut++;
  let CartJson = JSON.stringify(Cart);
  localStorage.setItem("CartData", CartJson);
  ShowCart();
};

// decrementQty
let decrementQty = (index) => {
  if (Cart[index].qut > 1) {
    Cart[index].qut--;
  } else {
    Cart.splice(index, 1);
  }
  let CartJson = JSON.stringify(Cart);
  localStorage.setItem("CartData", CartJson);
  ShowCart();
};

// FilterProducts
let Filterproducts = (brand) => {
  if (brand == "All") {
    products = Originalproducts;
  } else {
    let finnal = Originalproducts.filter((el) => {
      return el.brand == brand;
    });
    products = finnal;
  }
  ShowProducts();
};
