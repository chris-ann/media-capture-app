
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    var picOptions = {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI
    }

    $("#takePhoto").on("click", takePic);

    function takePic() {
        navigator.camera.getPicture(onPicSuccess, onPicError, picOptions)
    }

    function onPicSuccess(imageData) {
        console.log(imageData);
        resolveLocalFileSystemURL(imageData, function (fileEntry) {
            var myNewImage = fileEntry.toURL()
            console.log(myNewImage);
            // do something with URL, assign to src or create an html 
            $("#takePhoto").after("<img src='" + myNewImage + "'>")
        }, onPicError);

    }
    function onPicError(message) {
        alert("Photo not taken because" + message)
    }

    var vidOptions = {
        limit: 1,
        duration: 30
    }

    $("#takeVid").on("click", startVideo);

    function startVideo() {
        navigator.device.capture.captureVideo(vidSuccess, vidError, vidOptions)
    }

    function vidSuccess(mediaFiles) {
        console.log(mediaFiles);
        var path = mediaFiles[0].fullPath;
        console.log(path)

        resolveLocalFileSystemURL(path, function (fileEntry) {
            var vpath = fileEntry.toInternalURL()
            console.log(vpath);
            // do something with URL, assign to src or create an html 
            $("#results").append('<video controls><source src="' + vpath + '" type="video/mp4"></video>')
        }, onPicError);




    }
    function vidError(e) {
        alert('Error code ' + e.code)
    }





}
