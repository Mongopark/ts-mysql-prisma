import { EventEmitter } from "node:events";
import { Email } from "./types/email";

interface CustomEvents {
  email: Email;
}
class AppEmitter extends EventEmitter {
  constructor() {
    super();
  }
  publish<T extends keyof CustomEvents>(eventName: T, data: CustomEvents[T]) {
    this.emit(eventName, data);
  }

  onEvent<T extends keyof CustomEvents>(
    eventName: T,
    listener: (data: CustomEvents[T]) => void
  ) {
    this.on(eventName, listener);
  }
}

export const appEmitter = new AppEmitter();
