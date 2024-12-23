const searchBar = document.querySelector(".search input"),
  searchIcon = document.querySelector(".search button"),
  usersList = document.querySelector(".users-list"),
  createGroupBtn = document.querySelector("#create-group-btn"),
  createGroupModal = document.querySelector("#create-group-modal"),
  saveGroupBtn = document.querySelector("#save-group-btn"),
  cancelGroupBtn = document.querySelector("#cancel-group-btn"),
  userListContainer = document.querySelector("#user-list");

// Función de búsqueda
searchIcon.onclick = () => {
  searchBar.classList.toggle("show");
  searchIcon.classList.toggle("active");
  searchBar.focus();
  if (searchBar.classList.contains("active")) {
    searchBar.value = "";
    searchBar.classList.remove("active");
  }
};

searchBar.onkeyup = () => {
  let searchTerm = searchBar.value;
  if (searchTerm != "") {
    searchBar.classList.add("active");
  } else {
    searchBar.classList.remove("active");
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/search.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        usersList.innerHTML = data;
      }
    }
  };
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("searchTerm=" + searchTerm);
};

// Refrescar lista de usuarios
setInterval(() => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/users.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        if (!searchBar.classList.contains("active")) {
          usersList.innerHTML = data;
        }
      }
    }
  };
  xhr.send();
}, 500);

// Funcionalidad de creación de grupos
createGroupBtn.addEventListener("click", () => {
  createGroupModal.style.display = "block";

  // Cargar usuarios
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "php/get-users.php", true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      userListContainer.innerHTML = xhr.response;
    }
  };
  xhr.send();
});

// Cerrar modal
cancelGroupBtn.addEventListener("click", () => {
  createGroupModal.style.display = "none";
});

// Guardar grupo
saveGroupBtn.addEventListener("click", () => {
  const groupName = document.querySelector("#group-name").value;
  const selectedUsers = Array.from(
    document.querySelectorAll("#user-list input[type='checkbox']:checked")
  ).map((checkbox) => checkbox.value);

  if (groupName && selectedUsers.length > 0) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/create-group.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.response === "success") {
        alert("Grupo creado con éxito.");
        createGroupModal.style.display = "none";
      } else {
        alert("Error al crear el grupo.");
      }
    };
    xhr.send(`group_name=${groupName}&user_ids=${JSON.stringify(selectedUsers)}`);
  } else {
    alert("Introduce un nombre de grupo y selecciona usuarios.");
  }
});
