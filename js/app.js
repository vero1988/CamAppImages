var editedImage;

window.onload = function() {
	
    if( !window.MozActivity ) {
		alert('Este entorno no admite Actividades Web, por favor emplea Firefox OS. \n\nPerdona las molestias causadas.');
		
        return;
    }
	
	var pickImage = document.querySelector("#pick-image");
	
    if (pickImage) {
        pickImage.onclick = function () {
			
            var pickImageActivity = new MozActivity({
                name: "pick",
                data: {
                    type: ["image/png", "image/jpg", "image/jpeg"]
				}
            });

            pickImageActivity.onsuccess = function () {

				var file = this.result.blob; // this.result.blob; --> Me indica que es un tipo File o Blob

				editedImage = file;
				
				if (file != null) {
					//Crea el elemento via jQuery
					var imageElement = $('<img id="image1" height="350" width="290">'); // Antes a 400 y 300; Como puedo coger el tamaño de la imagen pero redimensionada con menos zoom.
					imageElement.attr('src', window.URL.createObjectURL(file));
					$("#pickImage").html(imageElement);

					//Cambia de pagina a partir del id
					$.mobile.changePage ($("#showImage"));

				}else{
					alert("La imagen no existe");
				}
            }

            pickImageActivity.onerror = function () {
                //alert("No se ha seleccionado ninguna imagen");
				console.log("No se ha seleccionado ninguna imagen: " + this.result); // this.result --> Me indica que es un tipo Object
            }
        }
    }
	
};
	
$("#btnSave").click(function(){
	// alert(editedImage); // Me indica que la imagen es de tipo Blob o File
	var pict = navigator.getDeviceStorage("pictures");
	
	var mydate=new Date(); 
	var year=mydate.getYear(); 
	if (year < 1000) 
		year+=1900; 
	var day=mydate.getDay(); 
	var month=mydate.getMonth()+1; 
	if (month<10) 
		month="0"+month; 
	var daym=mydate.getDate(); 
	if (daym<10) 
		daym="0"+daym; 
		
	var Digital=new Date(); 
	var hours=Digital.getHours(); 
	var minutes=Digital.getMinutes(); 
	var seconds=Digital.getSeconds(); 
	if (hours<=9) 
		hours="0"+hours;
	if (minutes<=9) 
		minutes="0"+minutes; 
	if (seconds<=9) 
		seconds="0"+seconds; 

	var namefile ="img" + daym + month + year + hours + minutes + seconds + ".jpeg"; 	
	
	var request = pict.addNamed(editedImage, namefile); // editImage --> es el fichero que espera, la imagen

	request.onsuccess = function () {
		var name = this.result;
		console.log("La imagen " + name + " se ha guardado correctamente");
		alert("La imagen se ha guardado correctamente");
	}

	// Error que suele producirse es cuando existe un archivo con el mismo nombre, por ello se ha implementado que se almacene con el DD/MM/AA y la HH-MM-SS
	request.onerror = function () {
		alert("No se puede guardar la imagen");
		console.warn("No se puede guardar la imagen: " + this.error);
	}
	$.mobile.changePage ($("#home"));
});

$("#btnMenu").click(function(){
	alert("Se ha pulsado el menu");
});


$("#btnCancel").click(function(){
	parent.history.back(); // Va a la anterior pagina
});		
	
$("#btnDel").click(function(){
	var pict = navigator.getDeviceStorage('pictures');
	var request = pict.delete(editedImage.name);
	
	request.onsuccess = function () {
		console.log("Se ha eliminado la imagen " + editedImage.name + " correctamente");
		alert("Se ha eliminado la imagen correctamente");
	}
	
	request.onerror = function () {
		alert("No se puede borrar la imagen porque no esta guardada");
		console.log("No se puede borrar la imagen porque no esta guardada: " + this.error);
		$.mobile.changePage ($("#showImage"));
	}
	$.mobile.changePage ($("#home"));
});

$("#btnFreeSpace").click(function(){
	var pict = navigator.getDeviceStorage('pictures');
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

$("#popupPanel").on({
    popupbeforeposition: function() {
        var h = $(window).height();

        $("#popupPanel").css("height", h);
    }
});

$("#btnBack").click(function(){
	parent.history.back(); // Va a la anterior pagina
});

function setEffect(effect, value){
	$('#pickImage').css(effect, value);
		
	var classToApply = "";
	
	switch(effect){
		case 'grayscale':
			switch(value){
				case '0':
					$("#pickImage").removeClass("grayscale_low");				
					break;
				case '25':
					classToApply = "grayscale_low";
					$("#pickImage").removeClass("grayscale_medium");
					break;
				case '50':
					classToApply = "grayscale_medium";
					$("#pickImage").removeClass("grayscale_low");
					$("#pickImage").removeClass("grayscale_medium_high");
					break;
				case '75':
					classToApply = "grayscale_medium_high";
					$("#pickImage").removeClass("grayscale_medium");
					$("#pickImage").removeClass("grayscale_high");
					break;
				case '100':
					classToApply = "grayscale_high";
					$("#pickImage").removeClass("grayscale_medium_high");
					break;
			}			
			break;
				
				
				
		case 'borderRadius':
			switch(value){
				case '0':
					$("#pickImage").removeClass("borderRadius_low");
					break;
				case '1':
					classToApply = "borderRadius_low";
					$("#pickImage").removeClass("borderRadius_medium");
					break;
				case '2':
					classToApply = "borderRadius_medium";
					$("#pickImage").removeClass("borderRadius_low");
					$("#pickImage").removeClass("borderRadius_medium_high");
					break;
				case '3':
					classToApply = "borderRadius_medium_high";
					$("#pickImage").removeClass("borderRadius_medium");
					$("#pickImage").removeClass("borderRadius_high");
					break;
				case '4':
					classToApply = "borderRadius_high";
					$("#pickImage").removeClass("borderRadius_medium_high");
					break;
			}			
			break;
	}
	
	
	console.log("Input effect: " + effect + "(" + value + ") -> classToApply: " + classToApply);
	$("#pickImage").addClass(classToApply);
}


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
	
	
								
