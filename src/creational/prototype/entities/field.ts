import { randomUUID } from "crypto";
import Prototype from "../prototype";

export class Field implements Prototype {
  constructor(
    readonly fieldId: string,
    readonly type: string,
    readonly title: string
  ) {}

  // Prototype
  clone(): Field {
    return new Field(this.fieldId, this.type, this.title);
  }

  static create(type: string, title: string) {
    return new Field(randomUUID(), type, title);
  }
}
