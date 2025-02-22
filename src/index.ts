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
      name: 'jupyter_darkmodern',
      isLight: true,
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
  }
};

export default plugin;
