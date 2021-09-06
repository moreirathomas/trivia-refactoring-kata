export class Score {
  private score = 0;

  constructor(private readonly playerName: String) {}

  get(): number {
    return this.score;
  }

  increment(): void {
    this.score += 1;
    console.log(`${this.playerName} now has ${this.score} Gold Coins.`);
  }
}
