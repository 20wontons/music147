// TODO: https://stackoverflow.com/questions/71894872/how-to-set-cell-background-color-in-googlespreadsheet-using-appscript-project
// display piano roll and also use color for showing time

var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

function getSequence() {
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  // goes sequentially column by column
  // console.log(dataRange.getNumColumns() +"cols and " +data.length + "rows");
  var sequence = [];
  for (var i = 0; i < dataRange.getNumColumns(); i++) {
    var col = [];
    for (var j = 0; j < data.length; j++) {
      col.push(data[j][i]);
    }
    sequence.push(col);
  }
  // console.log(sequence);
  return sequence;
}

function colorTime(column, color) {
  sheet.getRange(1,column,128,2).setBackground(color);
}