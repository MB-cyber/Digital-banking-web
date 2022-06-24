import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {Customer} from "../model/customer.model";
import {BankAccount} from "../model/BankAccount.model";
import {ActivatedRoute, Route, Router} from "@angular/router";


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup! : FormGroup
  currentPage : number =0;
  pageSize : number =5;
  accountObservable! : Observable<AccountDetails>
  operationFromGroup! : FormGroup;
  errorMessage! :string ;
  bankaccount!: BankAccount;
  aid :string ="" ;




  constructor( private  fb :FormBuilder, private accountService : AccountsService, private router :Router) {

  this.bankaccount =this.router.getCurrentNavigation()?.extras.state as BankAccount;



  }

  ngOnInit(): void {
    if(this.bankaccount){
 this.aid=this.bankaccount.id;
      this.accountFormGroup=this.fb.group({
        accountId : this.fb.control((this.aid))
      });
      this.handlesSearchAccount();
    }



    this.accountFormGroup=this.fb.group({
      accountId : this.fb.control((this.aid))
    });
      this.operationFromGroup=this.fb.group({
        operationType : this.fb.control(null),
        amount : this.fb.control(0),
        description : this.fb.control(null),
        accountDestination : this.fb.control(null)
      })




  }

  handlesSearchAccount() {
    let accountId : string =this.accountFormGroup.value.accountId;
    this.accountObservable=this.accountService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      }));

  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handlesSearchAccount()
  }

  handleAccountOperation() {
    let accountId :string = this.accountFormGroup.value.accountId;
    let operationType=this.operationFromGroup.value.operationType;
    let amount :number =this.operationFromGroup.value.amount;
    let description :string =this.operationFromGroup.value.description;
    let accountDestination :string =this.operationFromGroup.value.accountDestination;
    if(operationType=='DEBIT'){
      this.accountService.debit(accountId, amount,description).subscribe({
        next : (data)=>{
          alert("Success Credit");
          this.operationFromGroup.reset();
          this.handlesSearchAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });
    } else if(operationType=='CREDIT'){
      this.accountService.credit(accountId, amount,description).subscribe({
        next : (data)=>{
          alert("Success Debit");
          this.operationFromGroup.reset();
          this.handlesSearchAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }
    else if(operationType=='TRANSFER'){
      this.accountService.transfer(accountId,accountDestination, amount,description).subscribe({
        next : (data)=>{
          alert("Success Transfer");
          this.operationFromGroup.reset();
          this.handlesSearchAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });

    }
  }

}
