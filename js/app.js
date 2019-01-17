// filter buttons

(() => {
    const filterBtn = document.querySelectorAll('.filter-btn');

    filterBtn.forEach(btn => {

        btn.addEventListener('click', event => {
            event.preventDefault();
            const value = event.target.dataset.filter;

            const items = document.querySelectorAll('.store-item');
            console.log(items);

            items.forEach(item => {
                if (value === 'all') {

                    item.style.display = 'block';
                }
                else {

                    if(value === item.dataset.item) {
                        // if(item.classList.contains(value))
                        item.style.display = 'block';
                    } else {

                        item.style.display = 'none';
                    }
                }
            });

        });
    });


})();

// search input

(() => {

    const searchInput = document.querySelector('#search-item');
    const items = document.querySelectorAll('.store-item');

    searchInput.addEventListener('input', inputElem => {

        let value = inputElem.target.value.toLowerCase().trim();
        
        items.forEach(item => {
            let type = item.dataset.item;
            
            let valLength = value.length;

            let match = type.slice(0, valLength);

            if (value === match) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

})();

//modal 

(() => {

    let imgArray = [];
    let counter = 0;
    
    const images = document.querySelectorAll('.store-img');

    const modal = document.querySelector('.lightbox-container');
    const closeBtn = document.querySelector('.fa-window-close');
    const imgContainer = document.querySelector('.lightbox-item');
    const btnLeft = document.querySelector('.btnLeft');
    const btnRight = document.querySelector('.btnRight');

    images.forEach(img => {
        imgArray.push(img.getAttribute('src'));
    });

    const showImage = counter => {
        imgContainer.style.backgroundImage = `url('${imgArray[counter]}')`;
    }

    
    images.forEach(img => {
        img.addEventListener('click', () => {

            modal.style.display = 'block';
            
            for(let index in imgArray) {
                if(img.getAttribute('src') === imgArray[index])
                counter = index;
            }

            showImage(counter);

            btnLeft.addEventListener('click', () => {
                counter++;
                if(counter > imgArray.length - 1) {
                    counter = 0;
                };
                showImage(counter);
            });

            btnRight.addEventListener('click', () => {
                counter--;
                if(counter < 0) {
                    counter = imgArray.length - 1;
                };
                showImage(counter);
            });

            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

        });
    })
})();


(() => {
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', () => {
        cart.classList.toggle('show-cart');
    })
})();

(() => {

    const cartBtn = document.querySelectorAll('.store-item-icon');
    const cartContainer = document.querySelector('#cart');
    const priceCartContainer = document.querySelector('.cart-total-container');
    const itemCount = document.querySelector('#item-count');

    let counter = 0;
    let totalPrice = 0;

    const createDiv = ({img, name, price}) => {
        const cartItem = document.createElement('div');
        cartItem.setAttribute('class', 'cart-item d-flex justify-content-between text-capitalize my-3');
        cartItem.insertAdjacentHTML('beforeend', `
        <img src="${img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="cart-item-text">

            <p id="cart-item-title" class="font-weight-bold mb-0">${name}</p>
            <p id="cart-item-price" class="mb-0">${price} $</p>
            </div>
        <a href="#" id='cart-item-remove' class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </a>`);

        return cartItem;
    }

    const showItemsCount = (counter, totalPrice) => {
        
        let itemsCount = (+counter === 1) ? 'item' : 'items';

        itemCount.innerHTML = `${counter} </span> ${itemsCount} - $<span class="item-total">${totalPrice}</span>`
    }

    const showTotal = () => {

        const total = [];

        const items = document.querySelectorAll('#cart-item-price');
        const cartTotal = document.querySelector('#cart-total');


        items.forEach(item => {
            total.push(+item.textContent.slice(0 , item.textContent.length - 2));
        });

        if(total.length !== 0) {

            const totalPrice = total.reduce((accum, currentValue) => accum + currentValue);

            cartTotal.textContent = totalPrice;

        } else {
            cartTotal.textContent = totalPrice;
        }

    }

    showTotal();
    showItemsCount(counter, totalPrice);

    cartBtn.forEach( btn => {
        btn.addEventListener('click', event => {

            if(event.target.classList.contains('fa-shopping-cart')) {

                let fullPath = event.target.parentElement.previousElementSibling.src;

                let pos = fullPath.indexOf('img');

                let imagePath = fullPath.slice(pos + 3);

                let img = `img-cart${imagePath}`;
                let name =
                    event.target.parentElement.parentElement.nextElementSibling
                .children[0].children[0].textContent;

                let price = 
                    event.target.parentElement.parentElement.nextElementSibling
                .children[0].children[1].textContent.slice(2);

                totalPrice += +price;

                cartContainer.insertBefore(createDiv({img, name, price}), priceCartContainer);
                
                counter++;

                showItemsCount(counter, totalPrice);

                showTotal();

            }
        });
    });


})();