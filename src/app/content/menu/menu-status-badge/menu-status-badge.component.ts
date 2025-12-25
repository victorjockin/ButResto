// modules
import { Component, Input } from '@angular/core' ;

// énumérations
import { MenuStatus } from '../../../enum/menu-status' ;

@Component({
  selector: 'app-menu-status-badge',
  templateUrl: './menu-status-badge.component.html',
  styleUrl: './menu-status-badge.component.css'
})

/**
 * Composant représentant le statut d'un menu sous forme de badge.
 * 
 * Date de dernière modification :
 * - Dimanche 16 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class MenuStatusBadgeComponent
{
  // attributs
  @Input() public status! : MenuStatus ;
}