const storage = firebase.storage();

export function createPopup(feature){
    console.log(feature.properties.OI_KEY);
    
    // Adds popup
    let popup = document.getElementById('popup');
    while(popup.firstChild) {
      popup.removeChild(popup.lastChild);
    }
    popup.className = "popup";
    popup.style.visibility = 'visible';

    // Adds table
    // Need to import JSON file with matching OI_KEY found in feature.properties.OI_KEY
    let table = document.createElement('table');
    table.id = "table";
    popup.appendChild(table);
    // for each row need to add 'th' tags filled with all items in json file

    let row_standID = document.createElement('tr');
    row_standID.id = "row_standID";
    table.appendChild(row_standID)

    let row_plotID = document.createElement('tr');
    row_plotID.id = "row_plotID";
    table.appendChild(row_plotID);

    let row_treeID = document.createElement('tr');
    row_treeID.id = "row_treeID";
    table.appendChild(row_treeID);

    let row_SPoriginal = document.createElement('tr');
    row_SPoriginal.id = "row_SPoriginal";
    table.appendChild(row_SPoriginal);

    let row_numcode = document.createElement('tr');
    row_numcode.id = "row_numcode";
    table.appendChild(row_numcode);

    let row_nrcscode = document.createElement('tr');
    row_nrcscode.id = "row_nrcscode";
    table.appendChild(row_nrcscode);

    let row_commonName = document.createElement('tr');
    row_commonName.id = "row_commonName";
    table.appendChild(row_commonName);

    let row_sp_swo = document.createElement('tr');
    row_sp_swo.id = "row_sp_swo";
    table.appendChild(row_sp_swo);
    
    let row_inc = document.createElement('tr');
    row_inc.id = "row_inc";
    table.appendChild(row_inc);

    let row_dbh = document.createElement('tr');
    row_dbh.id = "row_dbh";
    table.appendChild(row_dbh);

    let row_tht = document.createElement('tr');
    row_tht.id = "row_tht";
    table.appendChild(row_tht);

    let row_cr = document.createElement('tr');
    row_cr.id = "row_cr";
    table.appendChild(row_cr);
    
    let row_top = document.createElement('tr');
    row_top.id = "row_top";
    table.appendChild(row_top);

    let row_live = document.createElement('tr');
    row_live.id = "row_live";
    table.appendChild(row_live);

    let row_decay = document.createElement('tr');
    row_decay.id = "row_decay";
    table.appendChild(row_decay);

    let row_nest = document.createElement('tr');
    row_nest.id = "row_nest";
    table.appendChild(row_nest);

    let row_volume = document.createElement('tr');
    row_volume.id = "row_volume";
    table.appendChild(row_volume);

    let row_perAcreArea = document.createElement('tr');
    row_perAcreArea.id = "row_perAcreArea";
    table.appendChild(row_perAcreArea);

    let row_tree_id = document.createElement('tr');
    row_tree_id.id = "row_tree_id";
    table.appendChild(row_tree_id);

    // Adds download button
    let download_button = document.createElement("button");
    download_button.innerHTML = "Download FOI_SWO_" + feature.properties.OI_KEY;
    download_button.id = 'download_button';
    popup.appendChild(download_button);
    download_button.addEventListener("click", function(){
        let fileRef = storage.ref();

        fileRef.child('/FOI_SWO_233588.csv').getDownloadURL().then(function(url){
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event){
              let blob = xhr.response;
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

    // Adds close button
    let close_button = document.createElement("button");
    close_button.innerText = " X ";
    close_button.id = "close-button";
    popup.appendChild(close_button);
    close_button.addEventListener("click", function() {
      popup.style.visibility = 'hidden';
    });
}