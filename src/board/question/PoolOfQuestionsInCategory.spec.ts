import { PoolOfQuestionsInCategory } from "./PoolOfQuestionsInCategory";

it("should generate a pool of questions according to category and pool size and allow to get questions", function () {
  const pool = new PoolOfQuestionsInCategory("Sports", 3);
  expect(pool.getNextQuestion()).toEqual("Sports Question 0");
  expect(pool.getNextQuestion()).toEqual("Sports Question 1");
  expect(pool.getNextQuestion()).toEqual("Sports Question 2");
});

it("should reshuffle a pool of questions if is exhausted for category", function () {
  const pool = new PoolOfQuestionsInCategory("Sports", 2);
  expect(pool.getNextQuestion()).toEqual("Sports Question 0");
  expect(pool.getNextQuestion()).toEqual("Sports Question 1");
  expect(pool.getNextQuestion()).toEqual("Sports Question 0");
});
