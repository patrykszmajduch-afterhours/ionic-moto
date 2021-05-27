import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { AdvertisementService } from '../services/advertisement.service';
import { SearchService } from '../services/search.service';
import { AdvertisementDTO } from '../dto/advertisement-dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'custom-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor(private advService: AdvertisementService, private sService: SearchService) {  }
  criteria: SearchCriteria = {} as SearchCriteria;
  brandsList = ["BWM", "SEAT", "VW", "AUDI", "SKODA"];
  modelList = ['1', '2', '3', '4', '5','leon', 'ibiza'];
  @Output("offers") offers = new EventEmitter<AdvertisementDTO[]>();

  ngOnInit() {
    this.brandsList = this.sService.GetBrands();
    this.modelList = this.sService.GetModels();
    this.advService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.offers.emit(data);
      // this.offers = data;
      console.log(data)
    });
  }

  onSubmit(criteria) {
    this.criteria=JSON.parse(JSON.stringify(criteria));
    this.advService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.offers.emit( data.filter(el => this.searchFilter(el, this.criteria)));
      console.log( data.filter(el => this.searchFilter(el, this.criteria)))
    });
  }

  searchFilter(element: AdvertisementDTO, cirteria: SearchCriteria): boolean {
    try{
    if (this.criteria.brand !== undefined && this.criteria.brand.length > 0) {
      if (this.criteria.brand != element.brand)
        return false;
    }
    // if(this.criteria.category!==undefined && this.criteria.category.length >0){
    //   if(this.criteria.category!=element.ca
    // }
    if (this.criteria.model !== undefined && this.criteria.model.length > 0) {
      if (this.criteria.model != element.model)
        return false;
    }
    if (this.criteria.price !== undefined) {
      if (this.criteria.price < element.price)
        return false;

    }
  }catch(e){
    console.log("probably some fucking error");
    return false;
  }
    return true;
  }
}
export interface SearchCriteria {
  brand?: string;
  model?: string;
  year?: Date;
  price?: number;
  category?: string;
}
