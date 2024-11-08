import { describe, expect, it } from "vitest";
import SignUp from "./signup";
import Login from "./login";

describe("SignUp", () => {
  it("should create a user account", async () => {
    const signUp = new SignUp();
    const login = new Login();

    const signUpInput = {
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    };
    const loginInput = {
      email: "john@doe.com",
      password: "123456",
    };

    await signUp.execute(signUpInput);

    const outputLogin = await login.execute(loginInput);

    expect(outputLogin.success).toBe(true);
  });
});
