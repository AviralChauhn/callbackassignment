const fs = require("fs");

const path = "files";
function readingFile(file, callback) {
  fs.readFile(file, "utf-8", (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      let data = fileData;
      console.log(`${file} read successfully`);
      callback(data);
    }
  });
}
function writingFile(file, data, callback) {
  fs.writeFile(file, data, "utf-8", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${file} written successfully`);
      callback(data);
    }
  });
}
function sentences(data) {
  return data.toLowerCase().split(".").join("\n");
}
function appendNames(fileName, data, callback) {
  fs.appendFile(fileName, data, "utf-8", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File name written successfully!!");
      callback(data);
    }
  });
}
function unlinkFileNames(file, callback) {
  fs.readFile(file, "utf-8", (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      const filesToDelete = fileData.split("\n").filter(Boolean);
      filesToDelete.forEach((filedata, index) => {
        fs.unlink(`${path}/${filedata}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`${filedata} deleted successfully!!`);
            if (index == filesToDelete.length - 1) {
              callback();
            }
          }
        });
      });
    }
  });
}
function sorting(data) {
  return data.split(" ").sort().join("\n");
}
readingFile("files/lipsum.txt", (data) => {
  console.log("File Read Done");
  writingFile("files/upperCaseContent.txt", data.toUpperCase(), (data) => {
    console.log("File Created Successfully!!");
    writingFile("files/fileNames.txt", "upperCaseContent.txt", (data) => {
      console.log("filenames creation Done");
      writingFile("files/lowerCaseSentences.txt", sentences(data), (data) => {
        console.log("sentences written successfully");
        appendNames(
          "files/fileNames.txt",
          "\nlowerCaseSentences.txt",
          (data) => {
            console.log("filename added successfully !!");
            writingFile("files/sortedContent.txt", sorting(data), (data) => {
              console.log("sorted data file written successfully!!");
              appendNames("files/fileNames.txt", "\nsortedContent.txt", () => {
                console.log("filename added successfully!!");
                unlinkFileNames("files/fileNames.txt", (data) => {
                  console.log("ALL DONE !!");
                });
              });
            });
          }
        );
      });
    });
  });
});
