import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  listBrands = ["BWM", "SEAT", "VW", "AUDI", "SKODA"];
  listModelsBMW = ['1', '2', '3', '4', '5','leon', 'ibiza'];
  listModelSEAT = ['leon', 'ibiza'];

  constructor() { }

  GetBrands() {
    return this.listBrands;
  }
  GetModels() {
    return this.listModelsBMW;
  }
}
