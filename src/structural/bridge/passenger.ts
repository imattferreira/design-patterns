import Account from "./account";

class Passenger extends Account {
  constructor(
    name: string,
    email: string,
    document: string,
    readonly cardHolder: string,
    readonly cardNumber: string,
    readonly expDate: string,
    readonly cvv: string,
    password: string,
    passwordType = "plaintext"
  ) {
    super(name, email, document, password, passwordType);

    if (cvv.length !== 3) {
      throw new Error("Invalid cvv");
    }
  }
}

export default Passenger;
