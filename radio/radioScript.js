let customRadios;

// Rest of the JavaScript code...

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://radio/radio:ready", { method: "POST", body: "{}" })
        .catch(err => console.error("Error fetching radio: ", err));

    window.addEventListener("message", (event) => {
        const item = event.data;

        switch (item.type) {
            // Rest of the switch-case...
            default:
                console.error(`Unhandled message type: ${item.type}`);
        }
    });
});
