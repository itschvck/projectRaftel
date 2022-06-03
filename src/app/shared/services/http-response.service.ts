import { Injectable } from '@angular/core';

@Injectable({
  providedIn : 'root'
})
export class HttpResponseService {

  // DECLARE AND/OR INITIALIZE PROPERTIES AND THEIR TYPES
  // STRINGS
  returnVar : string = '';

  constructor() { }

  // CONVERT METHOD
  convert(response : string) {
    switch (response) {
      case 'EMAIL_EXISTS'     : {
        this.returnVar = 'This email already exists.';
        return this.returnVar;
      }
      case 'EMAIL_NOT_FOUND'  : {
        this.returnVar = 'Email does not exist!';
        return this.returnVar;
      }
      case 'INVALID_PASSWORD' : {
        this.returnVar = 'Invalid password!';
        return this.returnVar;
      }
      default: return 'An error has occurred.';
    }
  }

  // HTTP RESPONSE TO ARRAY WITH ITS OWN ID
  httpResponseToArray(response : any) {
    const array : any[] = [];
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        array.push({ ...response[key], id: key });
      }
    }
    return array;
  }

}
