
document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("item");
    const item2Imput = document.getElementById("item2");
    const addButton = document.getElementById("agregar");
    const clearButton = document.getElementById("limpiar");
    const contenedor = document.getElementById("contenedor");
    
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    updateList(storedItems);
  
    addButton.addEventListener("click", () => {
      const newItem = itemInput.value.trim() + " " + item2Imput.value.trim();
      if (newItem !== "") {
        storedItems.push(newItem);
        localStorage.setItem("items", JSON.stringify(storedItems));
        updateList(storedItems);
        itemInput.value = ""  ;
        item2Imput.value = "" ;
      }
    });
    
    clearButton.addEventListener("click", () => {
      localStorage.removeItem("items");
      updateList([]);
    });
  
    function updateList(items) {
      contenedor.innerHTML = "";
      items.forEach(item  => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerText = item;
       
        contenedor.appendChild(li);
      });
    }
  });