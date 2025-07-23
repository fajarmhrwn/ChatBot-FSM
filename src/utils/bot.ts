/**
 * Mewakili Bot yang digunakan untuk merespons pesan dan mengubah state.
 * Implementasi menggunakan Finite State Machine.
 * @class
 */
export default class Bot {
  state: string;
  event: string;
  callbacks: { [key: string]: (() => void)[] };
  response: InternalResponseData;

  constructor(convFlow: ConversationStep[]) {
    this.state = "greetings";
    this.event = "";
    this.callbacks = {};
    this.response = { messages: [], options: [] };
    this.createOrchestrator(convFlow);
  }

  createOrchestrator(convFlow: ConversationStep[]): void {
    for (const step of convFlow) {
      this.addConversationStep(step.id, step.response);
    }
  }

  addConversationStep(name: string, response: InternalResponseData): void {
    const self = this;
    this.add(name, function() {
      self.setResponse(response);
    });
  }

  add(_case: string, fn: () => void): void {
    this.callbacks[_case] = this.callbacks[_case] || [];
    this.callbacks[_case].push(fn);
  }

  pseudoSwitch(): void {
    const currentStateCallbacks = this.callbacks[this.state];
    if (currentStateCallbacks) {
      currentStateCallbacks.forEach((fn) => fn());
    }
  }

  setResponse(response: InternalResponseData): void {
    if (this.event) {
      this.setState(response.options);
    }
    this.response = response;
  }

  /**
   * Mengembalikan respons dalam format eksternal (ResponseData)
   */
  getResponse(): ResponseData {
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
  talk(event: string = ""): ResponseData {
    const prevState = this.state
    if (event) {
      this.event = event;
      this.pseudoSwitch();
    }
    if(prevState == this.state){
      return {
      messages: ["Sorry, I don't understand. Please choose one of the options."],
      options: this.response.options.map(button => button.display),
     }
    }
    return this.getResponse();
  }

  setState(options: Option[]): void {
     const chosenOption = options.find(
      option => option.display.toLowerCase() === this.event.toLowerCase()
    );

    if (chosenOption) {
      this.state = chosenOption.state;
    }
  }
}
