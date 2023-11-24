// Problem 2:

// Using callbacks and the fs module's asynchronous functions, do the following:
//     1. Read the given file lipsum.txt
//     2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//     3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
//     4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//     5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

const fs = require("fs");
function conversion() {
  fs.readFile(
    "/home/aviral/Desktop/javascript/callbackassignment/lipsum.txt",
    "utf8",
    (err, data) => {
      if (err) console.error(err);

      const uppercaseContent = data.toUpperCase();
      fs.writeFile("uppercase.txt", uppercaseContent, "utf8", (err) => {
        if (err) console.error(err);
        fs.appendFile("filenames.txt", "uppercase.txt\n", "utf8", (err) => {
          if (err) console.error(err);
          fs.readFile("uppercase.txt", "utf8", (err, upperContent) => {
            if (err) console.error(err);

            const lowercaseContent = upperContent.toLowerCase();
            const sentences = lowercaseContent.split(".");
            fs.writeFile(
              "lowercase_sentences.txt",
              sentences.join("\n"),
              "utf8",
              (err) => {
                if (err) console.error(err);
                fs.appendFile(
                  "filenames.txt",
                  "lowercase_sentences.txt\n",
                  "utf8",
                  (err) => {
                    if (err) console.error(err);
                    fs.readFile(
                      "uppercase.txt",
                      "utf8",
                      (err, uppercaseContent) => {
                        if (err) console.error(err);

                        const sortedContent = lowercaseContent
                          .split(" ")
                          .sort()
                          .join(" ");
                        fs.writeFile(
                          "sorted_content.txt",
                          sortedContent,
                          "utf8",
                          (err) => {
                            if (err) console.error(err);
                            fs.appendFile(
                              "filenames.txt",
                              "sorted_content.txt\n",
                              "utf8",
                              (err) => {
                                if (err) console.error(err);
                                fs.readFile(
                                  "filenames.txt",
                                  "utf8",
                                  (err, filenames) => {
                                    if (err) console.error(err);

                                    const filesToDelete = filenames
                                      .split("\n")
                                      .filter(Boolean);
                                    filesToDelete.forEach((file) => {
                                      fs.unlink(file, (err) => {
                                        if (err) console.error(err);
                                      });
                                    });
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          });
        });
      });
    }
  );
}
module.exports.conversion = conversion;
