import { InputModel, InputOptions } from "./input.model";
import { View, JetComponent } from "../core";
import { InputController } from "./input.controller";
import { InputInfernoView } from "./input.inferno.view";

class InputView extends View<InputModel> {
    initialize() {
        this.setView(InputInfernoView);
    }
}

export class Input extends JetComponent<InputModel> {
    constructor(container: HTMLElement | null, options?: InputOptions) {
        const model = new InputModel(options);

        super("Input", container, model, InputView, InputController);
    }
}