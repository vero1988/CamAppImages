window.onload = function() {
    
    if( !window.MozActivity ) {
        alert('This environment does not support Web Activities.\nSorry about that :-(\nMaybe try it on Firefox OS?');
        return;
    }

	var pickImage = document.querySelector("#pick-image");
	
    if (pickImage) {
        pickImage.onclick = function () {
            var pick = new MozActivity({
                name: "pick",
                data: {
                    type: ["image/png", "image/jpg", "image/jpeg"]
	}
            });

            pick.onsuccess = function () {
                var img = document.createElement("img");
                img.src = window.URL.createObjectURL(this.result.blob);
                var imagePresenter = document.querySelector("#image-presenter");
                imagePresenter.appendChild(img);
                imagePresenter.style.display = "block";
            };

            pick.onerror = function () {
                alert("Can't view the image!");
            };
        }
    }
	
}();												

