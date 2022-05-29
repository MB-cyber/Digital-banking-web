import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers !: Observable<Array<Customer>>;
  errorMessage !: String ;
  searchformGroup : FormGroup | undefined;
  constructor(private customerService: CustomerService,private  fb : FormBuilder) { }

  ngOnInit(): void {
/*    this.customerService.getCustomers().subscribe({
      next : (data)=>{
        this.customers=data;
      },
      error : (err)=>{
       /!* console.log(err);*!/
        this.errorMessage=err.message;
      }
    });*/
    this.searchformGroup=this.fb.group({
      keyword : this.fb.control("")
    });

    this.handlesSearchCustomers();


  /*  this.customers=this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );*/


  }

  handlesSearchCustomers() {
    let kw =this.searchformGroup?.value.keyword;
    this.customers=this.customerService.searshCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );






  }
}
