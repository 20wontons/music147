var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

function getSequence() {
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  // goes sequentially column by column
  // console.log(dataRange.getNumColumns() +"cols and " +data.length + "rows");
  var sequence = [];
  for (var i = 1; i < dataRange.getNumColumns(); i++) {
    var col = [];
    for (var j = 1; j < data.length; j++) {
      col.push(data[j][i]);
    }
    sequence.push(col);
  }
  return sequence;
}

function colorTime(column, color) {
  sheet.getRange(1,column,128,2).setBackground(color);
}

function formatSheet() {
  var fullRange = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  fullRange.setFontFamily("Roboto Mono")
       .setFontSize(10)
       .setFontColor("#000000")
       .setHorizontalAlignment("center")
       .setVerticalAlignment("middle");
  formatPianoRoll();
  var range = sheet.getRange(2,2, sheet.getMaxRows(), sheet.getMaxColumns());
  var rule = SpreadsheetApp.newConditionalFormatRule()
      .setGradientMaxpointWithValue("#E67C73", SpreadsheetApp.InterpolationType.NUMBER, "127")
      .setGradientMinpointWithValue("#FFFFFF", SpreadsheetApp.InterpolationType.NUMBER, "0")
      .setRanges([range])
      .build();
  sheet.clearConditionalFormatRules();
  var rules = sheet.getConditionalFormatRules();
  rules.push(rule);
  sheet.setConditionalFormatRules(rules);
  sheet.setFrozenColumns(1);
}

function formatPianoRoll() {
  sheet.getRange("1:1").setBackground("#00AC47");
  sheet.getRange("A1").setValue("GS STUDIO");
  for (var i = 0; i < 8; i++) {
    sheet.getRange(Utilities.formatString('A%d', 2+(12*i))).setValue(Utilities.formatString('C%d', 8-i));
    sheet.getRange(Utilities.formatString('A%d', 4+(12*i))).setBackground("#000000");
    sheet.getRange(Utilities.formatString('A%d', 6+(12*i))).setBackground("#000000");
    sheet.getRange(Utilities.formatString('A%d', 8+(12*i))).setBackground("#000000");
    sheet.getRange(Utilities.formatString('A%d', 11+(12*i))).setBackground("#000000");
    sheet.getRange(Utilities.formatString('A%d', 13+(12*i))).setBackground("#000000");
  }
}