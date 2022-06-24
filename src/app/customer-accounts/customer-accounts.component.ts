import { Component, OnInit } from '@angular/core';
import {Customer} from "../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {CustomerService} from "../services/customer.service";
import {BankAccount} from "../model/BankAccount.model";


@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  customerId! : number ;
  customer! : Customer;
  Accounts!: Observable<Array<BankAccount>>;
  private errorMessage: any;
  constructor(private route : ActivatedRoute,private customerService: CustomerService, private router :Router) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
    this.customerId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

      this.Accounts=this.customerService.getCustomerAccounts(this.customerId).pipe(
        catchError(err => {
          this.errorMessage=err.message;
          return throwError(err);
        })
      );


  }


  handleAccountOperations(bankAccount: BankAccount) {
    this.router.navigateByUrl("accounts",{state :bankAccount});

  }
}
