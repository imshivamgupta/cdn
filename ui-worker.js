console.log("Loaded", 0);

function loadCSS() {
  const stylesheet = document.createElement("link");
  stylesheet.setAttribute("rel", "stylesheet");
  stylesheet.setAttribute("type", "text/css");
  stylesheet.setAttribute(
    "href",
    "https://cdn.jsdelivr.net/gh/imshivamgupta/cdn@1.0.1/style.css"
  );
  document.head.appendChild(stylesheet);
}

loadCSS();

const ui = `
<div class="wrapper popup" id="uniqueID">
  <div class="btn btn-close" onclick="hidePopup()">
    <span>
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </span>
  </div>
  <div class="content">
    <div class="heading-title">
      <h1>Get $10 off when you sign up for</h1>
      <h1>Savings, News,Updates,and More</h1>
    </div>
    <form id="newsletter">
      <input type="text" name="name" id="" placeholder="your name"/>
      <input type="email" name="email" id="" placeholder="email address" />

      <label for="check">
        <input type="checkbox" name="check" id="check"  /> <span style="margin-left: .2rem">check this box to
        receive monthly newsletter.</span>
      </label>

      <button type="submit" class="btn btn-submit">Submit</button>
      <p class="error ">Fill email and check for newsletter. :)</p>
    </form>
    <a href="#">Privacy Policy</a>
  </div>
  <div class="figure">
    <img src="https://cdn.jsdelivr.net/gh/imshivamgupta/cdn/img.png" alt="banner" />
  </div>
</div>`;

document.body.innerHTML += ui;

const el = document.querySelector(".wrapper.popup");

const mq = window.matchMedia("(max-width: 576px)");

if (mq.matches) {
  el.classList.add("mobile");
  hidePopup();
  appearPopup();
}

function showPopup() {
  setCookie("exit-intent", false, 7);
  el.classList.remove("hide");
}

function hidePopup() {
  setCookie("exit-intent", true, 7);
  el.classList.add("hide");
}

// Cookie Manager :: StackOverflow General Code
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

// Form
const form = document.getElementById("newsletter");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const check = form.elements["check"].checked;

  if (email == "" || !check) {
    showError(email, check);
  } else {
    form.submit();
  }
});

function showError(email, check) {
  if (!email && !check) {
    form.elements["email"].classList.add("error");
    form.elements["check"].classList.add("error");
  } else if (!email) {
    form.elements["email"].classList.add("error");
  } else {
    form.elements["check"].classList.add("error");
  }
  document.querySelector("form p.error").classList.add("show");
}

function appearPopup() {
  setTimeout(() => {
    showPopup();
  }, 5000);
}
