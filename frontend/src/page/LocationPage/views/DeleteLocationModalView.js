import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import ModalView from "@/common/views/ModalView";

export default class DeleteLocationModalView extends ModalView {
  constructor(element = qs("#location-delete-modal")) {
    super(element);

    this.locationNameElement = qs("#location-name", this.element);
    this.cancelBtnElement = qs("#cancel-btn", this.element);
    this.acceptBtnElement = qs("#accept-btn", this.element);

    this.eventsBinding();
  }

  eventsBinding() {
    on(this.cancelBtnElement, "click", (e) =>
      this.handleCancelButtonClickEvent()
    );
    on(this.acceptBtnElement, "click", (e) =>
      this.handleAcceptButtonClickEvent()
    );
  }

  handleCancelButtonClickEvent() {
    this.emit("@close-delete-modal");
  }

  handleAcceptButtonClickEvent() {
    this.emit("@delete-location");
  }

  show(location) {
    super.show();
    this.locationNameElement.innerText = '"' + location + '"';
  }
}
