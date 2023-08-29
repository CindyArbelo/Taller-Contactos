document.addEventListener("DOMContentLoaded", () => {
  const itemInput = document.getElementById("item");
  const item2Imput = document.getElementById("item2");
  const addButton = document.getElementById("agregar");
  const deleteButton = document.getElementById("borrar"); // Changed the button ID
  const contenedor = document.getElementById("contenedor");

  let storedItems = JSON.parse(localStorage.getItem("items")) || [];
  updateList(storedItems);

  addButton.addEventListener("click", () => {
    const newItem = itemInput.value.trim() + " - " + item2Imput.value.trim();
    if (newItem !== "") {
      storedItems.push(newItem);
      localStorage.setItem("items", JSON.stringify(storedItems));
      updateList(storedItems);
      itemInput.value = "";
      item2Imput.value = "";
    }
  });

  deleteButton.addEventListener("click", () => {

    storedItems.pop(); 
    localStorage.setItem("items", JSON.stringify(storedItems));
    updateList(storedItems);
  });

  function updateList(items) {
    contenedor.innerHTML = "";
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerText = item;

      const deleteContactButton = document.createElement("button");
      deleteContactButton.classList.add("btn", "btn-outline-danger", "btn-sm", "float-end");
      deleteContactButton.innerText = "Borrar";
      deleteContactButton.addEventListener("click", () => {
        storedItems.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(storedItems));
        updateList(storedItems);
      });

      li.appendChild(deleteContactButton);
      contenedor.appendChild(li);
    });
  }
});
