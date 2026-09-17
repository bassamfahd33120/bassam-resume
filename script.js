// Burger Menu

let menuButton = document.getElementById("menuButton");
let menu = document.getElementById("menu");

menuButton.onclick = function() {
    menu.classList.toggle("show");
};


// Visitor Counter

let visitors = localStorage.getItem("visitors");

if (visitors == null) {
    visitors = 1;
} else {
    visitors++;
}

localStorage.setItem("visitors", visitors);

document.getElementById("visitorCount").textContent = visitors;


// Go To Top

let topButton = document.getElementById("topButton");

topButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};


// Contact Form

document.getElementById("contactForm").onsubmit = function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    name = name.replace(/[<>]/g, "");
    email = email.replace(/[<>]/g, "");
    phone = phone.replace(/[<>]/g, "");
    message = message.replace(/[<>]/g, "");

    document.getElementById("formResult").textContent =
        "Thank you, " + name + ". Your message was received.";
};


// Carousel

let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {

    showSlides(slideIndex += n);

}

function currentSlide(n) {

    showSlides(slideIndex = n);

}

function showSlides(n) {

    let i;

    let slides = document.getElementsByClassName("mySlides");

    let dots = document.getElementsByClassName("dot");


    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }


    for (i = 0; i < slides.length; i++) {

        slides[i].style.display = "none";

    }


    for (i = 0; i < dots.length; i++) {

        dots[i].className =
            dots[i].className.replace(" active", "");

    }


    slides[slideIndex - 1].style.display = "block";

    dots[slideIndex - 1].className += " active";

}