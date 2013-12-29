document.addEventListener('DOMContentLoaded', function() {
  
	var 
		fullPath = document.getElementById('upload'),
		fileName = document.querySelector('.filename'),
		filenames = [];

	fullPath.addEventListener('change', function() {
		files = this.files;
		
		if (fullPath) {
			for (var i = 0; i < files.length; i++)
	    	filenames = filenames + files[i].name + '<br/>';

			fileName.innerHTML = filenames;
		}
	})

})