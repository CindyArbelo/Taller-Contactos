document.addEventListener("DOMContentLoaded", () => {
  const itemInput = document.getElementById("item");
  const item2Input = document.getElementById("item2");
  const addButton = document.getElementById("agregar");
  const contenedor = document.getElementById("contenedor");
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search");

  let storedItems = JSON.parse(localStorage.getItem("items")) || [];
  storedItems = storedItems.filter(item => item !== null && item !== undefined);
  updateList(storedItems);

  addButton.addEventListener("click", () => {
    const newName = itemInput.value.trim();
    const newPhone = item2Input.value.trim();
    if (newName !== "" && newPhone !== "") {
      storedItems.push({ name: newName, phone: newPhone });
      localStorage.setItem("items", JSON.stringify(storedItems));
      updateList(storedItems);
      itemInput.value = "";
      item2Input.value = "";
    }
  });
  
  
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    const filteredItems = storedItems.filter(item => {
      const itemName = item.name || ""; // Manejo de valor nulo/undefined
      const itemPhone = item.phone || ""; // Manejo de valor nulo/undefined
      return itemName.includes(searchTerm) || itemPhone.includes(searchTerm);
    });
    updateList(filteredItems);
  });

  function updateList(items) {
    contenedor.innerHTML = "";
    items.forEach((contact, index) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `
        <span class="contact-name">${contact.name}</span>
        <span class="contact-phone">${contact.phone}</span>
        <button class="btn btn-outline-danger btn-sm float-end delete-button">Borrar</button>
        <button class="btn btn-outline-primary btn-sm float-end edit-button">Editar</button>
      `;

      const deleteContactButton = li.querySelector(".delete-button");
      deleteContactButton.addEventListener("click", () => {
        storedItems.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(storedItems));
        updateList(storedItems);
      });

      const editContactButton = li.querySelector(".edit-button");
      editContactButton.addEventListener("click", () => {
        const newName = prompt("Editar nombre:", contact.name);
        if (newName !== null) {
          const newPhone = prompt("Editar teléfono:", contact.phone);
          if (newPhone !== null) {
            contact.name = newName;
            contact.phone = newPhone;
            localStorage.setItem("items", JSON.stringify(storedItems));
            updateList(storedItems);
          }
        }
      });

      contenedor.appendChild(li);
    });
  }
});
