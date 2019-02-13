class BinaryResponse {
  constructor(userInput, affirmativeAction, negativeAction) {
    this.userInput = userInput;
    this.affirmativeAction = affirmativeAction;
    this.negativeAction = negativeAction;
  }
  
  async collect() {
    const userResponse = await this.userInput();
    return userResponse ? this.affirmativeAction() : this.negativeAction();
  }
}

module.exports = BinaryResponse;
