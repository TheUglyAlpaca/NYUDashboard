let timeText = "";

backgrounds = [
    'url("photo1.jpeg")',
    'url("photo2.jpeg")',
    'url("photo3.jpeg")',
    'url("photo4.jpeg")',
    'url("photo5.jpg")',
    'url("photo6.jpg")',
    'url("photo7.jpg")',
    'url("photo8.jpg")',
]

// Randomly pick and set a background image
function randomizeBackground() {
    selectedImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.background = selectedImage;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    if (selectedImage == backgrounds[6]) {
        document.getElementById("buttons").classList.add("winter");
    }
}

// Hide logos, sidebar, and buttons before name is entered
function hideUIBeforeName() {
    const logos = document.getElementById("logos");
    const sidebar = document.getElementById("sidebar");
    const buttons = document.getElementById("buttons");
    if (logos) logos.style.display = "none";
    if (sidebar) sidebar.style.display = "none";
    if (buttons) buttons.style.display = "none";
}

// Show logos, sidebar, and buttons after name is entered
function showUIAfterName() {
    const logos = document.getElementById("logos");
    const sidebar = document.getElementById("sidebar");
    const buttons = document.getElementById("buttons");
    if (logos) logos.style.display = "block"; // or "flex" depending on your layout
    if (sidebar) sidebar.style.display = "block";
    if (buttons) buttons.style.display = "flex";
}

// Load name or ask for it if none saved
function loadName() {
    if (localStorage.name) {
        greeting();
    } else {
        getName();
        hideUIBeforeName();
    }
}

// Get name from input, save, then greet
function getName() {
    const input = document.getElementById("nameSubmit");
    const enterName = document.getElementById("enterName");
    enterName.style.display = "flex";
    input.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            localStorage.name = input.value.trim();
            if(localStorage.name) {
                greeting();
            }
        }
    })
}

// Show clock and update greeting message according to time
function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    // Fix greeting logic order:
    if (h >= 21 || h <= 3) {
        timeText = "Good Night";
    } else if (h > 17) {
        timeText = "Good Evening";
    } else if (h > 12) {
        timeText = "Good Afternoon";
    } else {
        timeText = "Good Morning";
    }

    let num = date.getHours() % 12;
    if (num === 0) {
        num = 12;
    }

    var time = num + ":" + m + ":" + s + " ";
    document.getElementById("clock").innerText = time;
    setTimeout(showTime, 1000);
}

// Show greeting and reveal UI
function greeting() {
    document.body.classList.add("normal");
    const enterName = document.getElementById("enterName");
    enterName.style.display = "none";

    let everything = document.getElementById("everything");
    if (everything) everything.style.display = "flex";

    showUIAfterName();

    const greetingNameElem = document.getElementById("greetingname");
    if (greetingNameElem) greetingNameElem.textContent = timeText + ", " + localStorage.name;
}

// Load user image from file input
function getImage() {
    const schedule_input = document.querySelector("#input_image");

    if(!schedule_input) return;

    schedule_input.addEventListener("change", function () {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            document.getElementById("userImage").src = reader.result;
            localStorage.schedule = reader.result;
        });
        reader.readAsDataURL(this.files[0]);
    });
}

// Load saved schedule image or default blank
function loadSchedule() {
    const userImage = document.querySelector("#userImage");
    if (!userImage) return;

    if (localStorage.schedule) userImage.src = localStorage.schedule;
    else userImage.src = "scheduleBlank.png";
}

// Modal handling for schedule window
function modal() {
    let modal = document.getElementById("scheduleWindow");
    let image = document.getElementById("userImage");
    var btn = document.getElementById("schedule");
    var span = modal ? modal.querySelector(".close") : null;

    if (!modal || !btn || !span) return;

    btn.onclick = function () {
        modal.style.display = "flex";
        modal.style.animation = "leftSlide 0.5s forwards";
        btn.style.display = "none";
    }

    span.onclick = function () {
        modal.style.animation = "rightSlide 0.5s forwards";
        btn.style.display = "flex";
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }

    window.onclick = function (event) {
        if (event.target === image) {
            modal.style.animation = "rightSlide 0.4s forwards";
            btn.style.display = "flex";
            setTimeout(() => {
                modal.style.display = "none";
            }, 400);
        }
    }
}

// Fun links modal (fixed, was incomplete)
function funLinks() {
    let funLinksModal = document.getElementById("funLinksWindow");
    var btn = document.getElementById("otherPanel");
    var span = funLinksModal ? funLinksModal.querySelector(".close") : null;

    if (!funLinksModal || !btn || !span) return;

    btn.onclick = function () {
        funLinksModal.style.display = "flex";
        funLinksModal.style.animation = "leftSlide 0.5s forwards";
        btn.style.display = "none";
    }

    span.onclick = function () {
        funLinksModal.style.animation = "rightSlide 0.5s forwards";
        btn.style.display = "flex";
        setTimeout(() => {
            funLinksModal.style.display = "none";
        }, 500);
    }

    window.onclick = function (event) {
        if (event.target === funLinksModal) {
            funLinksModal.style.animation = "rightSlide 0.4s forwards";
            btn.style.display = "flex";
            setTimeout(() => {
                funLinksModal.style.display = "none";
            }, 400);
        }
    }
}

// On page load
window.onload = function () {
    if (!localStorage.name) {
        hideUIBeforeName();
    }

    randomizeBackground();
    showTime();
    getImage();
    loadSchedule();
    modal();
    funLinks();
    loadName();
}
