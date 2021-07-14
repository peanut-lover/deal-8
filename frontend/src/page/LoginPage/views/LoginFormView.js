import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
const tag = "[BasicHeaderView]";

export default class LoginFormView extends View {
  constructor(element = qs("#login-form")) {
    console.log(tag, "constructor");
    super(element);

    this.idInputElement = qs("#id-input", this.element);
    this.loginButtonElement = qs("#login-btn", this.element);
    this.bindingEvents();
  }

  bindingEvents() {
    on(this.loginButtonElement, "click", () => this.handleLoginButtonClick());
  }

  handleLoginButtonClick() {
    const value = this.idInputElement.value;
    this.emit("@login", { value }); // Login Event Dipatch to Controller
  }

  show() {
    super.show();
  }
}