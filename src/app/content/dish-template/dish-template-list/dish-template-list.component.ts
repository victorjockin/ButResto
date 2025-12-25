// modules
import { Component, EventEmitter, Input, Output } from '@angular/core' ;

// objets
import { Dish } from '../../../model/dish' ;

@Component({
  selector: 'app-dish-template-list',
  templateUrl: './dish-template-list.component.html',
  styleUrl: './dish-template-list.component.css'
})

/**
 * Composant représentant la liste des modèles de plats.
 * 
 * Date de dernière modification :
 * - Mardi 4 mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class DishTemplateListComponent
{
  // attributs
  @Input() public dishTemplates!       : Dish[] ;
  @Input() public dishTemplatesFilter! : string ;

  // états
  public showDishTemplates : boolean = false ;

  // évènements
  @Output() public dishTemplateSelectedEvent = new EventEmitter<Dish>() ;

  // gère l'affichage ou non de la liste des modèles de plats
  public toggleShowDishTemplates(): void
  {
    this.showDishTemplates = !this.showDishTemplates ;
  }

  // action : sélectionner un modèle de plat
  public onSelectDishTemplate(dishTemplate: Dish): void
  {
    this.dishTemplateSelectedEvent.emit(dishTemplate) ;
  }
}