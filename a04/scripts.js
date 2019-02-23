/**
*
*  title	: JavaScript Lab 04, Client-side Programming I && II
*  author	: orem18kz
*  email	: orem18kz[@]student,ju,se
*
*/
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
	var ul = document.querySelector("#orders ul:first-of-type");
	var li,span;
	for(var i=0; i<items.length;i++) {
		span				= document.createElement("span");
		span.id 			= "product-" + i;
		span.className		= "tag " + span.id;
		span.innerHTML		= items[i].name + " | " + items[i].price + ":-";
		span.dataset.name	= items[i].name;
		span.dataset.price  = items[i].price;
		li					= document.createElement("li");
		li.onclick			= function () { addOrder(this); }
		li.appendChild(span);
		ul.appendChild(li);
	}
}
function addOrder(items) {
	var ul 			= document.querySelector("#orders p + ul")
	var li			= items.cloneNode(true);
	var span		= li.firstChild;
	var span_sale	= new TrackIncome(document.querySelector("#orders p:first-of-type span"),span.dataset.price);
	var obutton		= document.querySelector("#orders button");
	span.innerHTML	= span.dataset.name + ' <span class="remove-tag">×</span>';
	span.onclick	= function () { removeOrder(this,(parseInt(span_sale.elm.innerHTML) - parseInt(span.dataset.price)),span_sale,obutton); }

	span.removeAttribute("id");
	ul.appendChild(li);
	if(obutton.hasAttribute("disabled")) {
		obutton.removeAttribute("disabled");
		obutton.onclick = function() { span_sale.record(ul.children); sendToBarista(ul,span_sale); }
	}
}
function removeOrder(span,residual,span_sale,obutton) {
	if(residual>0) { span_sale.elm.innerHTML = residual; }
	else { span_sale.elm.remove(); obutton.setAttribute("disabled","disabled"); }
	span.parentElement.remove();
}
function sendToBarista(ul,span_sale) {
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
	span_sale.elm.remove();
}
function prepareDrink(bbutton) {
	var ul		= document.querySelector("#wip p + ul");
	var ul_qb	= document.querySelector("#wip ul:first-of-type");
	switch(true) {
		case (ul.childElementCount  > 0 && ul_qb.childElementCount == 0):
			ul_qb.appendChild(ul.firstChild);
			bbutton.innerHTML = "Serve beverage…";
		break;
		case (ul.childElementCount >= 0 && ul_qb.childElementCount == 1):
			finish(ul_qb.firstChild);
			if (ul.childElementCount > 0) {
				bbutton.innerHTML = "Prepare next beverage…";
			}
			if(ul.childElementCount == 0 && ul_qb.childElementCount==0 ) {
				ul.innerHTML= '<li id="tempLI"><span class="tag">Up2date</li>';
				bbutton.innerHTML = "Prepare beverage";
				bbutton.setAttribute("disabled","disabled");
			}
		break;
	}
}
function finish(li) {
	var finished = document.getElementById("finished");
	if(finished.childElementCount==0){
		li.firstChild.dataset.count=1;
		li.firstChild.title=1;
		finished.appendChild(li);
	} else {
		for(var i=0;i<finished.childElementCount;i++){
			var finishedItem = finished.children[i];
			if(li.firstChild.dataset.name == finishedItem.firstChild.dataset.name) {
				var match = finishedItem; break;
			}
		}
		if(match) {
			match.firstChild.dataset.count++;
			match.firstChild.title = match.firstChild.dataset.count;
			li.remove();
		} else {
			li.firstChild.dataset.count=1;
			li.firstChild.title=1;
			finished.appendChild(li);
		}
	}
}
function TrackIncome($el,$amt) {
	var sales = document.getElementById("sales");
	if($el){ $el.innerHTML = parseInt($el.innerHTML) + parseInt($amt); }
	else {
		$el = document.createElement("span"); $el.innerHTML = $amt;
		document.querySelector("#orders p:first-of-type").appendChild($el);
	}
	this.elm 			= $el;
	this.currentTotal 	= (isNaN(parseInt(sales.innerHTML)) ? 0 : parseInt(sales.innerHTML));
	this.record 		= function(items) {
		sales.innerHTML 	= (this.currentTotal + parseInt($el.innerHTML));
		sales.style.display	= "inline";
		// saves the sales into a global object "summary"
		var order = { items : [], total : null, };
		for(var i=0;i<items.length;i++) {
			order.items[i] = { name : items[i].firstChild.dataset.name, price : +items[i].firstChild.dataset.price }
			order.total = +order.total + order.items[i].price;
		}
		// Call "summary" to see all the available data.
		if(window.summary) {
			summary.totalOrders++;
			summary.orders.push({ items: order.items, total: +order.total});
			summary.totalItems = summary.totalItems + order.items.length;
			summary.total		 = summary.total + order.total;
		} else {
			window.summary = {
				totalOrders : 1,
				totalItems	: +order.items.length,
				total		: +order.total,
				orders		: [{ items: order.items, total: order.total}]
			}
		}
	}
}
/* Helper functions */
function _random($lowerLimit,$higherLimit) { var random = Math.floor((Math.random()*$higherLimit)+$lowerLimit); return random; }
function _(str) { console.log(str); }
