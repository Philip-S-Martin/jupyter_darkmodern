import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the jupyter_darkmodern extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter_darkmodern:plugin',
  description: 'A JupyterLab theme to visually match VSCode\'s Dark Modern theme.',
  autoStart: true,
  requires: [IThemeManager],
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, manager: IThemeManager, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension jupyter_darkmodern is activated!');
    const style = 'jupyter_darkmodern/index.css';

    manager.register({
      name: 'Jupyter Dark Modern',
      isLight: false,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jupyter_darkmodern settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for jupyter_darkmodern.', reason);
        });
    }

    // Add code to adjust the color of specific elements
    const adjustElementColor = () => {
      const elements = document.querySelectorAll(".jp-RenderedText[data-mime-type='application/vnd.jupyter.stderr'] .ansi-bold");
      console.log(`Found ${elements.length} elements`);
      elements.forEach(function(element) {
        const htmlElement = element as HTMLElement;
        console.log(`Element color before: ${htmlElement.style.color}`);
        if (htmlElement.style.color === 'rgb(0,0,255)') {
          htmlElement.style.color = 'rgb(255,0,0)'; // Change to the desired color
          console.log(`Element color after: ${htmlElement.style.color}`);
        }
      });
    };

    // Run the function initially
    adjustElementColor();

    // Optionally, you can set an observer to monitor changes and adjust colors dynamically
    const observer = new MutationObserver(adjustElementColor);
    observer.observe(document.body, { childList: true, subtree: true });
  }
};

export default plugin;