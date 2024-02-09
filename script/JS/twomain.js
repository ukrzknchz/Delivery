const ButtonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const ButtonAuthCancel = document.querySelector(".button-auth-cancel");
const LoginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#username");
const userhead = document.querySelector(".usernamehead");
const ButtonOut = document.querySelector(".button-Out");
const UnderModal = document.querySelector(".modal-under");
const cardsRestaurants = document.querySelector(".cards");
const containerPromo = document.querySelector(".container-pormo");
const mainGol = document.querySelector(".main-gol");
const conRest = document.querySelector(".con-rest");
const logo = document.querySelector(".logo");
const cardRest = document.querySelector(".card-rest");
const inputSearch = document.querySelector(".search-main");
const restarauntTitle = document.querySelector(".titlerest");
const cartBtn = document.querySelector('.btn2');
const korzina = document.querySelector('.korzina');
const close = document.querySelector('.close');
const korzinaBody = document.querySelector('.korzina-body');
const foodRow = document.querySelector('food-row');
const modalPrice = document.querySelector('.pricetag');
const btn2 = document.querySelector('.clearbtn');

const cart = [];

window.addEventListener('load', function() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        cart.push(...JSON.parse(cartData));
        renderCart();
    }
});

function renderCart(){
    korzinaBody.textContent = '';
    
    cart.forEach(function( { id, title, cost, count } ){
        const itemCart = `
                <div class="food-row">
                    <span class="food-name">${title}</span>
                    <strong class="food-price">${cost}</strong>
                    <div class="food-counter">
                        <button class="counter-button counter-plus" data-id=${id}>+</button>
                        <span class="counter">${count}</span>
                        <button class="counter-button counter-minus" data-id=${id}>-</button>
                    </div>
                </div>
        `;
        korzinaBody.insertAdjacentHTML('afterbegin', itemCart);
    })
    const totalPrice = cart.reduce(function(result, item){ 
        return result + (parseFloat(item.cost) * item.count); 
    }, 0)
    modalPrice.textContent = totalPrice;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function changeCount(event){
    const target = event.target;

    if(target.classList.contains('counter-button')){
        const food = cart.find(function(item){
            return item.id === target.dataset.id;
        });
        if(target.classList.contains('counter-minus')){
            food.count--;
            if(food.count === 0) {
                cart.splice(cart.indexOf(food), 1)
            }   
        }
    
        if(target.classList.contains('counter-plus')){
            const food = cart.find(function(item){
                return item.id === target.dataset.id;
            });
            food.count++;
        }
        renderCart();
    }

    
}

btn2.addEventListener('click', function(){
    cart.length = 0;
    renderCart();
})

korzinaBody.addEventListener('click', changeCount)

cartBtn.addEventListener("click", function () {
    renderCart();
    korzina.classList.add("is-open");
})

close.addEventListener("click", function (event) {
    korzina.classList.remove("is-open");
})



cardRest.addEventListener('click', addToCart);


function addToCart(event){
    const target = event.target;

    const buttonAddToCart = target.closest('.btn2-rest');

    console.log(buttonAddToCart);

    if(buttonAddToCart){
        const cardKor = target.closest('.card');
        const title = cardKor.querySelector('.p1').textContent;
        const cost = cardKor.querySelector('.price-p').textContent;
        const id = buttonAddToCart.id;

        const food = cart.find(function(item){
            return item.id === id;
        })

        if(food){
            food.count += 1;
        } else{
            cart.push({
                id: id,
                title: title,
                cost: cost,
                count: 1
            });
        }

        

        
        console.log(cart);
    }
};

inputSearch.addEventListener('keypress', function(event){

    

    if(event.charCode === 13) {
        const value = event.target.value.trim();

        if(!value){
            return;
        }
        console.log(value);
        getData('./db/partners.json')
        .then(function(data){ 
            return data.map(function(partner) {
                return partner.products;
            });
        })
        .then(function(linkProduct){
            linkProduct.forEach(function(link){
                getData(`./db/${link}`)
                    .then(function(data){
                        const resultSearch= data.filter(function(item){ 
                            return item.name.includes(value);
                         })

                        containerPromo.classList.add('hide');
                        mainGol.classList.add('hide');
                        conRest.classList.remove('hide');
                        restarauntTitle.textContent = "Результат пошуку";

                        resultSearch.forEach(createCardGood);
                    })
            })
        }) 
    }
    
})
const getData = async function(url){

    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}!`)
    }

    return await response.json();

};

getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant)
});

let login = localStorage.getItem('gloDel');
function authorized() {

    function logOut(){
        login = '';
        localStorage.removeItem('gloDel');
        
        ButtonAuth.style.display = '';
        userhead.style.display = '';
        ButtonOut.style.display = '';
        ButtonOut.removeEventListener("click", logOut);
        checkAuth();
    }
    console.log("avto");

    userhead.textContent = login;

    ButtonAuth.style.display = 'none';
    userhead.style.display = 'inline';
    ButtonOut.style.display = 'flex';

    ButtonOut.addEventListener("click", logOut);
}

function notAuthorized() {
    console.log("notavto");
    function logIn(event){
        event.preventDefault();
        if(loginInput.value.trim()) {
            login = loginInput.value;
            localStorage.setItem('gloDel', login);
            ToogleModal();
            ButtonAuth.removeEventListener("click", ToogleModal);
            ButtonAuthCancel.removeEventListener("click", ToogleModal);
            LoginForm.removeEventListener("submit", logIn);
            LoginForm.reset();
            checkAuth();
        } else {
            
            loginInput.style.border = '444px solid #ff0000';
            loginInput.value = '';
        }
        
    }

    function ToogleModal(){
        modalAuth.classList.toggle("is-open");
        UnderModal.classList.toggle("is-open");
        loginInput.style.borderColor = '';
        if (modalAuth.classList.contains("is-open")){
            disableScroll();
        } else {
            enableScroll();
        }
    }
    ButtonAuth.addEventListener("click", ToogleModal 
        // modalAuth.classList.add("is-open");
        // ToogleModal();
    )
    
    ButtonAuthCancel.addEventListener("click", ToogleModal 
        // modalAuth.classList.remove("is-open");
        // ToogleModal(;)
    )

    LoginForm.addEventListener("submit", logIn);
    UnderModal.addEventListener('click', function (event) {
        if (event.target.classList.contains('is-open')) {
            ToogleModal()
        }
    })
    

}

function checkAuth(){
    if(login){
        authorized();
        
       
    } else {
        notAuthorized();
    }
    
}


checkAuth();

function createCardRestaurant(restaraunt) {

    const {
        image,
        kitchen,
        name,
        price,
        stars,
        products,
        time_of_delivery: timeOfDelivery


    } = restaraunt;
    restarauntTitle.textContent = name;
    // console.log(image)
    
    const card = `
    <a href="restaraunt.html" data-products="${products}">
                <div class="card card1">
                    <img class="cardimg" src="${image}">
                    <div class="name-time">
                        <h3>${name}</h3>
                        <p>${timeOfDelivery} хв</p>
                    </div>
                    <div class="star-price-name">
                        <div class="star">
                            <img class="stark" src="assets/img/Vector.svg">
                            <p class="star-p">${stars}</p>
                        </div>
                        <div class="star">
                            <p class="star-p2">От ${price} грн</p>
                        </div>
                        <div class="star">
                            <img class="eclp" src="assets/img/Ellipse1.svg">
                            <p class="star-p3">${kitchen}</p>
                        </div>
                    </div>

                </div>
            </a>
    `;

    cardsRestaurants.insertAdjacentHTML('beforeend', card)
}




document.addEventListener('click', function(event) {
    const restaurantCard = event.target.closest('.card');

    if (restaurantCard) {
        const link = event.target.closest('a');
        if (link) {
            event.preventDefault(); // Предотвращение стандартного действия ссылки
            containerPromo.classList.add('hide');
            mainGol.classList.add('hide');
            conRest.classList.remove('hide');
            
            getData(`./db/${link.dataset.products}`).then(function(data){
                data.forEach(createCardGood);
            });
        }
    }
});

createCardRestaurant();
        

function createCardGood( {description,
    
    image,
    name,
    price,
    id} 
    )
    {
    const card = document.createElement('div');
    card.className = 'card cardtow wow animate__animated animate__fadeInUp';
    
    

    card.insertAdjacentHTML('beforeend',`
       
            <img class="card-image" src="${image}">
            <p class="p1">${name}</p>
            <p class="p2">${description}</p>
            <div class="cup-price">
                <button class="btn2-rest" id="${id}">В корзину<img src="assets/img/icon-container.svg"></button>
                <p class="price-p">${price} UAH</p>
            </div>
        
    `);

    cardRest.insertAdjacentElement('beforeend',card);
}

createCardGood();

cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function(){
    containerPromo.classList.remove('hide');
    mainGol.classList.remove('hide');
    conRest.classList.add('hide');
    conRest.textContent = '';
});


// function init(){
    // inputSearch.addEventListener('keypress', function(event){
    //     if(event.charCode === 13) {
    //         getData('./db/partners.json').then(function(data){ 
    //             const linkProducts = data.map(function(partner) {
    //                 return partner.products;
    //             });
    //             console.log(linkProducts);
    //         })
    //     }
        
    // })
// }

// init();
// function init() {
    
//     inputSearch.addEventListener('keypress', function(event){
//         console.log(event);
//     })

// }
// init();

new Swiper('.swiper-container',{
    sliderPerView: 1,
})


