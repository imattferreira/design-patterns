import Account from "./account";

class Driver extends Account {
  constructor(
    name: string,
    email: string,
    document: string,
    readonly carPlate: string,
    password: string
  ) {
    super(name, email, document, password, "plaintext");

    if (!carPlate.match(/[A-Z]{3}[0-9]{4}/g)) {
      throw new Error("Invalid car plate");
    }
  }
}

export default Driver;
