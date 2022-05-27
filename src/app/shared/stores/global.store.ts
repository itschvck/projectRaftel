import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class GlobalStore {
    isLoginPage  : boolean = false;
    isPageLoading: boolean = false;
    personnel    : boolean = false;
}