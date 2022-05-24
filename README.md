# EZ Dialog

A component for the new `<dialog>` element

## Installation

Include `ez-dialog.js` in your HTML pages.
You can do so directly or by bundling it with your other scripts.
EZ Dialog has no dependencies, so the order in which you bundle doesn't matters.

## Usage

Open a dialog with:

    await ezDlg().alert("Hello, World!", "Hi", "Hello");

This shows a dialog with the text "Hello, World!", the tite "Hi" and the OK button with the text "Hello"

Other dialogs include:

- `boolean confirm(text, title, buttonOK, buttonCancel)`
- `string prompt(text, prefill, title, buttonOK, buttonCancel)`

The argument order is chosen so you can use them as an async replacement to the native `window.(alert|confirm|prompt)` dialog windows.

An additonal .custom(...) dialog is provided for you to add custom content.

For a more detailed overview, check the "docs" folder,
or visit https://cable.ayra.ch/ez-dlg/docs/

## Styling

No style is applied by default.
The `ez-classic.css` file is provided as an example style that mimics classic Windows® dialog boxes.
The documentation contains hints as to how you can style your own dialog boxes.


