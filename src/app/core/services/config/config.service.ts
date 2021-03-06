import { Injectable } from '@angular/core';

import * as ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private store: ElectronStore = new ElectronStore();

  constructor() {}

  private get hasConfig(): boolean {
    return this.store.has('config');
  }

  get config(): Config {
    if(!this.hasConfig) {
      const config = Config.default;
      this.store.set('config', config);
      return config;
    }
    return this.store.get('config') as Config;
  }

  public saveConfig(config: Config) {
    this.store.set('config', config);
  }

  public clearConfig() {
    this.store.delete('config');
  }

}

export const langs: string[] = ['zh_CN', 'en_US'];

export class Config {
  public defaultLang: string;
  public autoSave: boolean;
  public initAndLoad: boolean;
  public loadHistoryAppData: boolean;
  public defaultServerPort: number;
  public defaultLayout: string;
  public static default: Config = {
    defaultLang: 'zh_CN',
    autoSave: true,
    initAndLoad: false,
    loadHistoryAppData: false,
    defaultServerPort: 4000,
    defaultLayout: 'post'
  }
}