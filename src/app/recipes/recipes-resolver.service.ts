import { Injectable } from '@angular/core';
/*Resolve:
Contains the information about a route associated with a component loaded in an outlet (sortie,débouché)
at a particular moment in time. 
ActivatedRouteSnapshot can also be used to traverse the router state tree.
Resolves can also help the user experience. 
A resolve is a property you can attach to a route in both ngRoute and the more robust UI router. 
A resolve contains one or more promises that must resolve successfully before the route will change.

RouterStateSnapshot. 
As you can see RouterStateSnapshot is a tree of activated route snapshots. 
Every node in this tree knows about the “consumed” URL segments, 
the extracted parameters, and the resolved data.
ActivatedRoute:
ActivatedRoute provides access to the url, params, data, queryParams, and fragment observables. 
We will look at each of them in detail, but first let’s examine the relationships between them.
URL changes are the source of any changes in a route. 
And it has to be this way as the user has the ability to modify the location directly.
*/
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
/*
providedIn: 'root' When you provide the service at the root level, 
Angular creates a single, shared instance of service and injects it into any class 
that asks for it.
48

if you use providedIn, the injectable is registered as a provider of the Module without adding it 
to the providers of the module.

From Docs

The service itself is a class that the CLI generated and that's decorated with @Injectable. 
By default, this decorator is configured with a providedIn property, which creates a provider for the service. 
In this case, providedIn: 'root' specifies that the service should be provided in the root injector.
providedIn: 'root' is the easiest and most efficient way to provide services since Angular 6:
The service will be available application wide as a singleton with no need to add it to a module's providers 
array (like Angular <= 5).
If the service is only used within a lazy loaded module it will be lazy loaded with that module
If it is never used it will not be contained in the build (tree shaked).
*/
@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
