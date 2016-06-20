var d = document,
    itemBox = d.querySelectorAll('.product_list_item'), // блок каждого товара
		cartCont = d.querySelector('.basket'); // блок вывода данных корзины
// Функция кроссбраузерная установка обработчика событий
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}
// Получаем данные из LocalStorage
function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}

function addToCart(e){
	//this.disabled = true; // блокируем кнопку на время операции с корзиной
	var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
			parentBox = this.parentNode, // родительский элемент кнопки &quot;Добавить в корзину&quot;
			itemId = this.getAttribute('data-id'), // ID товара
			itemTitle = parentBox.querySelector('.product_title').innerHTML, // название товараproduct_img_first
			itemImg = parentBox.querySelector('.product_img_first').innerHTML,
			itemPrice = parentBox.querySelector('.price').innerHTML,
			itemVid = parentBox.querySelector('.item_vid').innerHTML,// вид товара
			itemCount= parentBox.querySelector('.item_count').innerHTML;
			itemDes = parentBox.querySelector('.product_des').innerHTML,
			itemCount2= Number(itemCount);
	if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
		cartData[itemId][2] += itemCount2;
		cartData[itemId][3] = itemVid;
	} else { // если товара в корзине еще нет, то добавляем в объект
		cartData[itemId] = [ itemTitle, itemPrice, itemCount2, itemVid, itemImg, itemDes ];
	}
	var count = itemCount2;
	var counts1 = Number($('.counts2').html());
	if(counts1 > 0){
		var counte=counts1 + count;
		$('.counts2').html(counte);
	}else{
	$('.counts2').html(count)
	}
	var product_count = $('.counts2').html();
	localStorage.setItem("product_count", product_count);
	// Обновляем данные в LocalStorage
	if(!setCartData(cartData)){ 
		this.disabled = false; // разблокируем кнопку после обновления LS
		d.querySelector('.add_item').innerHTML = ' добавлено ';
		setTimeout(function(){
			d.querySelector('.add_item').innerHTML = 'В корзину';
		}, 1000);
	}
	return false;
	
}



$('.counts2').html(localStorage.getItem("product_count"));



// Открываем корзину со списком добавленных товаров


var cartData = getCartData(), // вытаскиваем все данные корзины
	totalItems = '';
	console.log(JSON.stringify(cartData));
	// если что-то в корзине уже есть, начинаем формировать данные для вывода
	if(cartData !== null){
	for(var items in cartData){
			totalItems += '<li class="basket_list">';
			totalItems += '<div class="product_img_first img fl_l">' + cartData[items][4] + '</div>';
			totalItems += '<div class="product_title_second">' + cartData[items][0] + '</div>';
			totalItems += '<div class="price">Цена	' + cartData[items][1] + '</div>';
			totalItems += '<p class="des_product">' + cartData[items][5] + '</p>';
			totalItems += '<div class="colichestvo_vid"> Количества';
			totalItems += '<div class="col">' + cartData[items][2] + '</div>';
			totalItems += '<div class="vid_basket">' + cartData[items][3] + '</div>';
			totalItems += '</div>';
			
			totalItems += '</li>';
		}
		cartCont.innerHTML = totalItems;
	}
		
		else {
		// если в корзине пусто, то сигнализируем об этом
		cartCont.innerHTML = 'В корзине пусто!';
	}

// Устанавливаем обработчик события на каждую кнопку &quot;Добавить в корзину&quot;
for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}

/* Очистить корзину */
addEvent(d.getElementById('destroy_basket'), 'click', function(e){
	var test = d.getElementById('destroy_basket');
	localStorage.removeItem('cart');
	localStorage.removeItem("product_count");
	setTimeout(function(){
			location.reload();
		}, 1000);

	cartCont.innerHTML = 'Корзина очишена.';	
});

/*addEvent(itemBox[i].querySelector('.xz'), 'click', addToCart);
addEvent(d.querySelector('xz'), 'click', function(e){
	localStorage.removeItem('cart',);
	cartCont.innerHTML = 'Корзина очишена.';	
});*/
