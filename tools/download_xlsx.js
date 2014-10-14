var fs = require('fs');
var google = require('googleapis');
var request = require('request');
var untildify = require('untildify');

var drive = google.drive('v2');

var authClient = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  untildify(process.env.PATH_TO_GOOGLE_AUTH_PEM),
  'key',
  ['https://www.googleapis.com/auth/drive.readonly']
);

function downloadFile(fileUrl, authClient) {
  'use strict';

  request({
    uri: fileUrl,
    headers: {
      authorization: 'Bearer ' + authClient.credentials.access_token
    }
  }).pipe(fs.createWriteStream('data.xlsx'));
}

authClient.authorize(function(err) {
  'use strict';

  if (err) {
    console.log(err);
    return;
  }

  drive.files.get({auth: authClient, fileId: '1sIfHhtDVBS1GsSAojIjAvAKjdRH30787Wu9Al5Ccvkk'}, function(err, response) {
    if (err) {
      console.log(err);
      return;
    }

    downloadFile(response.exportLinks['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], authClient);
  });
});
