import { DiceRoll } from ".";

export interface Board {
  computeLocationAfterRoll(location: number, roll: DiceRoll): number;
  askQuestion(location: number): string;
}
