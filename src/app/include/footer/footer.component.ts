// modules
import { Component } from '@angular/core' ;

// services
import { DateService } from '../../service/date.service' ;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

/**
 * Composant représentant le bas de page (footer) de l'application.
 * 
 * Date de dernière modification :
 * - Mercredi 19 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class FooterComponent
{
  // constructeur
  constructor(public dateService : DateService) {}
}