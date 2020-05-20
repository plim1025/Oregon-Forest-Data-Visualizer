import { make_plot } from './graphs.js';

export function createPopup(feature){
  const file = 'CSV/FOI_SWO_' + feature.properties.OI_KEY + '.csv';


  // In table on include columns: tree_in_plot, INC - peracrearea (paco will send)
  // Replace BDH vs THT with DBH vs Volume
  // Bar chart summing tree volume by species (SP_SWO or common.name, Volume)
  // 


  const info = document.getElementById('info');

  const infoTitle = document.getElementById('infoTitle');
  infoTitle.innerHTML = 'OI Key: ' + feature.properties.OI_KEY;

  info.appendChild(infoTitle);

  const downloadButton = document.getElementById('downloadButton');
  downloadButton.onclick = () => location.href = file;
  downloadButton.style.visibility = 'visible';
  info.appendChild(downloadButton);

  const plotDiv = document.getElementById('plot1');
  info.appendChild(plotDiv);
  make_plot(file, feature.properties.OI_KEY);

  const toggleButton = document.getElementById('toggleButton');
  toggleButton.style.visibility = 'visible';
  toggleButton.onclick = () => {
    if(toggleButton.innerText === 'Expand Table') {
      expand_table(file);
      toggleButton.innerText = 'Retract Table';
    } else { 
      retract_table(file);
      toggleButton.innerText = 'Expand Table';
    }
  };
  info.appendChild(toggleButton);

  const table = document.getElementById('table');
  retract_table(file);
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
      var cell_data = stand_data[count].split(',');
      table_data += '<tr>';
      for(var col = 0; col < cell_data.length; col++){
        if(count === 0){
          if(cell_data[col][0] === '\''){
            cell_data[col] = cell_data[col].slice(1, cell_data[col].length - 1);
          }
          table_data += '<th>' + cell_data[col] + '</th>';
        }else{
          if(cell_data[col][0] === '\''){
            cell_data[col] = cell_data[col].slice(1, cell_data[col].length - 1);
          }
          table_data += '<td>' + cell_data[col] + '</td>';
        }
      }
    }
    table_data += '</tr>';
    table_data += '</table>';
    document.getElementById('table').innerHTML = table_data;
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
      var cell_data = stand_data[count].split(',');
      table_data += '<tr>';
      for(var col = 0; col < cell_data.length; col++){
        if(count === 0){
          if(cell_data[col][0] === '\''){
            cell_data[col] = cell_data[col].slice(1, cell_data[col].length - 1);
          }
          table_data += '<th>' + cell_data[col] + '</th>';
        }else{
          if(cell_data[col][0] === '\''){
            cell_data[col] = cell_data[col].slice(1, cell_data[col].length - 1);
          }
          table_data += '<td>' + cell_data[col] + '</td>';
        }
      }
    }
    table_data += '</tr>';
    table_data += '</table>';
    document.getElementById('table').innerHTML = table_data;
  });
}
