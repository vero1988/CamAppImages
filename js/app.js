window.onload = function() {
    
    if( !window.MozActivity ) {
        //alert('This environment does not support Web Activities.\nSorry about that :-(\nMaybe try it on Firefox OS?');
		alert('Este entorno no admite Actividades Web, por favor emplea Firefox OS. \n\nPerdona las molestias causadas.');
		
        return;
    }

	var pickImage = document.querySelector("#pick-image");
	
    if (pickImage) {
        pickImage.onclick = function () {
		
		//$("#pick-image").click(function(){
		
            var pickImageActivity = new MozActivity({
                name: "pick",
                data: {
                    type: ["image/png", "image/jpg", "image/jpeg"]
				}
            });

            pickImageActivity.onsuccess = function () {
               //Create the element via jQuery
			   var imageElement = $('<img id="image1" height="350" width="290">'); // Antes a 400 y 300; Como puedo coger el tamaño de la imagen pero redimensionada con menos zoom.
			   imageElement.attr('src', window.URL.createObjectURL(this.result.blob));
			   $("#pickImage").html(imageElement);

			   //Switch to the #pageid = showImage
			   $.mobile.changePage ($("#showImage"));
            };

            pickImageActivity.onerror = function () {
                alert("No se puede mostrar la imagen");
				console.log(this.result);
            };
        }
    }
	
}();
	

$("#btnSave").click(function(){
	alert("Se ha pulsado el boton de guardar");
	//alert("La imagen se ha almacenado en la galeria con exito");
	//parent.history.back(); // Va a la anterior pagina
	

	var pict = navigator.getDeviceStorage('pictures');
	var file = this.result.blob; // Tambien probado con this.result; y nada.
	//var file   = new Blob(["Este es un archivo de texto."], {type: "text/plain"});
	var request = pict.add(file);
	//var request = pict.addNamed(file, "mi-archivo.txt");
	
	if (file != null) {
		request.onsuccess = function () {
		var name = this.result.name;
		console.log("El archivo " + name + " se escribio correctamente en el area de almacenamiento");
		alert("El archivo " + name + " se escribio correctamente en el area de almacenamiento");
		this.done = false;
		}
		
		// Un error suele producirse si un archivo con el mismo nombre ya existe
		request.onerror = function () {
			console.warn('No se puede escribir el archivo: ' + this.error);
			alert("No se puede escribir el archivo: " + this.error);
		}
	}
	else {
		this.done = true;
	}

	if (!this.done) {
		this.continue();
	}
	
});	


$("#btnMenu").click(function(){
	alert("Se ha pulsado el menu");
});


$("#btnCancel").click(function(){
	//alert("La imagen se ha almacenado en la galeria con exito");
	parent.history.back(); // Va a la anterior pagina
});	
	
	
$("#btnDel").click(function(){
	alert("Se ha presionado el boton eliminar");
	//alert("La imagen se ha eliminado con exito");
	//parent.history.back(); // Va a la anterior pagina
	
	var pict = navigator.getDeviceStorage('pictures');
	var request = pict.delete(this.result);
	//var request = pict.delete("my-file.txt");
	
	request.onsuccess = function () {
		alert("Imagen eliminada");
		console.log("Imagen eliminada log");
	}
	
	request.onerror = function () {
		alert("No se puede borrar el fichero: " + this.error);
		console.log("No se puede borrar el fichero log: " + this.error);
	}
});


$("#btnFreeSpace").click(function(){
	var pict = navigator.getDeviceStorage('pictures'); // "pictures"
	var request = pict.freeSpace();

	request.onsuccess = function () {
		// El resultado se expresa en bytes, se convierte en Gigabytes
		var size = this.result / Math.pow(10,9);

		console.log("Quedan " + size.toFixed(2) + "GB de espacio libre en tu dispositivo");
		alert("Quedan " + size.toFixed(2) + "GB de espacio libre en tu dispositivo");
	}

	request.onerror = function () {
		console.warn("No se puede obtener el espacio libre disponible en el dispositivo: " + this.error);
		alert("No se puede obtener el espacio libre disponible en el dispositivo: " + this.error);
	}
});

$("#btnUsedSpace").click(function(){
	var pict = navigator.getDeviceStorage('pictures'); // "pictures"
	var request = pict.usedSpace();
	
	request.onsuccess = function () {
	//El resultado se expresa en bytes, permite convertirlo en megabytes
		var size = this.result / 1048576; // 1MB (megabyte) es igual a 1 048 576 bytes 
		console.log("Las imagenes almacenadas en tu dispositivo ocupan " + size.toFixed(2) + "MB de espacio");
		alert("Las imagenes almacenadas en tu dispositivo ocupan " + size.toFixed(2) + "MB de espacio");
	}
	
	request.onerror = function () {
		console.warn("No se puede obtener el espacio que utilizan las imagenes " + this.error);
		alert("No se puede obtener el espacio que utilizan las imagenes " + this.error);
	}
});	

$( "#popupPanel" ).on({
    popupbeforeposition: function() {
        var h = $( window ).height();

        $( "#popupPanel" ).css( "height", h );
    }
});

$("#btnBack").click(function(){
	//alert("Se presiona el boton atrás");
	parent.history.back(); // Va a la anterior pagina
});

	//GET FILE//
	
	//var sdcard = navigator.getDeviceStorage('sdcard');
	//var request = sdcard.get("my-file.txt");
	
	//request.onsuccess = function () {
	  //var file = this.result;
	  //console.log("Get the file: " + file.name);
	//}
	
	//request.onerror = function () {
	  //console.warn("Unable to get the file: " + this.error);
	//}
	
	
/*$("#btnDelete").click(function(){
	//alert("La imagen se ha eliminado con exito");
	//parent.history.back(); // Va a la anterior pagina
	
	
	var pict = navigator.getDeviceStorage('pictures');
	var request = pict.delete(this.result);
	//var request = pict.delete("my-file.txt");
	
	request.onsuccess = function () {
		alert("Imagen eliminada");
		console.log("Imagen eliminada log");
	}
	
	request.onerror = function () {
		alert("No se puede borrar el fichero: " + this.error);
		console.log("No se puede borrar el fichero log: " + this.error);
	}
	
});
**/
	
								
