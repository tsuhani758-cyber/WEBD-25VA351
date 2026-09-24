const EventEmitter = require("events");

class SessionManager extends EventEmitter {
    constructor() {
        super();

        this.on("greet", (username) => {
            console.log(`Hello, ${username}! Welcome.`);
        });

        this.on("exit", (code) => {
            console.log(`Session closed with code ${code}. Goodbye!`);
        });

        this.once("greet", () => {
            console.log("First greet listener fired");
        });
    }

    trigger(command, ...args) {
        if (command === "greet" || command === "exit") {
            this.emit(command, ...args);
        } else {
            console.log(`Unknown event: ${command}`);
        }
    }
}

const session = new SessionManager();

session.trigger("greet", "Suhani");
session.trigger("greet", "Rahul");
session.trigger("greet", "Priya");

console.log("Greet listeners:", session.listenerCount("greet"));

session.trigger("exit", 0);
session.trigger("login");

session.on("error", (msg) => {
    console.log("Custom error:", msg);
});

session.emit("error", "Something went wrong!");