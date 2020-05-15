
function create_buttons(){
    fetch('/downloads').then((response) => {
        console.log(response);      
    });
}

create_buttons();