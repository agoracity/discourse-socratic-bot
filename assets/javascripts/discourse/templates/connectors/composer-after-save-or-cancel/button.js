export default {
  actions: {
    submitContent() {
      // Get the textarea element using document.querySelector
      const textarea = document.querySelector(
        "textarea.ember-text-area.ember-view.d-editor-input"
      );

      // Check if the textarea element exists
      if (textarea) {
        // Get the text value of the textarea
        const textValue = textarea.value;
        console.log(textValue); // Output the text value to the console
      } else {
        console.error("Textarea element not found.");
      }
    },
  },
};
