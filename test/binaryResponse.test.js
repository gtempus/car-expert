const {expect} = require('chai');
const BinaryResponse = require('../src/binaryResponse');

const dummyUserInput = (userResponse) => () => 'yes' == userResponse;

describe('BinaryResponse', () => {
  const actionStub = () => {};
  let actionCalled;

  const mockAction = () => {
    actionCalled = true;
  };
  
  beforeEach(() => {
    actionCalled = false;
  });
  
  it('calls affirmative then the answer is `yes`', () => {
    const affirmativeInput = dummyUserInput('yes');
    const response = new BinaryResponse(affirmativeInput, mockAction, actionStub);

    return response.collect()
      .then((response) => expect(actionCalled, 'Affirmative action was not called').to.equal(true));
  });
  it('calls negative then the answer is `no`', () => {
    const negativeInput = dummyUserInput('no');
    const response = new BinaryResponse(negativeInput, actionStub, mockAction);

    return response.collect()
      .then((response) => expect(actionCalled, 'Negative action was not called').to.equal(true));
  });
});
