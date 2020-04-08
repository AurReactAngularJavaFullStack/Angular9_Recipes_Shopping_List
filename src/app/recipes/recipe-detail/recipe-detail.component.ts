import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              /* ActivatedRoute provides access to the url, params, data, queryParams, and fragment observables. 
              We will look at each of them in detail, but first let's examine the relationships between them. 
              URL changes are the source of any changes in a route. */
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    //when the recipe is done getting the observable will start listening to the recipe by this  id.
    /*If you can imagine yourself when subscribing to a newsletter and after subscribing, 
    every time that there is a new newsletter, they will send it to your home (the method inside subscribe gets 
    called).
    That's what happens when you subscribing to a source of magazines ( which they call it Observable in rxjs 
    library)
    All the AJAX calls in Angular is using this library behind the scene and in order to use any of them, 
    you've got to use the method name, e.g get, and then call subscribe on it, because get returns and Observable.
    Also, when you're doing this <button (click)="doSomething()"> Angular is using Observables behind the scene 
    and subscribes you to that source of thing, which in this case is a click event. */
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    /*
    The Angular Router ("the router") borrows from this model. 
    It can interpret a browser URL as an instruction to navigate to a client-generated view. 
    It can pass optional parameters along to the supporting view component that help it 
    decide what specific content to present.
    If the first segment doesn't start with / it is a relative route. 
    router.navigate needs a relativeTo parameter for relative navigation
    */
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
