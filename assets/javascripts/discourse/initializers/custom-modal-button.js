import { withPluginApi } from "discourse/lib/plugin-api";
import MyModal from "../components/custom-modal";

function initializeWithApi(api) {
  api.modifyClass("component:d-editor", {
    pluginId: "socratic-modal",
    actions: {
      openSocraticModal(text, encodedTextValue) {
        this.modal.show(MyModal, {
          model: { textValue: text, Url: encodedTextValue },
        });
      },
    },
  });

  api.onToolbarCreate((toolbar) => {
    toolbar.addButton({
      id: "think_critically",
      group: "extras",
      icon: "socratic-icon",
      sendAction: (editor) => {
        const textValue = editor.getText();
        const test = encodeURIComponent(textValue);
        //Replace with actual URL
        const encodedTextValue = `https://socraticbot.framer.ai/agora?q=${test}`;
        toolbar.context.send("openSocraticModal", textValue, encodedTextValue);
      },
    });
  });

  api.modifySelectKit("toolbar-popup-menu-options").appendContent(() => {
    return [
      {
        name: "Launch Socratic Bot",
        icon: "socratic-icon",
        id: { name: undefined, action: () => getTextAreaValue(api) }, // Passing api to getTextAreaValue
      },
    ];
  });
}

function getTextAreaValue(api) {
  // Select the textarea element with the specified classes
  const textarea = document.querySelector(
    ".ember-text-area.ember-view.d-editor-input",
  );

  // Check if textarea is found
  if (textarea) {
    // Retrieve the value of the textarea
    const textValue = textarea.value;
    const test = encodeURIComponent(textValue);
    //Replace with actual URL
    //TO DO: Considerar pass the base URL as param or with .env, could be fun !
    const encodedTextValue = `https://socraticbot.framer.ai/agora?q=${test}`;

    // Open the modal
    const context = api.container.lookup("component:d-editor");
    context.send("openSocraticModal", textValue, encodedTextValue);

    // Do something with the retrieved text value
    // console.log("Textarea value:", textValue);
  } else {
    throw new Error("Textarea element not found.");
  }
}

export default {
  name: "socratic-button",
  initialize() {
    withPluginApi("0.12.0", (api) => initializeWithApi(api));
  },
};
