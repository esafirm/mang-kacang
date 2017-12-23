import { processEvent } from './Handlers';

function createTestSetup(condition: HandlerCondition) {
  const mock = jest.fn();
  const result = processEvent(condition, mock);

  return {
    mock: mock,
    result: result
  };
}

test('Should continue process and the process is called', () => {
  const testSetup = createTestSetup({
    willHandle: true,
    continueProcess: true
  });

  expect(testSetup.mock).toBeCalled();
  expect(testSetup.result).toBe(true);
});

test('Should not continue, but the process is called', () => {
  const testSetup = createTestSetup({
    willHandle: true,
    continueProcess: false
  });

  expect(testSetup.mock).toBeCalled();
  expect(testSetup.result).toBe(false);
});

test('Should continue, but the process not called', () => {
  const testSetup = createTestSetup({
    willHandle: false,
    continueProcess: true
  });

  expect(testSetup.mock).not.toBeCalled();
  expect(testSetup.result).toBe(true);
});
