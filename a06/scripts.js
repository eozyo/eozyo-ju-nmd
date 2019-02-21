/* (c) 2019. orem18kz[@]student.ju.se */
window.onload = function() { 	
	var items = [
		{	artistName	  	: "Sir Mix-A-Lot",
			songTitle	  	: "Baby Got Back",
			backgroundURL	: "https://nmd.eozyo.info/js/a05/img/smal-baby-got-back.jpg",
			youtubeEmbedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/_JphDdGV2TU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
		},
		{	artistName	  	: "Queen",
			songTitle	  	: "Under Pressure",
			backgroundURL	: "https://nmd.eozyo.info/js/a05/img/queen-under-pressure.jpg",
			youtubeEmbedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/gRfgpuPNMPk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
		},
		{	artistName	  	: "Usher",
			songTitle	  	: "Yeah!",
			backgroundURL	: "https://nmd.eozyo.info/js/a05/img/usher-yeah.jpg",
			youtubeEmbedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/-ckqvgc3es8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
		},
		{	artistName	  	: "Marlene Johnson",
			songTitle	  	: "Like a Virgin",
			backgroundURL	: "https://nmd.eozyo.info/js/a05/img/marlene-johnson-like-a-virgin.jpg",
			youtubeEmbedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zgUr_WrLcVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
		},
		{	artistName	  	: "Patrice",
			songTitle	  	: "Solstorm",
			backgroundURL	: "https://nmd.eozyo.info/js/a05/img/patrice-soulstorm.jpg",
			youtubeEmbedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/LnmSSkNLYhs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
		}
	];
	var jukebox = new Jukebox(items);
}
function Jukebox(items){
	this.playList 	= items;
	this.bkgd		= document.getElementById("performer");
	this.video		= document.getElementById("video");
	this.ctrl		= document.getElementById("controls");
	this.loadList 	= function() {
		if(this.video.childElementCount==0) {
			this.video.innerHTML = this.playList[0].youtubeEmbedCode.trim() + "<h4>" + this.playList[0].artistName.trim() + "</h4>" + "<h5>" + this.playList[0].songTitle.trim() + "</h5>";
			this.bkgd.style.backgroundImage="url("+this.playList[0].backgroundURL+")";
			this.doButtons(this.playList);
		} 
	}
	this.doButtons = function(submitted) {
		var that 	= this;
		var addSong	= document.createElement("button");
		if(this.ctrl.childElementCount==0) {
			var h3 	= document.createElement("h3"); h3.innerText="Playlist"; this.ctrl.appendChild(h3);
			for(var i=0; i<submitted.length; i++) {
				var play = document.createElement("button");
				if(i==0) play.setAttribute("disabled","disabled");
				play.setAttribute("id","artist-"+i);
				play.setAttribute("data-index",i);
				play.onclick	= function() { that.loadSong(that.playList[this.dataset.index],this.dataset.index); }
				play.innerHTML	= submitted[i].artistName;
				this.ctrl.appendChild(play);
			}
			addSong.setAttribute("id","add");
			addSong.onclick	= function() { that.addSong(); }
			addSong.innerHTML = "Add Song";
			this.ctrl.insertAdjacentElement('afterend',(addSong));
		}
	}
	this.loadSong = function(item,i) {
		var that = this;
		var disabled = document.querySelector('[disabled="disabled"]');
		if(disabled) { disabled.removeAttribute("disabled"); }
		this.video.innerHTML = item.youtubeEmbedCode.trim();
		document.getElementById("artist-"+ i).setAttribute("disabled","disabled");
		this.video.firstChild.insertAdjacentHTML('afterend',"<h4>" + item.artistName.trim() + "</h4>" + "<h5>" + item.songTitle.trim() + "</h5>");
		this.bkgd.style.backgroundImage="url("+this.playList[i].backgroundURL+")";
	}
	this.addSong = function() {
		var that 				= this;
		var newButton 			= document.createElement("button");
		var newSong 			= {	};
		newSong.artistName		= prompt("Enter the artist's name:").trim();
		newSong.songTitle		= prompt("Enter the song title:").trim();
		newSong.backgroundURL 	= prompt("Enter the URL to the performer's image:").trim();
		newSong.youtubeEmbedCode= prompt("Enter the youtube embed code:").trim();
		newButton.onclick		= function() { that.loadSong(that.playList[this.dataset.index],this.dataset.index); }
		newButton.innerHTML 	= newSong.artistName;
		newButton.setAttribute("id","artist-"+ this.playList.length);
		newButton.setAttribute("data-index",this.playList.length);
		this.playList.push(newSong);
		this.ctrl.appendChild(newButton);
		this.loadSong(newSong,this.playList.length-1);
	}
	this.loadList();
}