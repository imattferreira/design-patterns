import Prototype from "../prototype";
import { Field } from "./field";

export class Form implements Prototype {
  fields: Field[];

  constructor(
    public formId: string,
    public category: string,
    public description: string
  ) {
    this.fields = [];
  }

  clone(): Form {
    const newForm = new Form(this.formId, this.category, this.description);
    const fields: Field[] = [];

    for (const field of this.fields) {
      fields.push(field.clone());
    }

    newForm.fields = fields;

    return newForm;
  }

  addField(type: string, title: string) {
    this.fields.push(Field.create(type, title));
  }
}
