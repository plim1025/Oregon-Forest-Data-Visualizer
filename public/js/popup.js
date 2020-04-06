const storage = firebase.storage();

export function createPopup(feature){
    console.log(feature);
    let popup = document.getElementById('popup');
    popup.setAttribute("class", "popup");
    popup.innerHTML = feature.properties.OI_KEY;
    popup.style.flex = '3';
    let button = document.getElementById('download_button');
    if(button != null){
      popup.removeChild(popup.children[0]);
    }

    var download_button = document.createElement("button");
    download_button.innerHTML = "Download FOI_SWO_" + feature.properties.OI_KEY;
    download_button.id = 'download_button';
    popup.appendChild(download_button);

    download_button.addEventListener("click", function(){
        var fileRef = storage.ref();

        fileRef.child('/FOI_SWO_233588.csv').getDownloadURL().then(function(url){
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event){
              var blob = xhr.response;
            }
            xhr.open('GET', url);
            xhr.send();

        }).catch(function(error){
          switch(error.code){
            case 'storage/object-not-found':
              console.log("Storage object not found");
              break;
            case 'storage/bucket-not-found':
              console.log("Bucket not configured");
              break;
            case 'storage/unauthenticated':
              console.log("User unauthenticated");
              break;
            case 'storage/unknown':
              console.log("Unknown error occured");
              break;
          }
        }); 
    });
    /*let parent = document.getElementById('body');
    parent.removeChild(parent.children[2]);
    parent.insertBefore(popup, parent.children[2]);*/

    var close_button = document.createElement("button");
    close_button.innerText = " X ";
    close_button.id = "close-button";
    popup.appendChild(close_button);

    var replacement_popup = document.createElement("div");
    replacement_popup.id = "popup";
    document.getElementById('main').appendChild(replacement_popup);
    close_button.addEventListener("click", function() {
      popup.remove();
    });
}