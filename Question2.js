const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data = {}) {
        const event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            stopPropagation() {
                this.stopped = true;
            },
            stopped: false
        };

        let element = this;

        while (element) {
            event.currentTarget = element;
            element.emit(type, event);

            if (event.stopped) break;

            element = element.parent;
        }
    }
}

// Create elements
const documentElement = new Element("document");
const form = new Element("form", documentElement);
const button = new Element("button", form);

// Listeners
function buttonClick(event) {
    console.log("Button listener:", event.target.name,
        "currentTarget:", event.currentTarget.name);
}

function formClick(event) {
    console.log("Form listener:", event.target.name,
        "currentTarget:", event.currentTarget.name);
}

function documentClick(event) {
    console.log("Document listener:", event.target.name,
        "currentTarget:", event.currentTarget.name);
}

button.addEventListener("click", buttonClick);
form.addEventListener("click", formClick);
documentElement.addEventListener("click", documentClick);

console.log("Scenario A:");
button.dispatchEvent("click");

console.log("\nScenario B:");
form.on("click", (event) => {
    event.stopPropagation();
});
button.dispatchEvent("click");

console.log("\nScenario C:");
form.removeAllListeners("click");
button.dispatchEvent("click");

console.log("\nKeypress event:");
form.addEventListener("keypress", (event) => {
    console.log("Keypress on:", event.currentTarget.name);
});

form.dispatchEvent("keypress", { key: "Enter" });