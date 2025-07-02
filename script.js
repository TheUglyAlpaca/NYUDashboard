let timeText = "";

backgrounds = [
    'url("photo1.jpg")',
    'url("photo2.jpg")',
    'url("photo3.jpg")',
    'url("photo4.jpg")',
    'url("photo5.jpg")',
    'url("photo6.jpg")',
    'url("photo7.jpg")',
    'url("photo8.jpg")',
]

// `url("photo${n}.jpg")`

function randomizeBackground() {
    selectedImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.background = selectedImage;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    if (selectedImage == backgrounds[7]) {
        document.getElementById("buttons").classList.add("winter");
    }
}

function loadName(){
    if (localStorage.name) greeting();
    else {
        getName();
    }
}

function getName() {
    const input = document.getElementById("nameSubmit");
    const enterName = document.getElementById("enterName");
    enterName.style.display = "flex";
    input.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            localStorage.name = input.value;
            greeting();
        }
    })
}

function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    if (h > 3) {
        timeText = "Good Morning";
    }
    if (h > 12) {
        timeText = "Good Afternoon";
    }
    if (h > 17) {
        timeText = "Good Evening";
    }
    if (h > 20){
        timeText = "Good Night";
    }

    let num = h % 12;
    if (num == 0) {
        num = 1;
    }

    var time = (num) + ":" + m + ":" + s + " ";
    document.getElementById("clock").innerText = time;
    setTimeout(showTime, 1000);
}

function greeting() {
    document.body.classList.add("normal");
    enterName.style.display = "none";
    let everything = document.getElementById("everything");
    everything.style.display = "flex";
    document.getElementById("greetingname").textContent = timeText + ", " + localStorage.name;
    setTimeout(greeting, 1000);
}

function getImage() {
    const schedule_input = document.querySelector("#input_image");

    schedule_input.addEventListener("change", function () {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            document.getElementById("userImage").src = reader.result;
            localStorage.schedule = reader.result;
        });
        reader.readAsDataURL(this.files[0]);
    });
}

function loadSchedule() {
    if (localStorage.schedule) document.querySelector("#userImage").src = localStorage.schedule;
    else {
        document.querySelector("#userImage").src = "scheduleBlank.png";
    }
}

function modal() {
    // Get the modal
    let modal = document.getElementById("scheduleWindow");
    let image = document.getElementById("userImage");

    // Get the button that opens the modal
    var btn = document.getElementById("schedule");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "flex";
        modal.style.animation = "leftSlide 0.5s forwards";
        btn.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.animation = "rightSlide 0.5s forwards";
        btn.style.display = "flex";
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }

    // When the user clicks anywhere inside of the modal, close it
    window.onclick = function (event) {
        if (event.target == image) {
            modal.style.animation = "rightSlide 0.4s forwards";
            btn.style.display = "flex";
            setTimeout(() => {
                modal.style.display = "none";
            }, 400);
        }
    }
}

function funLinks() {
    // Get the modal
    let funLinks = document.getElementById("funLinksWindow");

    // Get the button that opens the modal
    var btn = document.getElementById("otherPanel");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        funLinks.style.display = "flex";
        funLinks.style.animation = "leftSlide 0.5s forwards";
        btn.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        funLinks.style.animation = "rightSlide 0.5s forwards";
        btn.style.display = "flex";
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }

    // When the user clicks anywhere inside of the modal, close it
    window.onclick = function (event) {
        if (event.target == image) {
            modal.style.animation = "rightSlide 0.4s forwards";
            btn.style.display = "flex";
            setTimeout(() => {
                modal.style.display = "none";
            }, 400);
        }
    }
}

window.onload = function () {
    randomizeBackground();
    showTime();
    getImage();
    loadSchedule();
    modal();
    loadName();
}