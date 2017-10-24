function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        currency: document.querySelector("#currency").value
    });
}

//Restore the last selected one
function restoreOptions() {

    var getting = browser.storage.local.get("currency");
    getting.then(setCurrentChoice, onError);

    function setCurrentChoice(result) {
        document.querySelector("#currency").value = result.currency || "USD";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#currency").addEventListener("change", saveOptions);