const spawn = require('child_process').spawn;

const carExpert = spawn('./carExpert');
const customerWithFaultyChoke = answerQuestionGenerator(carExpert.stdin);

function answerQuestion(readable, answer = 'yes') {
  return new Promise((resolve) => {
    if (!readable.write(`${answer}\n`)) {
      readable.once('drain', resolve);
    } else {
      process.nextTick(resolve);
    }
  });
}

function* answerQuestionGenerator(readable) {
  yield answerQuestion(readable, 'no');
  yield answerQuestion(readable, 'no');
  yield answerQuestion(readable, 'no');
  yield answerQuestion(readable, 'yes');
  yield answerQuestion(readable, 'no');
}

let responses = [];

const testEnd = setTimeout(() => {
  console.log({responses});
  carExpert.stdin.end();
}, 1000);

carExpert.stdout.on('data', (data) => {
  const message = `${data}`;
  responses.push(message);
  if (!message.trim().endsWith('(yes/no)')) {
    carExpert.stdin.end();
  } else {
    customerWithFaultyChoke.next();
  }
});

carExpert.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
carExpert.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
