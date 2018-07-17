const fs = require("fs");

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" " ));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler(userInputArray.slice(0));
  }
}

const commandLibrary = {
  "echo": function(userInput) {
    done(userInput);
  },
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  "head": function(fullPath) {
    const lines = 5;
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, fullFile) => {
      const splitByLine = fullFile.split(/\n/);
      let headLines = splitByLine.slice(0, Math.min(lines, splitByLine.length));
      headLines = headLines.join('\n');
      done(headLines);
    });
  },
  "tail": function(fullPath) {
    const lines = 25;
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, fullFile) => {
      const splitByLine = fullFile.split(/\n/);
      let tailLines = splitByLine.slice(-(Math.min(lines, splitByLine.length)));
      tailLines = tailLines.join('\n');
      done(tailLines);
    });
  },
  "errorHandler": function(command) {
    const message = `Your command "${command}" can't be found.`;
    done(message);
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;