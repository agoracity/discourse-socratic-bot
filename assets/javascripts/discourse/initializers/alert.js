import { withPluginApi } from "discourse/lib/plugin-api";

function initializeWithApi(api) {
  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "think_critically",
      group: "extras",
      icon: "socratic-icon",
      perform: (editor) => {
        console.log(editor.getText());
        console.log(editor.selected.value);
      },
    });
  });

  api.modifySelectKit("toolbar-popup-menu-options").appendContent(() => {
    return [
      {
        name: "Launch Socratic Bot",
        icon: "socratic-icon",
        id: { name: undefined, action: () => getTextAreaValue() }, // Using a function to get the text value
      },
    ];
  });
}

function getTextAreaValue() {
  // Select the textarea element with the specified classes
  const textarea = document.querySelector(".ember-text-area.ember-view.d-editor-input");

  // Check if textarea is found
  if (textarea) {
    // Retrieve the value of the textarea
    const textValue = textarea.value;

    // Do something with the retrieved text value
    console.log("Textarea value:", textValue);
  } else {
    console.error("Textarea element not found.");
  }
}

export default {
  name: "socratic-button",
  initialize(container) {
    withPluginApi("0.12.0", (api) => initializeWithApi(api));
  },
};
