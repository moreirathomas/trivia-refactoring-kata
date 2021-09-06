import * as fs from "fs";
import { Game } from ".";

const ROOT_PATH = "./src/logs";

function generateFilePaths(testIndex: number) {
  return {
    master: `${ROOT_PATH}/master_${testIndex}.txt`,
    actual: `${ROOT_PATH}/actual_${testIndex}.txt`,
  };
}

function redirectLogsToFile(path: string): void {
  console.log = function (text: string): void {
    fs.appendFileSync(
      path,
      `${text}
`
    );
  };
}

function eraseFile(path: string): void {
  fs.writeFileSync(path, "");
}

function runGoldenMaster(testIndex: number, scenario: () => void): void {
  const { master, actual } = generateFilePaths(testIndex);

  function createMaster(): void {
    redirectLogsToFile(master);
    scenario();
  }

  function compareActualToMaster(): void {
    eraseFile(actual);
    redirectLogsToFile(actual);
    scenario();
    expect(fs.readFileSync(actual)).toEqual(fs.readFileSync(master));
  }

  if (!fs.existsSync(master)) {
    createMaster();
  } else {
    compareActualToMaster();
  }
}

it("Scenario #0: a 3-players game where all users answer correctly", function () {
  runGoldenMaster(0, function () {
    const game = new Game();
    game.add("Chloe");
    game.add("Omar");
    game.add("Sebastian");
    game.roll(3);
    console.log(game.wasCorrectlyAnswered());
    game.roll(1);
    console.log(game.wasCorrectlyAnswered());
    game.roll(4);
    console.log(game.wasCorrectlyAnswered());
    game.roll(3);
    console.log(game.wasCorrectlyAnswered());
    game.roll(1);
    console.log(game.wasCorrectlyAnswered());
    game.roll(4);
    console.log(game.wasCorrectlyAnswered());
    game.roll(3);
    console.log(game.wasCorrectlyAnswered());
    game.roll(1);
    console.log(game.wasCorrectlyAnswered());
    game.roll(4);
    console.log(game.wasCorrectlyAnswered());
    game.roll(3);
    console.log(game.wasCorrectlyAnswered());
    game.roll(1);
    console.log(game.wasCorrectlyAnswered());
    game.roll(4);
    console.log(game.wasCorrectlyAnswered());
    game.roll(3);
    console.log(game.wasCorrectlyAnswered());
    game.roll(1);
    console.log(game.wasCorrectlyAnswered());
    game.roll(4);
    console.log(game.wasCorrectlyAnswered());
    game.roll(3);
    console.log(game.wasCorrectlyAnswered());
    game.roll(1);
    console.log(game.wasCorrectlyAnswered());
    game.roll(4);
    console.log(game.wasCorrectlyAnswered());
    game.roll(3);
    console.log(game.wasCorrectlyAnswered());
    game.roll(1);
    console.log(game.wasCorrectlyAnswered());
    game.roll(4);
    console.log(game.wasCorrectlyAnswered());
  });
});

it("Scenario #1: a 2-players game with some wrong answers, hence penalty box", function () {
  runGoldenMaster(1, function () {
    const game = new Game();
    game.add("Chloe");
    game.add("Omar");
    game.roll(3);
    console.log(game.wasCorrectlyAnswered());
    game.roll(2);
    console.log(game.wasCorrectlyAnswered());
    game.roll(3);
    console.log(game.wrongAnswer());
    game.roll(2);
    console.log(game.wasCorrectlyAnswered());
    game.roll(2);
    console.log(game.wasCorrectlyAnswered());
    game.roll(2);
    // The next line is necessary, even if no question is poped, because it allows to move to the next player (!)
    console.log(game.wasCorrectlyAnswered());
    game.roll(5);
    console.log(game.wrongAnswer());
    game.roll(2);
    console.log(game.wasCorrectlyAnswered());
    game.roll(5);
    console.log(game.wasCorrectlyAnswered());
    game.roll(2);
    console.log(game.wasCorrectlyAnswered());
  });
});
