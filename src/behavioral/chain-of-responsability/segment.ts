class Segment {
  constructor(readonly distance: number, readonly date: Date) {
    if (!this.isValidDistance()) {
      throw new Error("invalid distance");
    }

    if (!this.isValidDate()) {
      throw new Error("invalid date");
    }
  }

  isValidDistance() {
    return (
      !!this.distance && typeof this.distance === "number" && this.distance > 0
    );
  }

  isValidDate() {
    return (
      !!this.date &&
      this.date instanceof Date &&
      this.date.toString() !== "Invalid date"
    );
  }

  isOvernight() {
    return this.date.getHours() >= 22 || this.date.getHours() <= 6;
  }

  isSunday() {
    return this.date.getDay() === 0;
  }
}

export default Segment;
