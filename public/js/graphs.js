export function make_plot(file, oi_key){
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
        dbhArray[0][1] += (Number(allRows[i]['THT']) * Number(allRows[i]['perAcreArea_raster2'])); dbhArray[0][2] += 1;
      }else if(Number(allRows[i]['DBH']) > 5 && Number(allRows[i]['DBH']) <= 10){
        dbhArray[1][1] += (Number(allRows[i]['THT']) * Number(allRows[i]['perAcreArea_raster2'])); dbhArray[1][2] += 1;
      }else if(Number(allRows[i]['DBH']) > 10 && Number(allRows[i]['DBH']) <= 15){
        dbhArray[2][1] += (Number(allRows[i]['THT']) * Number(allRows[i]['perAcreArea_raster2'])); dbhArray[2][2] += 1;
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
