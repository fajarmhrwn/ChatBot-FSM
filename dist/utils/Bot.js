"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Mewakili Bot yang digunakan untuk merespons pesan dan mengubah state.
 * Implementasi menggunakan Finite State Machine.
 * @class
 */
class Bot {
    state;
    event;
    callbacks;
    response;
    constructor(convFlow) {
        this.state = "greetings";
        this.event = "";
        this.callbacks = {};
        this.response = { messages: [], options: [] };
        this.createOrchestrator(convFlow);
    }
    createOrchestrator(convFlow) {
        for (const step of convFlow) {
            this.addConversationStep(step.id, step.response);
        }
    }
    addConversationStep(name, response) {
        const self = this;
        this.add(name, function () {
            self.setResponse(response);
        });
    }
    add(_case, fn) {
        this.callbacks[_case] = this.callbacks[_case] || [];
        this.callbacks[_case].push(fn);
    }
    pseudoSwitch() {
        const currentStateCallbacks = this.callbacks[this.state];
        if (currentStateCallbacks) {
            currentStateCallbacks.forEach((fn) => fn());
        }
    }
    setResponse(response) {
        if (this.event) {
            this.setState(response.options);
        }
        this.response = response;
    }
    /**
     * Mengembalikan respons dalam format eksternal (ResponseData)
     */
    getResponse() {
        this.event = "";
        this.pseudoSwitch();
        return {
            messages: this.response.messages,
            options: this.response.options.map(button => button.display),
        };
    }
    /**
     * Menerima input dan mengembalikan respons dalam format eksternal
     */
    talk(event = "") {
        const prevState = this.state;
        if (event) {
            this.event = event;
            this.pseudoSwitch();
        }
        if (prevState == this.state) {
            return {
                messages: ["Sorry, I don't understand. Please choose one of the options."],
                options: this.response.options.map(button => button.display),
            };
        }
        return this.getResponse();
    }
    setState(options) {
        const chosenOption = options.find(option => option.display.toLowerCase() === this.event.toLowerCase());
        if (chosenOption) {
            this.state = chosenOption.state;
        }
    }
}
exports.default = Bot;
//# sourceMappingURL=bot.js.map