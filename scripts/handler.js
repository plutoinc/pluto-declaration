const bundle = require("./bundle");

module.exports.ssr = bundle.ssr.handler;

module.exports.getUsers = (event, context, callback) => {
  const ROWS_PER_PAGE = 100;
  const googleAuth = JSON.parse(process.env.GOOGLE_AUTH);
  const TARGET_SPREAD_SHEET_ID = "1iy2f4IClmv_k-S4BQze8b9Uk5nlLtOKm_89uxUmvYRs";
  const GoogleSpreadsheet = require("google-spreadsheet");
  const doc = new GoogleSpreadsheet(TARGET_SPREAD_SHEET_ID);

  let page = 0;
  let offset = 0;
  if (event.queryStringParameters) {
    page = event.queryStringParameters.page ? parseInt(event.queryStringParameters.page, 10) : 0;
    offset = page > 0 ? page * ROWS_PER_PAGE : 1;
  }

  function handlingError(err) {
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
  }

  function rowCallback(err, rows) {
    if (err) {
      handlingError(err);
    } else {
      const mappedInfos = rows.map(row => {
        return {
          email: row.email,
          affiliation: row.affiliation,
        };
      });

      context.succeed({
        statusCode: 200,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(mappedInfos),
      });
    }
  }

  doc.useServiceAccountAuth(googleAuth, function(err) {
    if (err) {
      handlingError(err);
    } else {
      const limit = page > 0 ? ROWS_PER_PAGE : 99;
      doc.getRows(1, { offset: offset, limit: limit }, rowCallback);
    }
  });
};

module.exports.sendSheet = (event, context, callback) => {
  if (event.body) {
    /*
      *** Response Fields
      name: string;
      affiliation: string;
      email: string;
      organization: string;
      comment: string;
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
        const { name, affiliation, email, organization, comment } = user;
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
                sheet.setHeaderRow(["name", "affiliation", "email", "organization", "comment"], err => {
                  if (err) {
                    reject(err);
                  } else {
                    const fields = {
                      name,
                      affiliation,
                      email,
                      organization,
                      comment,
                    };
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
