let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let supmit = document.getElementById("supmit");
let inputs = document.getElementsByTagName("input");
let Delete = document.getElementById("delete");

let mood = "Create";
let tmp;

if (localStorage.product != null) {
  allData = JSON.parse(localStorage.product);
  displayData();
} else {
  allData = [];
}

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

supmit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.value,
    category: category.value,
    count: count.value,
  };
  getTotal();
  newPro.total = total.innerHTML;

  if (mood === "Create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        allData.unshift(newPro);
      }
    } else {
      allData.unshift(newPro);
    }
  } else {
    allData[tmp] = newPro;
    mood = "Create";
    supmit.innerHTML = "Create";
    count.style.display = "block";
  }
  localStorage.setItem("product", JSON.stringify(allData));
  displayData();
  clearData();
};

function dataProducts() {
  let newData = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.value,
    count: count.value,
    category: category.value,
  };
  allData.push(newData);
}

function displayData() {
  let table = "";
  for (let i = 0; i < allData.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${allData[i].title}</td>
    <td>${allData[i].price}</td>
    <td>${allData[i].taxes}</td>
    <td>${allData[i].ads}</td>
    <td>${allData[i].discount}</td>
    <td>${allData[i].total}</td>
    <td>${allData[i].count}</td>
    <td>${allData[i].category}</td>
    <td><button onclick='updateData(${i})' class='btn  btn-outline-warning'>Update</button></td>
    <td><button  onclick='deletProduct(${i})'  class='btn  btn-outline-danger '>Delete</button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = table;

  let deleteData = document.getElementById("deleteData");
  if (allData.length > 0) {
    deleteData.innerHTML = `<td><button onclick= 'delateData()' class='btn  btn-outline-info form-control'>deleteData</button></td>`;
  }
}

function deletProduct(index) {
  allData.splice(index, 1);
  localStorage.product = JSON.stringify(allData);
  displayData();
}
function delateData() {
  localStorage.clear();
  allData.splice(0);
  displayData();
}

function updateData(i) {
  title.value = allData[i].title;
  price.value = allData[i].price;
  taxes.value = allData[i].taxes;
  ads.value = allData[i].ads;
  discount.value = allData[i].discount;

  getTotal();
  category.value = allData[i].category;
  supmit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}

// search
let searchMode = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "SearchTitle") {
    searchMode = "title";
    search.placeholder = "Search by Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search by Category";
  }
  search.focus();
}

function searchData(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].title.includes(value)) {
        table += `<tr>
    <td>${i + 1}</td>
    <td>${allData[i].title}</td>
    <td>${allData[i].price}</td>
    <td>${allData[i].taxes}</td>
    <td>${allData[i].ads}</td>
    <td>${allData[i].discount}</td>
    <td>${allData[i].total}</td>
    <td>${allData[i].count}</td>
    <td>${allData[i].category}</td>
    <td><button onclick='updateData(${i})' class='btn  btn-outline-warning'>Update</button></td>
    <td><button  onclick='deletProduct(${i})'  class='btn  btn-outline-danger '>Delete</button></td>
    </tr>`;
      }
    }
  } else {
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].category.includes(value)) {
        table += `<tr>
    <td>${i + 1}</td>
    <td>${allData[i].title}</td>
    <td>${allData[i].price}</td>
    <td>${allData[i].taxes}</td>
    <td>${allData[i].ads}</td>
    <td>${allData[i].discount}</td>
    <td>${allData[i].total}</td>
    <td>${allData[i].count}</td>
    <td>${allData[i].category}</td>
    <td><button onclick='updateData(${i})' class='btn  btn-outline-warning'>Update</button></td>
    <td><button  onclick='deletProduct(${i})'  class='btn  btn-outline-danger '>Delete</button></td>
    </tr>`;
      }
    }
  }

  document.getElementById("tableBody").innerHTML = table;
}

function clearData() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  total.innerHTML = "";
  total.style.backgroundColor = "red";
}
