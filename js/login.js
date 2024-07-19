const form = document.querySelector(".form");
const username = document.querySelector(".username");
const password = document.querySelector(".password");

const API_URL = "https://api.escuelajs.co/api/v1";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = {
    username: username.value,
    password: password.value,
  };
  singIn(user);
});
async function singIn(user) {
  await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Authorization: "Bearer {your access token}",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(`res>>>`, res);
      if (res.massage === "Unauthorized") {
        return alert("username or password is incorrect");
      }
      localStorage.setItem("x-auth-token", res.token);
      window.open("./pages/home.html", "_self")
    })
    .catch((err) => console.error(`err>>>`, err));
}
