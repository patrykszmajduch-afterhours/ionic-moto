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

  constructor(private advService: AdvertisementService, private sService: SearchService) { }
  criteria: SearchCriteria = {} as SearchCriteria;
  brandsList: string[];
  @Output("offers") offers = new EventEmitter<AdvertisementDTO[]>();

  ngOnInit() {
    this.brandsList = this.sService.GetBrands();
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

  // onSubmit(criteria) {
  //   this.advService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.key, ...c.payload.val() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     data.filter(el => this.searchFilter(el, criteria))
  //     this.offers = data;
  //     console.log(data)
  //   });
  // }

  searchFilter(element: AdvertisementDTO, cirteria: SearchCriteria): boolean {
    if (this.criteria.brand !== undefined && this.criteria.brand.length > 0) {
      if (this.criteria.brand != element.vehicle.brand)
        return false;
    }
    // if(this.criteria.category!==undefined && this.criteria.category.length >0){
    //   if(this.criteria.category!=element.ca
    // }
    if (this.criteria.model !== undefined && this.criteria.model.length > 0) {
      if (this.criteria.model != element.vehicle.model)
        return false;
    }
    if (this.criteria.price !== undefined) {
      if (this.criteria.price < element.price)
        return false;

    }
    return true;
  }
}
export interface SearchCriteria {
  brand: string;
  model: string;
  year: Date;
  price: number;
  category: string;
}
