export class Score {
  private score = 0;

  get(): number {
    return this.score;
  }

  increment(): void {
    this.score += 1;
  }
}
