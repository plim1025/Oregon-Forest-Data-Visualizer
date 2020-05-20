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
  table.parentNode.appendChild(table);
  retract_table(file);
}

function expand_table(file){
  fetch(file)
  .then(response => {
    return response.text();
  })
  .then(data => {
    var standData = data.split(/\r?\n|\r/);
    var tableData = '<table>';
    for(var count = 0; count < standData.length; count++){
      var cellData = standData[count].split(',');
      tableData += '<tr>';
      for(var col = 0; col < cellData.length; col++){
        if(count === 0){
          if(cellData[col][0] === '\''){
            cellData[col] = cellData[col].slice(1, cellData[col].length - 1);
          }
          tableData += '<th>' + cellData[col] + '</th>';
        }else{
          if(cellData[col][0] === '\''){
            cellData[col] = cellData[col].slice(1, cellData[col].length - 1);
          }
          tableData += '<td>' + cellData[col] + '</td>';
        }
      }
    }
    tableData += '</tr>';
    tableData += '</table>';
    document.getElementById('table').innerHTML = tableData;
  });
}

function retract_table(file){
  fetch(file)
  .then(response => {
    return response.text();
  })
  .then(data => {
    var standData = data.split(/\r?\n|\r/);
    var tableData = '<table>';
    for(var count = 0; count < 11; count++) {
      var cellData = standData[count].split(',');
      tableData += '<tr>';
      for(var col = 0; col < cellData.length; col++){
        if(count === 0){
          if(cellData[col][0] === '\''){
            cellData[col] = cellData[col].slice(1, cellData[col].length - 1);
          }
          tableData += '<th>' + cellData[col] + '</th>';
        }else{
          if(cellData[col][0] === '\''){
            cellData[col] = cellData[col].slice(1, cellData[col].length - 1);
          }
          tableData += '<td>' + cellData[col] + '</td>';
        }
      }
    }
    tableData += '</tr>';
    tableData += '</table>';
    document.getElementById('table').innerHTML = tableData;
  });
}

let infoShown = true;
document.getElementById('hideButton').onclick = () => {
  console.log('button clicked')
  if(infoShown) {
    const info = document.getElementById('info');
    info.style.visibility = 'hidden';
    info.style.position = 'fixed';
    const hideButton = document.getElementById('hideButton');
    hideButton.style.right = 0;
    hideButton.style.transform = 'rotate(180deg)';

    infoShown = false;
  } else {
    const info = document.getElementById('info');
    info.style.visibility = 'visible';
    info.style.position = 'static';
    const hideButton = document.getElementById('hideButton');
    hideButton.style.right = '476px';
    hideButton.style.transform = 'none';
    infoShown = true;
  }
}