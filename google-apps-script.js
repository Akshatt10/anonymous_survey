/**
 * Google Apps Script — Paste this into a Google Apps Script project
 * to receive survey responses and store them in a Google Sheet.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire code into the script editor
 * 4. Click Deploy → New deployment
 * 5. Select type: Web app
 * 6. Set "Execute as" → Me
 * 7. Set "Who has access" → Anyone
 * 8. Click Deploy and copy the URL
 * 9. Paste the URL into src/App.jsx → GOOGLE_SCRIPT_URL constant
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Form submissions (from hidden iframe) send data as e.parameter
    var data = e.parameter;

    // Fallback: if JSON body was sent instead
    if ((!data || !data.gender) && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    // If this is the first row, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Gender',
        'Age Group',
        'Moodboard 1',
        'Moodboard 2',
        'Moodboard 3',
        'Feedback'
      ]);
    }

    // Append the response
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.gender || '',
      data.ageGroup || '',
      data.moodboard1 || '',
      data.moodboard2 || '',
      data.moodboard3 || '',
      data.feedback || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests with query parameters (used by the survey app)
function doGet(e) {
  try {
    // If there are survey parameters, store them
    if (e.parameter && e.parameter.gender) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

      // If this is the first row, add headers
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          'Timestamp',
          'Gender',
          'Age Group',
          'Moodboard 1',
          'Moodboard 2',
          'Moodboard 3',
          'Feedback'
        ]);
      }

      // Append the response
      sheet.appendRow([
        e.parameter.timestamp || new Date().toISOString(),
        e.parameter.gender || '',
        e.parameter.ageGroup || '',
        e.parameter.moodboard1 || '',
        e.parameter.moodboard2 || '',
        e.parameter.moodboard3 || '',
        e.parameter.feedback || ''
      ]);

      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'Survey API is running' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
