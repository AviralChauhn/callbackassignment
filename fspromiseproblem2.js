const fs = require("fs");
const dirr = "files/";
function readingFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${dirr}${fileName}`, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function writingFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${dirr}${fileName}`, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("SUCCES");
      }
    });
  });
}
function appendingFile(fileName, dataAdding) {
  return new Promise((resolve, reject) => {
    fs.appendFile(`${dirr}${fileName}`, dataAdding, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("SUCCES");
      }
    });
  });
}
function deletingFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.unlink(`${dirr}${fileName}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("deleted the file ");
      }
    });
  });
}
function userfsPromiseProblem2() {
  readingFile("lipsum.txt")
    .then((data) => {
      console.log("reading lipsum");
      return writingFile("upperCaseContent.txt", data.toUpperCase());
    })
    .then(() => {
      console.log("writing it in upperCase file in uppercase");
      return writingFile("fileNames.txt", "upperCaseContent.txt");
    })
    .then(() => {
      console.log("adding the name of the file in fileNames");
      return readingFile("upperCaseContent.txt");
    })
    .then((data) => {
      console.log("reading the contents of the uppercase file");
      return writingFile(
        "lowerCaseSentences.txt",
        data.toLowerCase().replaceAll(". ", ".\n")
      );
    })
    .then(() => {
      console.log("sentences file created");
      return appendingFile("fileNames.txt", "\nlowerCaseSentences.txt");
    })
    .then(() => {
      console.log("added lowerCaseSentences.txt into the fileNames.txt");
      return readingFile("upperCaseContent.txt");
    })
    .then((data) => {
      console.log("reading the contents of upper");
      return writingFile("sortedContent.txt", data);
    })
    .then(() => {
      console.log("adding the contents of the upper to sort");
      return readingFile("lowerCaseSentences.txt");
    })
    .then((data) => {
      console.log("reading the contents of file lowerCaseSentences");
      return appendingFile("sortedContent.txt", data);
    })
    .then(() => {
      console.log(
        "adding the contents of lowerCaseSentences file to the sort file"
      );
      return readingFile("sortedContent.txt");
    })
    .then((data) => {
      console.log("reading the content of the sort file");
      return writingFile("sortedContent.txt", data.split("").sort().join(""));
    })
    .then(() => {
      console.log("sorted the contents of file");
      return appendingFile("fileNames.txt", "\nsortedContent.txt");
    })
    .then(() => {
      console.log("added sort file name filetext");
      return readingFile("fileNames.txt");
    })
    .then((data) => {
      console.log("reading the fileNames of the file");
      //console.log(data13);
      let names = data.split("\n");
      deletingFile(names[0]);
      deletingFile(names[1]);
      deletingFile(names[2]);
    });
}
userfsPromiseProblem2();
