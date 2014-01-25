(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function() {
  
	var 
		fileInput = document.getElementById('upload'),
		fileName = document.querySelector('.filename'),
		filenames = [],
		moreButton = document.querySelector('.more-guest'),
		guests = document.querySelector('.guests');


	fileInput && fileInput.addEventListener('change', function() {
		files = this.files;

		if (fileInput) {
			for (var i = 0; i < files.length; i++)
	    	filenames = filenames + files[i].name + '<br/>';

			fileName.innerHTML = filenames;
		}
		else (
			fileName.innerHTML = "Veuillez réessayer"
		)
	})


	moreButton && moreButton.addEventListener('click', function() {
		newElement = document.getElementById('guest').cloneNode(true);
		var newElement = guests.insertBefore(newElement, moreButton).setAttribute('placeholder','Nouvel invité');
	})

})
},{}]},{},[1])