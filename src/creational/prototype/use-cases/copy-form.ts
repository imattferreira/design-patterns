import { Form } from "../entities/form";
import FormsRepository from "../repositories/forms-repository";

interface Input {
  fromFormId: string;
  newFormId: string;
  newCategory: string;
  newDescription: string;
}

export class CopyForm {
  constructor(readonly formsRepository: FormsRepository) {}

  async execute(input: Input): Promise<void> {
    const form = await this.formsRepository.getById(input.fromFormId);
    const newForm = form.clone();

    newForm.formId = input.newFormId;
    newForm.category = input.newCategory;
    newForm.description = input.newDescription;

    await this.formsRepository.save(newForm);
  }
}
