let tablle = document.querySelector("table tbody");
let PhoneNameInput = document.querySelector("#PhoneNameInput");
let PhonePriceInput = document.querySelector("#PhonePriceInput");
let PhoneImgInput = document.querySelector("#PhoneImgInput");
let phoneBrandSelect = document.querySelector("#phoneBrandSelect");

// Edit
let NameInputEdit = document.querySelector("#PhoneNameInputEdit");
let PriceInputEdit = document.querySelector("#PhonePriceInputEdit");
let ImgInputEdit = document.querySelector("#PhoneImgInputEdit");
let BrandSelectEdit = document.querySelector("#phoneBrandSelectEdit");

let EditVar = false;

let Showproducts = () => {
  tablle.innerHTML = "";
  Originalproducts.forEach((el, index) => {
    tablle.innerHTML += `
        <tr>
              <td>${index + 1}</td>
              <td>${el.name}</td>
              <td>$ ${el.price}</td>
              <td>
                 <img height="50" width="50" class="rounded-circle object-fit-cover " src=" ${el.img}"/> 
             </td>
              <td>
              <button class="btn btn-warning" onclick="EditItem(${index})"  data-bs-toggle="modal" data-bs-target="#EditModal">Edit</button>
              <button class="btn btn-danger" onclick="RemoveItem(${index})">Remove</button>
              </td>

        </tr>`;
  });
};
Showproducts();

let AddNewProduct = () => {
  if (
    PhoneNameInput.value === "" ||
    PhonePriceInput.value === "" ||
    phoneBrandSelect.value === "" ||
    PhoneImgInput.value === ""
  ) {
    alert("Please complete the data");
    return;
  }

  let NewPro = {
    name: PhoneNameInput.value,
    price: PhonePriceInput.value,
    brand: phoneBrandSelect.value,
    img: PhoneImgInput.value,
  };
  Originalproducts.push(NewPro);
  let proJson = JSON.stringify(Originalproducts);
  localStorage.setItem("Products", proJson);
  PhoneNameInput.value = "";
  PhonePriceInput.value = "";
  phoneBrandSelect.value = "";
  PhoneImgInput.value = "";
  Showproducts();
};

let RemoveItem = (indexToDel) => {
  let RememberThis = confirm("Do you want to delete ?");
  if (RememberThis == true) {
    Originalproducts.splice(indexToDel, 1);
    let proJson = JSON.stringify(Originalproducts);
    localStorage.setItem("Products", proJson);
  }
  Showproducts();
};

let EditItem = (index) => {
  let NewData = Originalproducts[index];
  NameInputEdit.value = NewData.name;
  PriceInputEdit.value = NewData.price;
  ImgInputEdit.value = NewData.img;
  BrandSelectEdit.value = NewData.brand;
  EditVar = index;
};

let SaveUpdate = () => {
  if (
    NameInputEdit.value === "" ||
    PriceInputEdit.value === "" ||
    ImgInputEdit.value === "" ||
    BrandSelectEdit.value === ""
  ) {
    alert("Please complete the data");
    return;
  }
  SaveChanGe = {
    name: NameInputEdit.value,
    price: PriceInputEdit.value,
    img: ImgInputEdit.value,
    brand: BrandSelectEdit.value,
  };
  Originalproducts[EditVar] = SaveChanGe;
  let proJson = JSON.stringify(Originalproducts);
  localStorage.setItem("Products", proJson);
  Showproducts();
};
