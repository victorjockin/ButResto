// modules
import { Component, EventEmitter, Input, Output } from '@angular/core' ;
import { Router } from '@angular/router' ;

// classes
import { Menu } from '../../../model/menu' ;

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})

/**
 * Composant représentant un menu dans une liste.
 * 
 * Date de dernière modification :
 * - Mercredi 12 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class MenuItemComponent
{
  // attributs
  @Input() public menu!       : Menu ;
  @Input() public menusFilter : string = '' ;
  
  // paramètres d'affichage
  public displayDetails! : boolean ;
  public displayActions! : boolean ;

  // évènements
  @Output() public confirmRemovalEvent = new EventEmitter<any>() ;
  @Output() public menuSelected        = new EventEmitter<Menu>() ;

  // constructeur
  constructor(private router: Router) {}

  // initialisation de la vue
  public ngOnInit(): void {
    const url = this.router.url ;
    if (url.startsWith('/order')) {
      localStorage.removeItem('selectedMenu') ;
      this.displayDetails = false ;
      this.displayActions = false ;
    } else {
      this.displayDetails = true ;
      this.displayActions = true ;
    }
  }

  // action : modifier le menu
  public onModify(): void {
    localStorage.setItem('editMenuFrom', 'menu-list') ;
    this.router.navigate(['/menu', this.menu.id, 'edit']) ;
  }

  // acction : supprimer le menu
  public onRemove(): void {
    this.confirmRemovalEvent.emit(this.menu) ;
  }

  // action : clic sur le menu
  public onClick(): void {
    const url = this.router.url ;
    if (url.startsWith('/order')) {
      // sélection du menu pour ajout
      localStorage.setItem('selectedMenu', this.menu.id.toString()) ;
      this.menuSelected.emit(this.menu) ;
    } else {
      // redirection vers le détail du menu
      this.router.navigate(['/menu', this.menu.id]) ;
    }
  }

  // indique si le menu est sélectionné
  public isSelected(): boolean {
    return localStorage.getItem('selectedMenu') == this.menu.id.toString() ;
  }
}