
import { withPluginApi } from 'discourse/lib/plugin-api';

function initializeWithApi(api) {
  api.onToolbarCreate(toolbar => {
    toolbar.addButton({
      id: "think_critically",
      group: "extras",
      icon: "comments",
      perform: (editor) => {
        console.log(editor.getText())
      }
    });
  });
}

export default {
  name: 'socratic-button',
  initialize(container) {
    withPluginApi('0.12.0', api => initializeWithApi(api));
  }
};
