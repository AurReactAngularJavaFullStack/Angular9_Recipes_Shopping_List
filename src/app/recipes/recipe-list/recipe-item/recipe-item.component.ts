import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
/*Decorator that marks a class field as an input property and supplies configuration metadata. 
The input property is bound to a DOM property in the template. During change detection, 
Angular automatically updates the data property with the DOM property's value.
In this example, hero-detail is a child component, it's meant to be inserted into a parent component 
which will have the 'hero' data, and that 'hero' data will be passed into the hero-detail component 
via the hero instance variable marked as an input by the @Input decorator.

Basically the syntax is:
Import the Hero interface from the hero.interface.ts file, 
this is the definition of the Hero class

import { Hero } from "./hero";
Use an Input decorator to make the following instance variable available 
to parent components to pass data down.

@Input()
The hero instance variable itself, which is of type Hero, 
the interface of which was imported above:

hero: Hero;
A parent component would use this hero-detail child component 
and pass the hero data into it by inserting it into the html template like this:
<hero-detail [hero]="hero"></hero-detail>
Where the parent component has an instance variable named 'hero', which contains the data, 
and that's passed into the hero-detail component.
*/
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit() {
  }
}
/*
En revanche, si le composant accepte un input ville, 
on peut facilement lui passer une ville en paramètre à chaque fois qu’on l’affiche :
<!-- Template du parent -->
<meteo ville="Paris"></meteo>
<meteo ville="Lyon"></meteo>
<meteo ville="Lille"></meteo>
...
Pour que MeteoComponent accepte un input ville, il suffit de créer une propriété ville 
dans la classe du composant et de la décorer avec le décorateur @Input() :
import {Component, Input} from "@angular/core";

@Component({
  selector: 'meteo',
  templateUrl: './meteo.component.html'
})
export class MeteoComponent {
  @Input() ville: string;  // <!-- Voici l'input
}
Un input permet donc de rendre un composant plus générique en lui passant à l’utilisation les données 
dont il a besoin pour s’afficher.
*/