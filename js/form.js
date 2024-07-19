document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const inputName = document.querySelector(".input__name");
  const inputUser = document.querySelector(".input__username");
  const inputEmail = document.querySelector(".input__email");
  const inputPhone = document.querySelector(".input__phoneNum");
  const inputPassword = document.querySelector(".input__password");
  const inputConfirm = document.querySelector(".input__confirm");
  const tableBody = document.querySelector(".tbody");
  // const logOut = document.querySelector(".log-out");

  
  
  let users = JSON.parse(localStorage.getItem("users")) || [];

  function renderTable() {
    tableBody.innerHTML = "";
    users.forEach((user, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td><a href="mailto:${user.email}">${user.email}</a></td>
                <td><a href="tel:${user.phone}">${user.phone}</a></td>
                <td>${user.password}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;

      tableBody.appendChild(tr);
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      !inputName.value.trim() ||
      !inputUser.value.trim() ||
      !inputEmail.value.trim() ||
      !inputPhone.value.trim() ||
      !inputPassword.value.trim() ||
      !inputConfirm.value.trim()
    ) {
      return alert("Please fill in all fields");
    }

    if (inputPassword.value !== inputConfirm.value) {
      return alert("Passwords do not match");
    }

    const newUser = {
      name: inputName.value,
      username: inputUser.value,
      email: inputEmail.value,
      phone: inputPhone.value,
      password: inputPassword.value,
    };

    users.push(newUser);
    saveToLocalStorage();
    renderTable();

    form.reset();
  });

  tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const index = event.target.getAttribute("data-index");
      users.splice(index, 1);
      saveToLocalStorage();
      renderTable();
    }
  });

  // Initial render
  renderTable();
});
