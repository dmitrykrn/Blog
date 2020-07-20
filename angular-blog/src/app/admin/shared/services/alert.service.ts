import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export enum AlertType {
  success,
  warning,
  danger
}

export class Alert {
  constructor(
    public type: AlertType,
    public text: string
  ) {}
}

@Injectable()
export class AlertService {
  public alertEvent$ = new Subject<Alert>();
  constructor() {}

  public success(text: string){
    this.alertEvent$.next(
      new Alert(AlertType.success, text)
      );
  }

  public warning(text: string){
    this.alertEvent$.next(
      new Alert(AlertType.warning, text)
      );
  }

  public danger(text: string){
    this.alertEvent$.next(
      new Alert(AlertType.danger, text)
      );
  }
}
