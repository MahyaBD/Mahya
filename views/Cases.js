const formBokingBtn = 
bookingBtn = document.querySelector("#booking-button"),
bookingFormCloseBtn = document.querySelector("#booking-form-close-button"),
Container = document.querySelector(".container");


bookingBtn.addEventListener("click", () => Container.classList.add("show"));
bookingFormCloseBtn.addEventListener("click", () => Container.classList.remove("show"));