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
    replacement_popup.style.visibility = 'hidden';
    document.getElementById('main').appendChild(replacement_popup);
    popup.remove();
  });

  var plot_div = document.createElement("div");
  plot_div.id = "plot1";
  popup.appendChild(plot_div);

  make_plot(file, feature.properties.OI_KEY);

  table_functionalities(file);
}

function make_plot(file, oi_key){
  Plotly.d3.csv(file, function(data){ 
      processData(data, oi_key) 
  });
}

function processData(allRows, oi_key) {
  var x = [], y = [];
  var dbhArray = [
    ["1-5", 0, 0], ["6-10", 0, 0], ["11-15", 0, 0], ["16-20", 0, 0], ["21-25", 0, 0], ["26-30", 0, 0], ["31-35", 0, 0],
    ["36-40", 0, 0],["41-45", 0, 0],["46-50", 0, 0],["51-55", 0, 0],["56-60", 0, 0],["61-65", 0, 0],["66-70", 0, 0],
    ["71-75", 0, 0],["76-80", 0, 0],["81-85", 0, 0],["86-90", 0, 0],["91-95", 0, 0],["96-100", 0, 0]
  ];
  
  for(var i = 0; i < allRows.length; i++){
    if(Number(allRows[i]['DBH']) > 0 && Number(allRows[i]['DBH']) <= 5){
      dbhArray[0][1] += Number(allRows[i]['THT']); dbhArray[0][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 5 && Number(allRows[i]['DBH']) <= 10){
      dbhArray[1][1] += Number(allRows[i]['THT']); dbhArray[1][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 10 && Number(allRows[i]['DBH']) <= 15){
      dbhArray[2][1] += Number(allRows[i]['THT']); dbhArray[2][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 15 && Number(allRows[i]['DBH']) <= 20){
      dbhArray[3][1] += Number(allRows[i]['THT']); dbhArray[3][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 20 && Number(allRows[i]['DBH']) <= 25){
      dbhArray[4][1] += Number(allRows[i]['THT']); dbhArray[4][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 25 && Number(allRows[i]['DBH']) <= 30){
      dbhArray[5][1] += Number(allRows[i]['THT']); dbhArray[5][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 30 && Number(allRows[i]['DBH']) <= 35){
      dbhArray[6][1] += Number(allRows[i]['THT']); dbhArray[6][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 35 && Number(allRows[i]['DBH']) <= 40){
      dbhArray[7][1] += Number(allRows[i]['THT']); dbhArray[7][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 40 && Number(allRows[i]['DBH']) <= 45){
      dbhArray[8][1] += Number(allRows[i]['THT']); dbhArray[8][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 45 && Number(allRows[i]['DBH']) <= 50){
      dbhArray[9][1] += Number(allRows[i]['THT']); dbhArray[9][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 50 && Number(allRows[i]['DBH']) <= 55){
      dbhArray[10][1] += Number(allRows[i]['THT']); dbhArray[10][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 55 && Number(allRows[i]['DBH']) <= 60){
      dbhArray[11][1] += Number(allRows[i]['THT']); dbhArray[11][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 60 && Number(allRows[i]['DBH']) <= 65){
      dbhArray[12][1] += Number(allRows[i]['THT']); dbhArray[12][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 65 && Number(allRows[i]['DBH']) <= 70){
      dbhArray[13][1] += Number(allRows[i]['THT']); dbhArray[13][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 70 && Number(allRows[i]['DBH']) <= 75){
      dbhArray[14][1] += Number(allRows[i]['THT']); dbhArray[14][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 75 && Number(allRows[i]['DBH']) <= 80){
      dbhArray[15][1] += Number(allRows[i]['THT']); dbhArray[15][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 80 && Number(allRows[i]['DBH']) <= 85){
      dbhArray[16][1] += Number(allRows[i]['THT']); dbhArray[16][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 85 && Number(allRows[i]['DBH']) <= 90){
      dbhArray[17][1] += Number(allRows[i]['THT']); dbhArray[17][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 90 && Number(allRows[i]['DBH']) <= 95){
      dbhArray[18][1] += Number(allRows[i]['THT']); dbhArray[18][2] += 1;
    }else if(Number(allRows[i]['DBH']) > 96 && Number(allRows[i]['DBH']) <= 100){
      dbhArray[19][1] += Number(allRows[i]['THT']); dbhArray[19][2] += 1;
    }
  }

  for(var i = 0; i < dbhArray.length; i++){
    if(dbhArray[i][2] != 0){
      var average = Number(dbhArray[i][1]) / Number(dbhArray[i][2]);
      dbhArray[i][1] = average;
    }
  }
  
  for (var i=0; i<dbhArray.length; i++) {
    x.push( dbhArray[i][0] );
    y.push( dbhArray[i][1] );
  }
  makePlotly( x, y, oi_key);
}

function makePlotly( x, y, oi_key){
  var traces = [{
    x: x,
    y: y,
    type: 'bar'
  }];

  var layout = {
    title: {
      text: 'DBH vs THT for ' + oi_key,
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
