import { PoolOfQuestions } from "./PoolOfQuestions";

it("should create a pool of questions for each category, all with the same size", function () {
  const pool = new PoolOfQuestions(50);
  expect(pool.getNextQuestion("Pop")).toEqual("Pop Question 0");
  expect(pool.getNextQuestion("Science")).toEqual("Science Question 0");
  expect(pool.getNextQuestion("Sports")).toEqual("Sports Question 0");
  expect(pool.getNextQuestion("Rock")).toEqual("Rock Question 0");
});
