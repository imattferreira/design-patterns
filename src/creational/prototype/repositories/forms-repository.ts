import { Form } from "../entities/form";

export default interface FormsRepository {
  getById(formId: string): Promise<Form>;
  save(form: Form): Promise<void>;
}

export class FormsRepositoryInMemory implements FormsRepository {
  private forms: Form[];

  constructor() {
    this.forms = [];
  }

  async getById(formId: string): Promise<Form> {
    const form = this.forms.find((f) => f.formId === formId);

    if (!form) {
      throw new Error("Form not found");
    }

    return form;
  }

  async save(form: Form): Promise<void> {
    this.forms.push(form);
  }
}
