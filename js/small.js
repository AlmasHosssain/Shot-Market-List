
const search = (()=>{

	let $ = (container) =>{
		return document.querySelector(container);
	}
	let al = (container) =>{
		return document.querySelectorAll(container);
	}

	let btnSelect = al('.filter-btn');
	//console.log(btnSelect);

	btnSelect.forEach((element)=>{
		element.addEventListener('click',(event)=>{
			event.preventDefault();
			let value =event.target.dataset.filter;
			//console.log(value);

			let kip = al('.store-item');
			//console.log(kip);

			kip.forEach((item)=>{
				if (value === 'all') {
					item.style.display = 'block';
				}
				else{
					if(item.classList.contains(value)){
						item.style.display = 'block';
					}
					else{
						item.style.display = 'none';
					}
				}
			})
		})
	})

})();


const searchBox = (()=>{

	let $ = (container) =>{
		return document.querySelector(container);
	}
	let al = (container) =>{
		return document.querySelectorAll(container);
	}

	let sek = $('#search-item');
	sek.addEventListener('keyup',(event)=>{
		let get = sek.value.toLowerCase().trim();
		//console.log(get);

		let dhor = al('.store-item');
		dhor.forEach((item)=>{
			let kop = item.dataset.item;

			let length = get.length;
			let match = kop.slice(0,length);

			if(get === match){
				item.style.display = 'block';
			}
			else{
				item.style.display = 'none';
			}
		})

	})

})();



const addition = (()=>{
	let $ = (container) =>{
		return document.querySelector(container);
	}
	let al = (container) =>{
		return document.querySelectorAll(container);
	}

	let imageList = [];
	let counter = 0;

	let images = al('.store-img');
	let container = $('.lightbox-container');
	let item = $('.lightbox-item');
	let  close = $('.lightbox-close');
	let leftBtn = $('.btnLeft');
	let rightBtn = $('.btnRight');


	images.forEach((image)=>{
		imageList.push(image.src);
		image.addEventListener('click',(event)=>{
			container.classList.add('show');

			let get = event.target.src;
			//console.log(get);
			item.style.backgroundImage = `url(${get})`;

			counter = imageList.indexOf(get);
			//console.log(counter);
		})
	})

	//console.log(imageList);


	close.addEventListener('click',(event)=>{
		container.classList.remove('show');
	})

	leftBtn.addEventListener('click',()=>{
		counter--;
		if(counter < 0){
			counter = imageList.length - 1;
		}

		item.style.backgroundImage = `url(${imageList[counter]})`;
	})


	rightBtn.addEventListener('click',()=>{
		counter++;
		if(counter > imageList.length - 1){
			counter = 0;
		}

		item.style.backgroundImage = `url(${imageList[counter]})`;
	})

})();


const clk = (()=>{

	let $ = (container) =>{
		return document.querySelector(container);
	}
	let al = (container) =>{
		return document.querySelectorAll(container);
	}

	let cartInfo = $('#cart-info');
	//console.log(cartInfo);
	let cart = $('#cart');

	cartInfo.addEventListener('click',()=>{
		cart.classList.toggle("show-cart");
	})

})();

const artBox = (()=>{

	let $ = (container) =>{
		return document.querySelector(container);
	}
	let al = (container) =>{
		return document.querySelectorAll(container);
	}

	let creatBtn = al('.store-item-icon');
	//console.log(creatBtn);

	creatBtn.forEach((btn)=>{
		btn.addEventListener('click',(event)=>{
			if(event.target.parentElement.classList.contains("store-item-icon")){
				let fullpath = event.target.parentElement.previousElementSibling.src;
				let pos = fullpath.indexOf("image")+5;
				let partImgPath = fullpath.slice(pos);

				let item = {};
				item.img = `img-cart(${partImgPath})`;

				let name = event.target.parentElement.
				parentElement.nextElementSibling.children[0].children[0];

				item.name = name;

				let price = event.target.parentElement.
				parentElement.nextElementSibling.children[0].children[1];

				let finalPrice = price.slice(1).trim()
				item.price = finalPrice;


				const createItem = document.createElement('div')
				createItem.classList.add(
					"cart-item","d-flex","justify-content-between", 
					"text-capitalize","my-3"
					);
				createItem.innerHTML = `
					img src="${item.img}" 
					class="img-fluid rounded-circle" id="item-img" alt="">
          			  <div class="item-text">
             			<p id="cart-item-title"
             			 class="font-weight-bold mb-0">${item.name}</p>
             			<p id="cart-item-price" class="mb-0">${item.price}</p>
            			</div>
            			<a href="#" id='cart-item-remove' class="cart-item-remove">
           				   <i class="fas fa-trash"></i>
           				 </a>
           			</div>
				`;

				let insertCar = $('.cart');
				let before = $('.cart-total-container')
				insertCar.insertBefore(createItem,before);
				alert("Are You want to add this??");

				showPrice();
			}
		})
	})

	let showPrice =()=>{
		let total = [];
		let priceSelector = al('.cart-item-price');

		priceSelector.forEach((element)=>{
			total.push(parseFloat(element.textContent))
		})

		let takePrice = total.reduce((total,element)=>{
			total += element;
			return total;
		},0)

		let finalMoney = takePrice.toFixed(2);

		$('#cart-total').textContent = finalMoney;
		$('.item-total').textContent = finalMoney;
		$('#item-count').textContent = total.length;
	}

})();