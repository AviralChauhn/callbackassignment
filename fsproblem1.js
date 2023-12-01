const fs = require("fs/promises");

function fsPromises1(path, randomFiles) {
  fs.access(path + "/Files")
    .then(() => {
      return createRandomFiles(path + "/Files/", randomFiles);
    })
    .catch((err) => {
      if (err.code === "ENOENT") {
        return fs
          .mkdir(path + "/Files")
          .then(createRandomFiles(path + "/Files/", randomFiles))
          .catch((err) => console.log(err));
      } else {
        console.log(err);
      }
    });
}
function createRandomFiles(path, randomFiles) {
  const fileCreationPromise = [];
  for (let i = 1; i <= randomFiles; i++) {
    const filePromise = fs
      .writeFile(path + `file${i}.json`, " ")
      .catch((err) => console.log(err))
      .then(() => {
        console.log(`file${i}.json`);
        return path + `file${i}.json`;
      })
      .catch((err) => console.log(err));
    fileCreationPromise.push(filePromise);
  }
  return Promise.all(fileCreationPromise).then((files) => {
    files.forEach((file, index) => {
      deleteRandomFiles(file, index + 1);
    });
  });
}
function deleteRandomFiles(path, randomFile) {
  fs.unlink(path)
    .then(() => console.log(`Deleted file${randomFile}.json`))
    .catch((err) => console.log(err));
}
fsPromises1("files", 3);
