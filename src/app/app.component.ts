import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from './core/services/electron/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { langs, ConfigService } from './core/services/config/config.service';
import { AppDataService } from './core/services/config/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  routerEvents: Subscription;

  constructor(
    public router: Router,
    public electronService: ElectronService,
    private translateService: TranslateService,
    private configService: ConfigService,
    private appDataService: AppDataService
    ) {
    translateService.addLangs(langs)
    translateService.setDefaultLang(configService.config.defaultLang);
    translateService.use(configService.config.defaultLang);
    /*
    console.log('AppConfig', AppConfig);
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    */
  }
  ngOnInit(): void {
    if(!this.configService.config.loadHistoryAppData) {
      this.appDataService.clearAppData();
    }
    this.routerEvents = this.router.events.subscribe((event) => {

    });
  }
  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
    if(this.configService.config.loadHistoryAppData) {
      this.appDataService.persist();
    }
  }

}
