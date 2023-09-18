const customRadios = [];
let isPlaying = false;
let index = -1;
let volume = getVolume();
let previousVolume = volume;

function getVolume() {
    return GetProfileSetting(306) / 10;
}

function createRadios() {
    const length = GetNumResourceMetadata("radio", "supersede_radio");
    for (let i = 0; i < length; i++) {
        addRadioFromMetadata(i);
    }
    sendNuiMessage("create", { "radios": customRadios, "volume": volume });
}

function addRadioFromMetadata(i) {
    const radio = GetResourceMetadata("radio", "supersede_radio", i);

    if (!availableRadios.includes(radio)) {
        console.error(`radio: ${radio} is an invalid radio.`);
        return;
    }

    try {
        const data = JSON.parse(GetResourceMetadata("radio", "supersede_radio_extra", i));
        if (data) {
            customRadios.push({
                "isPlaying": false,
                "name": radio,
                "data": data
            });
            if (data.name) {
                AddTextEntry(radio, data.name);
            }
        } else {
            console.error(`radio: Missing data for ${radio}.`);
        }
    } catch (e) {
        console.error(`Error parsing metadata for radio ${radio}:`, e);
    }
}

function sendNuiMessage(type, data) {
    SendNuiMessage(JSON.stringify(Object.assign({"type": type}, data)));
}

createRadios();

RegisterNuiCallbackType("radio:ready");
on("__cfx_nui:radio:ready", (data, cb) => {
    previousVolume = -1;
    createRadios();
});

function handleRadioBehavior() {
    if (IsPlayerVehicleRadioEnabled()) {
        const playerRadioStationName = GetPlayerRadioStationName();
        const customRadio = customRadios.find(radio => radio.name === playerRadioStationName);

        if (!isPlaying && customRadio) {
            PlayCustomRadio(customRadio);
        } else if (isPlaying && customRadio && customRadios.indexOf(customRadio) !== index) {
            StopCustomRadios();
            PlayCustomRadio(customRadio);
        } else if (isPlaying && !customRadio) {
            StopCustomRadios();
        }
    } else if (isPlaying) {
        StopCustomRadios();
    }
}

setTick(() => {
    handleRadioBehavior();

    volume = getVolume();
    if (previousVolume !== volume) {
        sendNuiMessage("volume", { "volume": volume });
        previousVolume = volume;
    }
});
