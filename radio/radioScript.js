(function() {
    const customRadios = [];

    document.addEventListener("DOMContentLoaded", () => {
        initializeRadio();
        setupMessageListener();
    });

    function initializeRadio() {
        fetch("http://radio/radio:ready", { method: "POST", body: "{}" })
            .catch(err => console.error("Error initializing radio: ", err));
    }

    function setupMessageListener() {
        window.addEventListener("message", (event) => {
            const messageData = event.data;

            switch (messageData.type) {
                // Rest of the switch-case...
                default:
                    console.error(`Unhandled message type: ${messageData.type}`);
            }
        });
    }
})();
