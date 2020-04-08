import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  /*Subscribe with an Observer
content_copy open_in_new
import { of } from 'rxjs';
const sumObserver = {
  sum: 0,
  next(value) {
    console.log('Adding: ' + value);
    this.sum = this.sum + value;
  },
  error() {
    // We actually could just remove this method,
    // since we do not really care about errors right now.
  },
  complete() {
    console.log('Sum equals: ' + this.sum);
  }
};
of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
  .subscribe(sumObserver);
// Logs:
// "Adding: 1"
// "Adding: 2"
// "Adding: 3"
// "Sum equals: 6"
  */
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      )
      /*
      // RxJS v6+
       import { from } from 'rxjs';
      import { map } from 'rxjs/operators';
      //emit (1,2,3,4,5)
      const source = from([1, 2, 3, 4, 5]);
      //add 10 to each value
      const example = source.pipe(map(val => val + 10));
      //output: 11,12,13,14,15
      const subscribe = example.subscribe(val => console.log(val));

      // RxJS v6+
      import { from } from 'rxjs';
      import { map } from 'rxjs/operators';

       //emit ({name: 'Joe', age: 30}, {name: 'Frank', age: 20},{name: 'Ryan', age: 50})
      const source = from([
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 20 },
      { name: 'Ryan', age: 50 }
      ]);
      //grab each persons name, could also use pluck for this scenario
      const example = source.pipe(map(({ name }) => name));
      //output: "Joe","Frank","Ryan"
      const subscribe = example.subscribe(val => console.log(val));

      */
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
         /*tap. tap is a RxJS pipeable operator that returns identical Observable as source Observable 
         and can be used to perform side effect such as logging each values emitted by source Observable
         Tap: Can perform side effects with observed data but does not modify the stream in any way. 
         Formerly called do()
         Perform a side effect for every emission on the source Observable, 
         but return an Observable that is identical to the source.
         Map every click to the clientX position of that click, while also logging the click event

         content_copy open_in_new
        import { fromEvent } from 'rxjs';
        import { tap, map } from 'rxjs/operators';
        const clicks = fromEvent(document, 'click');
        const positions = clicks.pipe(
          tap(ev => console.log(ev)),
          map(ev => ev.clientX),
        );
        positions.subscribe(x => console.log(x));
        */
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
