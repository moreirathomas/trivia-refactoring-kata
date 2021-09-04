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

it("Scenario #0", function () {
  runGoldenMaster(0, function () {
    const game = new Game();
    game.add("Anna");
    game.add("Thomas");
    game.add("Pauline");
    game.roll(3);
    game.wasCorrectlyAnswered();
  });
});

it("Scenario #1", function () {
  runGoldenMaster(1, function () {
    const game = new Game();
    game.add("Chloe");
    game.add("Omar");
    game.add("Sebastian");
    game.roll(1);
    game.wrongAnswer();
  });
});
