const formBokingBtn = 
bookingBtn = document.querySelector("#booking-button"),
bookingFormCloseBtn = document.querySelector("#booking-form-close-button"),
bookingContainer = document.querySelector("#booking-container");


bookingBtn.addEventListener("click", () => bookingContainer.classList.add("show"));
bookingFormCloseBtn.addEventListener("click", () => bookingContainer.classList.remove("show"));

