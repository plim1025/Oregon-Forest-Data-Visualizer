export function createPopup(feature){
  var file = "CSV/FOI_SWO_" + feature.properties.OI_KEY + ".csv";

  let popup = document.getElementById('popup');
  popup.innerHTML = 'OI Key: ' + feature.properties.OI_KEY;

  var download_button = document.createElement("a");
  download_button.innerHTML = "Download CSV File";
  download_button.id = 'download_button';
  download_button.href = file;
  download_button.download;
  popup.appendChild(download_button);

  var close_button = document.createElement("div");
  close_button.innerText = "X";
  close_button.id = "close-button";
  popup.appendChild(close_button);

  close_button.addEventListener("click", function() {
    var replacement_popup = document.createElement("div");
    replacement_popup.id = "popup";
    document.getElementById('main').appendChild(replacement_popup);
    popup.remove();
  });

  var plot_div = document.createElement("div");
  plot_div.id = "plot1";
  popup.appendChild(plot_div);

  make_plot(file);

  table_functionalities(file);
}

function make_plot(file){
  Plotly.d3.csv(file, function(data){ 
      processData(data) 
  });
}

function processData(allRows) {
  var x = [], y = []; var row;
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['DBH'] );
    y.push( row['THT'] );
  }
  makePlotly( x, y);
}

function makePlotly( x, y){
  var traces = [{
    x: x,
    y: y,
    type: 'bar'
  }];

  var layout = {
    title: {
      text: 'DBH vs THT for data.csv',
      font: {
        family: 'Courier New, monospace',
        size: 19
      },
      xref: 'paper',
    },
    xaxis: {
      title: {
        text: 'DBH',
        font: {
          family: 'Courier New, monospace',
          size: 15,
          color: '#7f7f7f'
        },
      },
    },
    yaxis: {
      title: {
        text: 'THT',
        font: {
          family: 'Courier New, monospace',
          size: 15,
          color: '#7f7f7f'
        }
      }
    }
  }
  Plotly.newPlot('plot1', traces, layout);
};


function table_functionalities(file){
  var table_container = document.createElement("div");
  table_container.id = "table-container";
  document.getElementById("popup").appendChild(table_container);

  var table_buttons = document.createElement("div");
  table_buttons.id = "table-buttons";
  table_container.appendChild(table_buttons);

  var toggle_table = document.createElement("div");
  toggle_table.innerText = "Expand Table";
  toggle_table.name = "expand";
  toggle_table.id = "toggle-table-button";
  table_buttons.appendChild(toggle_table);

  create_table_settings();

  toggle_table.addEventListener("click", function(){
    if(toggle_table.name == "expand"){
      expand_table(file);
      toggle_table.name = "retract";
      toggle_table.innerText = "Retract Table";
    }else if(toggle_table.name == "retract"){
      retract_table(file);
      toggle_table.name = "expand";
      toggle_table.innerText = "Expand Table";
    }

  });

  var table = document.createElement("div");
  table.id = "table";
  table_container.appendChild(table);
  
  retract_table(file); //Initializes the table to the smaller size
}

function create_table_settings(){
  var table_settings = document.createElement("div");
  table_settings.innerText = "Table Settings";
  table_settings.id = "table-button-settings";
  document.getElementById('table-buttons').appendChild(table_settings);
  table_settings.addEventListener("click", function(){
    var table_settings_container = document.createElement("div");
    table_settings_container.id = "table-settings-container";
    document.getElementById("table-buttons").appendChild(table_settings_container);

    var submit_settings = document.createElement("div");
    submit_settings.id = "table-button-submit";
    submit_settings.innerText = "Submit Settings";
    table_settings_container.appendChild(submit_settings);

    var exit_settings = document.createElement("div");
    exit_settings.id = "exit-settings";
    exit_settings.innerText = " X ";
    table_settings_container.appendChild(exit_settings);

    exit_settings.addEventListener("click", function(){
      table_settings_container.remove();
    });
  });

}

function expand_table(file){
  fetch(file)
  .then(response => {
    return response.text();
  })
  .then(data => {
    var stand_data = data.split(/\r?\n|\r/);
    var table_data = '<table>';
    for(var count = 0; count < stand_data.length; count++){
      var cell_data = stand_data[count].split(",");
      table_data += '<tr>';
      for(var col = 0; col < cell_data.length; col++){
        if(count === 0){
          if(cell_data[col][0] === '\"'){
            cell_data[col] = cell_data[col].slice(1, cell_data[col].length - 1);
          }
          table_data += '<th>' + cell_data[col] + '</th>';
        }else{
          if(cell_data[col][0] === '\"'){
            cell_data[col] = cell_data[col].slice(1, cell_data[col].length - 1);
          }
          table_data += '<td>' + cell_data[col] + '</td>';
        }
      }
    }
    table_data += '</tr>';
    table_data += '</table>';
    document.getElementById("table").innerHTML = table_data;
  });
}

function retract_table(file){
  fetch(file)
  .then(response => {
    return response.text();
  })
  .then(data => {
    var stand_data = data.split(/\r?\n|\r/);
    var table_data = '<table>';
    for(var count = 0; count < 11; count++){
      var cell_data = stand_data[count].split(",");
      table_data += '<tr>';
      for(var col = 0; col < cell_data.length; col++){
        if(count === 0){
          if(cell_data[col][0] === '\"'){
            cell_data[col] = cell_data[col].slice(1, cell_data[col].length - 1);
          }
          table_data += '<th>' + cell_data[col] + '</th>';
        }else{
          if(cell_data[col][0] === '\"'){
            cell_data[col] = cell_data[col].slice(1, cell_data[col].length - 1);
          }
          table_data += '<td>' + cell_data[col] + '</td>';
        }
      }
    }
    table_data += '</tr>';
    table_data += '</table>';
    document.getElementById("table").innerHTML = "";
    document.getElementById("table").innerHTML = table_data;
  });
}
