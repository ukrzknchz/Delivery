const cartBtn = document.querySelector('.btn2');
const korzina = document.querySelector('.korzina');
const close = document.querySelector('.close');


cartBtn.addEventListener("click", function (event) {
    korzina.classList.add("is-open");
})

close.addEventListener("click", function (event) {
    korzina.classList.remove("is-open");
})


new WOW().init();



console.log("hellp");

// cartBtn.addEventListener("click", toggleModal);
// close.addEventListener("click", toggleModal);


// function toggleModal(){
//     korzina.classList.toogle("is-open");
// }