const bundle = require("./bundle");
const AWS = require("aws-sdk");
const gm = require("gm");

function handlingError(err) {
  callback(null, {
    statusCode: 500,
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(err)
  });
}

module.exports.ssr = bundle.ssr.handler;

module.exports.getUserCount = (event, context, callback) => {
  const GoogleSpreadsheet = require("google-spreadsheet");
  const moment = require("moment");

  const googleAuth = JSON.parse(process.env.GOOGLE_AUTH);
  const TARGET_SPREAD_SHEET_ID = "1iy2f4IClmv_k-S4BQze8b9Uk5nlLtOKm_89uxUmvYRs";
  const doc = new GoogleSpreadsheet(TARGET_SPREAD_SHEET_ID);

  doc.useServiceAccountAuth(googleAuth, function(err) {
    if (err) {
      handlingError(err);
    } else {
      doc.getRows(1, function(err, rows) {
        if (err) {
          handlingError(err);
        } else {
          context.succeed({
            statusCode: 200,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(rows.length)
          });
        }
      });
    }
  });
};

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

  function rowCallback(err, rows) {
    if (err) {
      handlingError(err);
    } else {
      const mappedInfos = rows.map(row => {
        return {
          name: row.name,
          affiliation: row.affiliation,
          date: row.date,
          comment: row.comment
        };
      });

      context.succeed({
        statusCode: 200,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(mappedInfos)
      });
    }
  }

  doc.useServiceAccountAuth(googleAuth, function(err) {
    if (err) {
      handlingError(err);
    } else {
      const limit = page > 0 ? ROWS_PER_PAGE : 99;

      // NOTE: The reverse option only works in conjunction with orderby. It will not work to reverse the default ordering. This is a known bug in Google's API.
      const getOptions = {
        offset: offset,
        limit: limit,
        orderby: "date",
        reverse: true
      };

      doc.getRows(1, getOptions, rowCallback);
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
      date: string;
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
        const moment = require("moment");
        const doc = new GoogleSpreadsheet(TARGET_SPREAD_SHEET_ID);
        const { name, affiliation, email, organization, comment, sendEmailChecked } = user;
        var sheet;

        doc.useServiceAccountAuth(googleAuth, function(err) {
          if (err) {
            reject(err);
          } else {
            doc.getInfo(function(err, info) {
              if (err) {
                reject();
              } else {
                sheet = info.worksheets[0];
                sheet.setHeaderRow(
                  ["name", "affiliation", "email", "organization", "comment", "date", "sendEmailChecked"],
                  err => {
                    if (err) {
                      reject(err);
                    } else {
                      const date = new Date();
                      const createdAt = moment(date).format("x");

                      const fields = {
                        name,
                        affiliation,
                        email,
                        organization,
                        comment,
                        sendEmailChecked,
                        date: createdAt
                      };

                      doc.addRow(1, fields, function(err) {
                        if (err) return reject(err);
                        resolve();
                      });
                    }
                  }
                );
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
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(targetUser)
        });
      })
      .catch(err => {
        callback(null, {
          statusCode: 500,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(err)
        });
      });
  }
};

module.exports.uploadImage = (event, context, callback) => {
  if (event.body) {
    /*
      *** Response Fields
      buffer: Buffer;
    */
    let imageBuffer = event.body;
    // try {
    //   imageBuffer = JSON.Parse(event.body, "base64");
    // } catch (err) {
    //   console.error(err);
    //   imageBuffer = event.body;
    // }

    // const imageMagick = gm.subClass({ imageMagick: true });
    const date = new Date();
    const fileName = date.toISOString();

    // imageMagick(imageBuffer, 'image.jpg')
    //   .write(`/tmp/${fileName}`, function (err) {
    //     if (err) {
    //       return console.error(err);
    //     } else {
    //       console.log('Created an image from a Buffer!');
    //     }
    //   });

    const uploader = buffer => {
      return new Promise((resolve, reject) => {
        // set AWS
        const s3 = new AWS.S3({ params: { Bucket: process.env.S3_BUCKET_NAME } });

        try {
          s3.upload(
            {
              Body: buffer,
              Key: `${fileName}`,
              ACL: "public-read"
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            }
          );
        } catch (err) {
          reject(err);
        }
      });
    };

    uploader(imageBuffer)
      .then(() => {
        context.succeed({
          statusCode: 200,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(imageBuffer)
        });
      })
      .catch(err => {
        console.error(err);
        callback(null, {
          statusCode: 500,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(err)
        });
      });
  }
};
