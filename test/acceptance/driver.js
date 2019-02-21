const spawn = require('child_process').spawn;

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

const carExpert = spawn('./carExpert');
const answers = answerQuestionGenerator(carExpert.stdin);
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
    answers.next();
  }
});

carExpert.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
carExpert.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
