const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function onAddItemsSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add and Item");
    return;
  }

  // Create item DOM element
  addItemDOM(newItem)

  // add item to local storage
  addItemToStorage(newItem)

  checkUI();

  itemInput.value = "";
}

function addItemDOM(item){
    // Create list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
  
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
  
    //   Add li to the DOM
    itemList.appendChild(li);
}

function addItemToStorage (item){
  let itemsFromStorage;

  if (localStorage.getItem("items") === null){
    itemsFromStorage =[]
  }else{
    itemsFromStorage = JSON.parse(localStorage.getItem("items"))
  }

  // add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local Storage
  localStorage.setItem('items',JSON.stringify(itemsFromStorage))

}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

function filterItems(e) {
  const items = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}
// Event Listeners
itemForm.addEventListener("submit", onAddItemsSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
// console.log(itemFilter)
checkUI();
