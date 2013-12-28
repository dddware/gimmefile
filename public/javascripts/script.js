var 
	fullPath = document.getElementById('upload'),
	fileName = document.querySelector('.filename');

fullPath.addEventListener('change', function() {
	fullPath = this.value;
	if (fullPath) {
		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		var filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}
		fileName.innerHTML = filename;
	}
})