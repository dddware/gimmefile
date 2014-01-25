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