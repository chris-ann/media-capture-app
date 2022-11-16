
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
            $("#results").append("<img src='" + myNewImage + "'>")
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
        var hostedpath = mediaFiles[0].localURL;
        console.log("full path: " + path)
        console.log("localURL:" + hostedpath)

        // *** this should work, as it has the same source and protocol as the image above
        //$("#results").append('<video controls><source src="' + hostedpath + '" type="video/mp4"></video>')

        // attempting to covert the full path using file plugin, seems to result in the same path as the localURL does
        resolveLocalFileSystemURL(path, function (fileEntry) {
            var newpath = fileEntry.toURL()
            console.log("converted path:" + newpath)
            // do something with URL, assign to src or create an html 
            $("#results").append('<video controls><source src="' + newpath + '" type="video/mp4"></video>')
        }, onPicError);




    }
    function vidError(e) {
        alert('Error code ' + e.code)
    }





}
