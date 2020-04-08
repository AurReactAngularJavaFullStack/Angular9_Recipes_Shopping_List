import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }
];
/*You probably know that lazy loaded modules have their own injector.
So suppose you want to register AService to be available for the entire application,
but some BService to be available to only lazy loaded modules.
You can refactor your module like this:
@NgModule({
    providers: [AService]
})
class A {}
export const moduleWithProvidersForRoot = {
    ngModule: A,
    providers: [AService]
};
export const moduleWithProvidersForChild = {
    ngModule: A,
    providers: [BService]
};
------------------------------------------
@NgModule({
    imports: [moduleWithProvidersForRoot]
})
export class B
// lazy loaded module
@NgModule({
    imports: [moduleWithProvidersForChild]
})
export class C
Now BService will only be available for child lazy loaded modules and AService will be available
for the entire application.
You can rewrite the above as an exported module like this:
@NgModule({
    providers: [AService]
})
class A {
    forRoot() {
        return {
            ngModule: A,
            providers: [AService]
        }
    }
    forChild() {
        return {
            ngModule: A,
            providers: [BService]
        }
    }
}
--------------------------------------
@NgModule({
    imports: [A.forRoot()]
})
export class B
// lazy loaded module
@NgModule({
    imports: [A.forChild()]
})
export class C
*/
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
