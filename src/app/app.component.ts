import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, pluck, map } from 'rxjs/operators';

interface Order {
  id: number;
  customerID: number;
  customerName: string;
  itemCount: number;
  address: {
    street: string,
    zipcode: number
  }
}


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  data: Observable<any>;

  constructor() {
    const orderObject: Order = {
      id: 5,
      customerID: 47,
      customerName: 'Zachary Kipping',
      itemCount: 3,
      address: {
        street: 'Ng lane',
        zipcode: 12345
      }
    }

    this.data = of(orderObject).pipe(
      tap(order => console.log(order)),
      map((order: Order) => {
        // grabbing only certain properties from an object
        return {
          id: order.id,
          name: order.customerName,
          count: order.itemCount,
          address: order.address
        }
      }),
      tap(mapped_items => console.log(mapped_items)),
      // plucking nested properties in an object
      pluck<any, string>('address', 'street')
    );
  }
}
