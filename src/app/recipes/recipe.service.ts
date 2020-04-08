import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

/*
Le décorateur @Injectable()
@Injectable() est un décorateur un peu particulier. 
Il ne permet pas l’injection à proprement parlé, mais plutôt d’initialiser un contexte détectabilité. 
Si vous injectez dans un de vos services ( sans ce décorateur) un autre service, le moteur d'injection 
retournera une erreur. Angular conseille de toujours mettre cette annotation sur un service 
même si vous n'utilisez pas les injections dans les premiers développements de votre service afin d'éviter 
de se poser la question plus tard.

Pour informaion, les decorateurs @Component, @Pipe, et @Directive sont des sous classes de @Injectable().  
Ces décorateurs ajoutent des MetaDatas au code JavaScript transpilé à partir de nos fichiers TypeScript. 
Par défaut, le compilateur TypeScript rejette toutes les meta-données. 
Pour que ces metadatas soient integrées au JavaScript, l'option emitDecoratorMetadata doit être à true 
dans votre fichier tsconfig.json de votre projet.  
Angular-CLI a dèjà configuré  votre tsconfig.json pour les prendre en charge
2

Interestingly enough, the documentation is wrong on this one. @Injectable actually means "I(service) can have other services injected into me". Consider this service called Service2 that attempts to have Service1 injected in the constructor:

// If you remove this, you will get an error
@Injectable()
export class Service2 {
  constructor(private service: Service1) { 

  }
}
As noted by the comment, removing @Injectable() causes this to throw an error. 
You can try it using a StackBlitz I created. Components don't need @Injectable() to have services injected in them 
though.
*/
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
