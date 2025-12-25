// modules
import { Component, Input } from '@angular/core' ;

// énumérations
import { Processing }       from '../../enum/processing' ;
import { ProcessingStatus } from '../../enum/processing-status' ;

@Component({
  selector: 'app-processing-pop-up',
  templateUrl: './processing-pop-up.component.html',
  styleUrl: './processing-pop-up.component.css'
})

/**
 * Composant représentant un pop-up d'attente durant un traitement.
 * 
 * Date de dernière modification :
 * - Samedi 1er mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class ProcessingPopUpComponent
{
  // attributs
  @Input() public processing!       : Processing|null ;
  @Input() public processingStatus! : ProcessingStatus|null ;

  Processing = Processing ; // pour utilisation dans la template
}