export class User {
    constructor(firstName, lastName, phoneNumber, emailAddress) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.emailAddress = emailAddress;
      this.orders = [];
      this.listedProducts = [];
      this.customers = [];
      this.cart = [];
      this.addresses = [];
    }
  };