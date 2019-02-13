const readline = require('readline');

const userInputFromStdIn = (queryText) => () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question(`${queryText} (yes/no) `, (answer) => {
      resolve('yes' == answer);
      rl.close();
    });
  });
};

module.exports = userInputFromStdIn;
