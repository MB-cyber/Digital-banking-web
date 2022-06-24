import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";
import {AccountDetails} from "../model/account.model";
import {BankAccount} from "../model/BankAccount.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

/*
  backendhots:string="http://localhost:8085";
*/

  constructor(private http:HttpClient) { }

  public getCusttomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendhots+"/customers")    }

  public searshCustomers(keyword : string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendhots+"/customers/search?keyword="+keyword)    }

  public saveCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.backendhots+"/customers",customer);
  }
  public deleteCustomer(id: number){
    return this.http.delete(environment.backendhots+"/customers/"+id);
  }

  public getCustomerAccounts(id: number):Observable<Array<BankAccount>>{
    return this.http.get<Array<BankAccount>>(environment.backendhots+"/customer-accounts/"+id);
  }
}
