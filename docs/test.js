"use strict";
(function (q) {
    if (!ezDlg.isSupported()) {
        alert("EZ Dialog is not supported on this browser.");
        Array.from(document.querySelectorAll("button,input")).forEach(v => v.disabled = true);
        return;
    }
    const setStyle = function (enable) {
        var style = Array.from(document.styleSheets).filter(v => v.href && !!v.href.match(/ez\-classic/))[0];
        if (style) {
            style.disabled = !enable;
        }
        return !!style;
    };

    //Styling option
    if (q("#cbStyle")) {
        q("#cbStyle").addEventListener("change", function () {
            setStyle(this.checked);
        });
        setStyle(q("#cbStyle").checked);
    }

    //Test button for first example
    if (q("#btnTestAlert")) {
        q("#btnTestAlert").addEventListener("click", async function () {
            await ezDlg().alert("Hello, World!", "alert() test");
            const p = Object.assign(document.createElement("p"), {
                innerHTML: "You can add <b style=\"color:red\">entire</b> HTML elements"
            });
            await ezDlg().confirm(p, "confirm() test");
            await ezDlg().prompt(p, null, "prompt() test");
            await ezDlg().custom(p, "custom() test");
        });
    }

    //Standard alert
    if (q("#btnAlert")) {
        q("#btnAlert").addEventListener("click", async function () {
            const dlg = ezDlg(q("#cbAlertClick").checked);
            const resultBox = q("#tbAlertResult");
            resultBox.textContent = "Dialog opened at " + (new Date()).toLocaleTimeString();
            await dlg.alert(q("#tbAlertBody").value, q("#tbAlertTitle").value, q("#tbAlertButton").value);
            resultBox.textContent += ", closed at " + (new Date()).toLocaleTimeString();
        });
    }
    //Standard confirm
    if (q("#btnConfirm")) {
        q("#btnConfirm").addEventListener("click", async function () {
            const dlg = ezDlg(q("#cbConfirmClick").checked);
            const resultBox = q("#tbConfirmResult");
            resultBox.textContent = "Dialog opened at " + (new Date()).toLocaleTimeString();
            const result = await dlg.confirm(
                    q("#tbConfirmBody").value,
                    q("#tbConfirmTitle").value,
                    q("#tbConfirmButton1").value,
                    q("#tbConfirmButton2").value);
            resultBox.textContent += ", closed at " + (new Date()).toLocaleTimeString() + ", result: " + result;
        });
    }
    //Standard prompt
    if (q("#btnPrompt")) {
        q("#btnPrompt").addEventListener("click", async function () {
            const dlg = ezDlg(q("#cbPromptClick").checked);
            const resultBox = q("#tbPromptResult");
            resultBox.textContent = "Dialog opened at " + (new Date()).toLocaleTimeString();
            const result = await dlg.prompt(
                    q("#tbPromptBody").value,
                    q("#tbPromptPrefill").value,
                    q("#tbPromptTitle").value,
                    q("#tbPromptButton1").value,
                    q("#tbPromptButton2").value);
            resultBox.textContent += ", closed at " + (new Date()).toLocaleTimeString() + ", result: " + result;
        });
    }
    //Custom dialog
    if (q("#btnCustom")) {
        q("#btnCustom").addEventListener("click", async function () {
            //All buttons of the dialog
            const btn = [{
                    value: "OK button",
                    text: "OK",
                }, {
                    value: "Middle button",
                    text: "Disabled unless checkbox activated"
                }, {
                    value: "Cancel button",
                    text: "Cancel",
                    isCancel: true
                }
            ];
            //Base body content
            const body = [
                "Demonstration of custom events. " +
                "Check the checkbox to enable the button in the middle",
                document.createElement("label")
            ];
            //Add a checkbox and text into the label
            const checkbox = body[1].appendChild(document.createElement("input"));
            body[1].insertAdjacentText("beforeend", " Check Me");
            //Create and show dialog
            const dlg = ezDlg(q("#cbCustomClick").checked);
            const dialog = dlg.custom(body, "Custom dialog box", btn);
            //Add custom handling for the middle button
            btn[1].buttonElement.disabled = true;
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function () {
                btn[1].buttonElement.disabled = !this.checked;
            });
            //Wait for dialog to close and show result
            const result = (await dialog) || "None (clicked outside of dialog)";
            await dlg.alert("Clicked button: " + result);
        });
    }
    //No buttons
    if (q("#btnNoButtons")) {
        q("#btnNoButtons").addEventListener("click", async function () {
            await ezDlg().custom("You can close it with the [ESC] key or by clicking outside", "A dialog with no buttons", []);
        });
    }

    if (q("#btnStack")) {
        //Test dialog stack
        q("#btnStack").addEventListener("click", async function () {
            var dlg = ezDlg();
            await Promise.all([
                    dlg.alert("Dialog 1 with a long text", "Dialog 1"),
                    dlg.alert("Dialog 2", "Dialog 2"),
                    dlg.confirm("Dialog 3", "Dialog 3"),
                    dlg.prompt("Dialog 4", "Dialog 4", "Dialog 4"),
                ]);
        });
    }
})(document.querySelector.bind(document));
