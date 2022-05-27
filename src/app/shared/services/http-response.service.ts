import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseService {

  //Initialize return variable
  returnVar: string = '';

  constructor() { }

  //Convert method
  convert(response: string) {
    switch (response) {
      case 'EMAIL_EXISTS': {
        this.returnVar = 'This email already exists.';
        return this.returnVar;
      }
      case 'EMAIL_NOT_FOUND': {
        this.returnVar = 'Email does not exist!';
        return this.returnVar;
      }
      case 'INVALID_PASSWORD': {
        this.returnVar = 'Invalid password!';
        return this.returnVar;
      }
      default: return 'An error has occurred.';
    }
  }

  //Response to Array with its own ID
  responseToArray(response: any) {
    const array: any[] = [];
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        array.push({...response[key], id: key});
      }
    }
    return array;
  }

}
