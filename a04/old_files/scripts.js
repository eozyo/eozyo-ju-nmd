window.onload = function() { 	
	var items = [
		{ name: "regular", price: 15 },
		{ name: "medium", price: 20 },
		{ name: "large", price: 25 },
		{ name: "caffè latte", price: 30 },
		{ name: "cappucino", price: 35 },
		{ name: "mocha", price: 40 },
		{ name: "chai latte", price: 20 }
	];
	loadList(items);
}

function loadList(items) {
	console.log("Program started.\nLoading products…");
	//debugger;
	var ul = document.querySelector("#orders ul:first-of-type");	
	var li,span;
	for(var i=0; i<items.length;i++) {
		span				= document.createElement("span");
		span.id 			= "product-" + i;
		span.className		= "tag product-" + i;
		span.innerHTML		= items[i].name + " | " + items[i].price + ":-";
		span.dataset.name	= items[i].name;
		span.dataset.price  = items[i].price;
		li					= document.createElement("li");
		li.onclick			= function () { addOrder(this); }
		li.appendChild(span);
		ul.appendChild(li);
	}
	console.log("Rutine ended. Products loaded.")
	console.log(ul);
}

function addOrder(item) {
	//debugger;
	var ul 			= document.querySelector("#orders p + ul")
	var li			= item.cloneNode(true);
	var span		= li.firstChild;
	var subtotal	= document.querySelector("#orders p:first-of-type span");
	var obutton		= document.querySelector("#orders button");
	span.className	= span.id + " tag";
	span.innerHTML	= span.dataset.name + " | X";
	span.onclick	= function () { 
		//debugger;
		var removal = parseInt(subtotal.innerHTML) - parseInt(span.dataset.price);
		if(removal>0) { 
			subtotal.innerHTML = removal; 
		} else { 
			subtotal.remove();
			obutton.setAttribute("disabled","disabled");
		}
		this.parentElement.remove();
	}
	span.removeAttribute("id");
	ul.appendChild(li);
	if(!subtotal) { 
		subtotal = document.createElement("span");
		subtotal.innerHTML = span.dataset.price;
		document.querySelector("#orders p:first-of-type").appendChild(subtotal);
	} else {
		subtotal.innerHTML = parseInt(subtotal.innerHTML) + parseInt(span.dataset.price); 
	}
	if(obutton.hasAttribute("disabled")) { 
		obutton.removeAttribute("disabled");
		var totalOrdered = new Counter("#totalOrdered");
		obutton.onclick = function() { sendToBarista(ul,subtotal); totalOrdered.addition(subtotal.innerHTML); } 
	}
}

function sendToBarista(ul,subtotal) {
	//debugger;
	document.querySelector("#orders button").setAttribute("disabled","disabled");
	var bbutton = document.querySelector("#wip button");
	var span;
	while(ul.childElementCount>0) { 
		span = ul.firstChild.firstChild;
		span.onclick = null;
		span.innerHTML = span.dataset.name;
		if(document.getElementById("tempLI")) { document.getElementById("tempLI").remove(); }
		document.querySelector("#wip p+ul").appendChild(ul.firstChild);
	}
	if(bbutton.hasAttribute("disabled")) { 
		bbutton.removeAttribute("disabled"); 
		bbutton.onclick = function() { prepareDrink(this); }
	}
	subtotal.remove();
}

function prepareDrink(bbutton) {
	//debugger;
	var ul	= document.querySelector("#wip p + ul");
	if(ul.childElementCount>0) { 
		document.querySelector("#wip ul:first-of-type").appendChild(ul.firstChild);
		bbutton.innerHTML = "Serve beverage...";
		bbutton.onclick = function() { serveBeverage(this); }
	} else { console.log("function prepareDrink(else)"); }
}

function serveBeverage(bbutton) {
	var ul  = document.querySelector("#wip p + ul");
	var wip = document.querySelector("#wip ul:first-of-type");
	finish(wip.firstChild);
	bbutton.innerHTML = "Prepare beverage";
	bbutton.onclick	= function() { prepareDrink(this); } 
	if(ul.childElementCount<=0) { 
		ul.innerHTML= '<li id="tempLI"><span class="tag">Up to date</li>';
		bbutton.setAttribute("disabled","disabled"); 
	}
}

function Counter(el) {
	//debugger;
	var elm = document.querySelector(el);
	this.value		= (isNaN(parseInt(elm.innerHTML)) ? 0 : parseInt(elm.innerHTML));
	this.addition	= function(orderValue) {
		this.value = parseInt(orderValue) + this.value;
		elm.innerHTML = this.value;
	}
}

function finish(product) {
	//debugger;
	var finished = document.getElementById("finished");
	var finishedItem;
	if(finished.childElementCount==0){
		product.firstChild.dataset.count=1;
		product.firstChild.setAttribute("title", "1");
		finished.appendChild(product);
	} else {
		for(var i = 0; i<finished.childElementCount;i++){
			finishedItem = finished.children[i];
			if (product.firstChild.dataset.name == finishedItem.firstChild.dataset.name) {
				var match = finishedItem;
				break;
			} 
		}	
		if(match) {
			match.firstChild.dataset.count++;
			match.firstChild.title = match.firstChild.dataset.count;
			product.remove();
		} else {
			product.firstChild.dataset.count=1;
			product.firstChild.title=1;
			finished.appendChild(product);
		}
	}
}






