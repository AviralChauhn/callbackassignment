const fs = require("fs");

function createRandomFiles(path, randomFiles) {
  return new Promise((res, rej) => {
    fs.mkdir(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        for (let index = 1; index <= randomFiles; index++) {
          fs.writeFile(`${path}/file${index}.json`, " ", "utf-8", (err) => {
            if (err) {
              rej(err);
            } else {
              console.log(`file${index} created successfully`);
              if (index == randomFiles) {
                res();
              }
            }
          });
        }
      }
    });
  });
}

function deleteRandomFiles(path, randomFiles) {
  return new Promise((res, rej) => {
    for (let index = 1; index <= randomFiles; index++) {
      fs.unlink(`${path}/file${index}.json`, (err) => {
        if (err) {
          rej(err);
        } else {
          console.log(`file${index} deleted successfully`);
          if (index == randomFiles) {
            res();
          }
        }
      });
    }
  });
}

createRandomFiles("Files", 6)
  .then(() => {
    return deleteRandomFiles("Files", 6);
  })
  .catch((err) => {
    console.log(err);
  });
