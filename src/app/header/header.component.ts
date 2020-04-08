import { Component } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    /*Create an Observable that will start listening to geolocation updates when a consumer subscribes. 
    Call subscribe() to start listening for updates. 
    const locationsSubscription = locations.subscribe({
  next(position) {console.log('Current Position: ', position);},
  */
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
/*Subscriptions can also be put together, so that a call to an unsubscribe() of one Subscription 
may unsubscribe multiple Subscriptions. You can do this by "adding" one subscription into another:
content_copy open_in_new
import { interval } from 'rxjs';
 
const observable1 = interval(400);
const observable2 = interval(300);
 
const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
 
subscription.add(childSubscription);
 
setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);
When executed, we see in the console:
content_copy open_in_new
second: 0
first: 0
second: 1
first: 1
second: 2
Subscriptions also have a remove(otherSubscription) method, 
in order to undo the addition of a child Subscription.
*/
