export interface BankAccount {
  id : string;
  balance : number;
   createdAt : Date;
   AccountStatus : string;
   type :string
  customerDTO : CustomerDTO;
  overDraft : number;
  interestRate: number;
}


export interface CustomerDTO {
  id : number;
  name : string;
  email : string;

}

