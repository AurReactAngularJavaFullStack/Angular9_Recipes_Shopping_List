import { Directive, HostListener, HostBinding } from '@angular/core';
/*At the core, a directive is a function that executes whenever the Angular compiler finds it in the DOM. 
Angular directives are used to extend the power of the HTML by giving it new syntax. 
Each directive has a name — either one from the Angular predefined like ng-repeat , 
or a custom one which can be called anything.

*/
@Directive({
  selector: '[appDropdown]'
})
/*Il ne nous reste plus qu'à définir la couleur paramétrable grâce à un autre décorateur Angular : 
le décorateur @Input . 
Ce décorateur permet de lier le paramètre passé à une propriété de la classe de la Directive. 
Il est possible de passer en paramètre un alias dans le cas où la propriété de la classe n'a pas le même 
que l'attribut de la Directive. Voici notre Directive finale : 
import {Directive, Renderer2, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor: string;
  private _defaultColor = 'red';

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    this._renderer.setStyle(this._el.nativeElement, 'color', this._defaultColor);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this._renderer.setStyle(this._el.nativeElement, 'color', this.highlightColor);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this._renderer.setStyle(this._el.nativeElement, 'color', this._defaultColor);
  }
}
Grâce à ce code, il est possible d'utiliser notre Directive comme ceci :
<div [appHighlight]="'yellow'">Texte en highlight</div>

Le constructeur a été modifié pour permettre d'utiliser ses paramètres dans toute la classe. 
Le fait de mettre la portée devant les paramètres et un accélérateur de développement qui permet 
de faire l'équivalent d'un this._el = _el . 
C'est une spécificité TypeScript, et c'est bien pratique quand même.

Le @Input a été ajouté. Il permet de récupérer notre couleur passée en paramètre de notre directive.

Nos @HostListener ont été modifiés pour permettre le changement de couleur comme c'était le cas avec 
notre constructeur.
*/
export class DropdownDirective {
  /*In Angular, the @HostBinding() function decorator allows you to set the properties of the host element 
  from the directive class. 
  Let's say you want to change the style properties such as height, width, color, margin, border, etc., 
  or any other internal properties of the host element in the directive class.
  @HostBinding('style.border') border: string;
  @HostListener('mouseover') onMouseOver() {
    this.border = '5px solid green';
  }
Using this code, on a mouse hover, the host element border will be set to a green, 
solid 5-pixel width. 
Therefore, using the @HostBinding decorator, you can set the properties of the host element in the directive class.
  */
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
