import { describe, expect, it } from "vitest";
import { FormsRepositoryInMemory } from "../repositories/forms-repository";
import { CopyForm } from "./copy-form";
import { Form } from "../entities/form";

describe("CopyForm", () => {
  it("should copy a form", async () => {
    const formsRepository = new FormsRepositoryInMemory();
    const copyForm = new CopyForm(formsRepository);

    const form = new Form("1", "Marketing", "Leads v1");

    form.addField("text", "name");
    form.addField("text", "email");

    formsRepository.save(form);

    const input = {
      fromFormId: "1",
      newFormId: "2",
      newCategory: "Marketing",
      newDescription: "Leads v2",
    };

    await copyForm.execute(input);

    const newForm = await formsRepository.getById("2");

    expect(newForm.category).toBe("Marketing");
    expect(newForm.description).toBe("Leads v2");
    expect(newForm.fields).toHaveLength(2);
    expect(newForm.fields.at(0)?.title).toBe("name");
    expect(newForm.fields.at(1)?.title).toBe("email");
  });
});
