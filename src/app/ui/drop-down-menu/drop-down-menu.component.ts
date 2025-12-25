// modules
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core' ;

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.css'
})

/**
 * Composant représentant un menu déroulant.
 * 
 * Date de dernière modification :
 * - Samedi 22 mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class DropDownMenuComponent
{
  // attributs
  @Input() public label!         : string ;           // nom (label) du menu déroulant
  @Input() public options!       : any[] ;            // liste des options du menu déroulant
  @Input() public selectedOption : any|null = null ;  // option sélectionnée

  // états
  public displayMenu : boolean = false ;

  // évènements
  @Output() onSelectedOptionEvent = new EventEmitter<any> ;

  // constructeur
  constructor(private elementRef : ElementRef) {}

  // gestion de l'ouverture et de la fermeture du menu
  public toggleMenu(): void { this.displayMenu = !this.displayMenu ; }

  // action : sélectionner une option
  public onSelectOption(option:any): void {
    this.selectedOption = option ;
    this.onSelectedOptionEvent.emit(option) ;
  }

  // action : effacer la sélection
  public onCleanSelection(event:Event): void {
    if (!this.displayMenu) { event.stopPropagation() ; }
    this.selectedOption = null ;
    this.onSelectedOptionEvent.emit(null) ;
  }

  // gestion d'évènement : click à l'extérieur du menu déroulant
  @HostListener('document:click', ['$event'])
  onClickOutside(event:Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.displayMenu = false ;
    }
  }
}