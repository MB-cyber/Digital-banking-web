import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup! : FormGroup;


  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {this.newCustomerFormGroup=this.fb.group({
    name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
    email : this.fb.control(null,[Validators.required, Validators.email])
  });
  }

  handleSaveCustomer() {

  }
}
