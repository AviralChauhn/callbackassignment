const fs = require("fs");
function creatingRandomJsonFile(path, randomFiles, callback) {
  let filesCreated = 0;
  let currentIndex = 1;
  function createNextFile() {
    if (currentIndex <= randomFiles) {
      fs.writeFile(`${path}/file${currentIndex}.json`, " ", "utf-8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`file${currentIndex} created successfully`);
          filesCreated++;
          if (filesCreated == randomFiles) {
            deleteFiles(path, currentIndex, callback);
          } else {
            currentIndex++;
            createNextFile();
          }
        }
      });
    } else {
      callback();
    }
  }
  createNextFile();
}
function deleteFiles(path, randomFile, callback) {
  let filesDeleted = 0;
  function deleteNextFile(index) {
    if (index <= randomFile) {
      fs.unlink(`${path}/file${index}.json`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`file${index} deleted successfully`);
          filesDeleted++;
          if (filesDeleted == randomFile) {
            callback();
          } else {
            deleteNextFile(index + 1);
          }
        }
      });
    }
  }
  deleteNextFile(1);
}
creatingRandomJsonFile("files", 6, () => {
  console.log("All Files created Successfully!!!");
  console.log("All Files Deleted Successfully!!!");
});
