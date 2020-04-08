import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    /*Observables have the subscribe method we call with a callback function to get the values emitted 
    into the Observable.
    A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable 
    executions.
    To prevent this memory leaks we have to unsubscribe from the subscriptions when we are done with. 
    We do so by calling the unsubscribe method in the Observable.
    In Angular, we have to unsubscribe from the Observable when the component is being destroyed. 
    Luckily, Angular has a ngOnDestroy hook that is called before a component is destroyed, this enables devs 
    to provide the cleanup crew here to avoid hanging subscriptions, open portals, and what nots that may come 
    in the future to bite us in the back.
    So, whenever we use Observables in a component in Angular, we should set up the ngOnDestroy method, 
    and call the unsubscribe method on all of them.
    */
    this.subscription.unsubscribe();
  }
}
