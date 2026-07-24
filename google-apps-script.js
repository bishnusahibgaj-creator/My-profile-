function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append the data to the next empty row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.type || 'Lead',
      data.name || data.client || '',
      data.email || '',
      data.phone || '',
      data.service || data.planName || '',
      data.message || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "error": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
