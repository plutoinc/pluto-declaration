const bundle = require("./bundle");

module.exports.ssr = bundle.ssr.handler;
module.exports.sendSheet = (event, context, callback) => {
  if (event.body) {
    /* 
      *** Response Fields
      name: string;
    */
    let targetUser;
    try {
      targetUser = JSON.parse(event.body);
    } catch (err) {
      targetUser = event.body;
    }

    const googleAuth = JSON.parse(process.env.GOOGLE_AUTH);
    const TARGET_SPREAD_SHEET_ID = "1iy2f4IClmv_k-S4BQze8b9Uk5nlLtOKm_89uxUmvYRs";
    const TARGET_SHEET_NUMBER = 0;

    const addUser = user => {
      return new Promise((resolve, reject) => {
        const GoogleSpreadsheet = require("google-spreadsheet");
        const doc = new GoogleSpreadsheet(TARGET_SPREAD_SHEET_ID);
        var sheet;

        doc.useServiceAccountAuth(googleAuth, function(err) {
          if (err) {
            reject(err);
          } else {
            doc.getInfo(function(err, info) {
              if (err) {
                console.log(err);
                reject();
              } else {
                sheet = info.worksheets[0];
                sheet.setHeaderRow(["name"], err => {
                  if (err) {
                    reject(err);
                  } else {
                    const fields = { name: user.name };
                    doc.addRow(1, fields, function(err) {
                      if (err) return reject(err);
                      resolve();
                    });
                  }
                });
              }
            });
          }
        });
      });
    };

    addUser(targetUser)
      .then(() => {
        context.succeed({
          statusCode: 200,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(targetUser),
        });
      })
      .catch(err => {
        console.error(err);
        callback(null, {
          statusCode: 500,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(err),
        });
      });
  }
};
