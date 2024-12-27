import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  retrieve = (key: string): any => {
    return localStorage.getItem(key);
  }

  store = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }

  remove = (key: string) => {
    localStorage.removeItem(key);
  }
}
