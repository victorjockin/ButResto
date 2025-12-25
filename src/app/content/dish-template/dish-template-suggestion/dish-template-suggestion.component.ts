// modules
import { Component, Input } from '@angular/core' ;

// objets
import { Dish } from '../../../model/dish' ;

@Component({
  selector: 'app-dish-template-suggestion',
  templateUrl: './dish-template-suggestion.component.html',
  styleUrl: './dish-template-suggestion.component.css'
})

/**
 * Composant représentant une suggestion de modèle de plats.
 * 
 * Date de dernière modification :
 * - Dimanche 2 mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class DishTemplateSuggestionComponent
{
  // attributs
  @Input() public dish!                : Dish ;
  @Input() public dishTemplatesFilter! : string ;
}