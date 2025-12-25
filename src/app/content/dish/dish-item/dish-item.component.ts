// modules
import { Component, EventEmitter, Input, Output } from '@angular/core' ;
import { ActivatedRoute }                         from '@angular/router' ;

// objets
import { Dish } from '../../../model/dish' ;

// énumérations
import { ViewMode }   from '../../../enum/view-mode' ;
import { Processing } from '../../../enum/processing' ;

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrl: './dish-item.component.css'
})

/**
 * Composant représentant un plat dans une liste.
 * 
 * Date de dernière modification :
 * - Samedi 1er mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class DishItemComponent
{
  // attributs récupérés
  @Input() public dish! : Dish ;

  public tmpDish! : Dish ;

  // états
  public mode! : ViewMode ;

  // évènements
  @Output() public dishNameInputChangesEvent = new EventEmitter<string>() ;
  @Output() public addingDishFinishedEvent   = new EventEmitter<void>() ;
  @Output() public updateDishesToAddEvent    = new EventEmitter<void>() ;
  @Output() public processingStartedEvent    = new EventEmitter<{
    processing : Processing,
    dish       : Dish
  }>() ;
  @Input() public processingCompletedEvent! : EventEmitter<void> ;

  // constructeur
  constructor(private activatedRoute : ActivatedRoute) {}

  // initialisation de la vue
  ngOnInit(): void
  {
    if (this.dish.id || this.dish.name) {
      this.mode = ViewMode.VIEW_MODE ;
    } else {
      this.mode = ViewMode.ADDITION_MODE ;
    }
    this.processingCompletedEvent.subscribe(() => { this.onProcessingCompleted() ; }) ;
  }

  // mode vue
  // --------

  // action : modifier le plat
  public onModify(): void
  {
    this.tmpDish  = {...this.dish} ;
    this.mode     = ViewMode.EDITION_MODE ;
  }

  // action : retirer le plat
  public onRemove(): void { this.mode = ViewMode.DELETION_MODE ; }

  // mode ajout
  // ----------

  // action : enregistrer un nouveau plat
  public onSaveDish(): void
  {
    const menuId      = this.activatedRoute.snapshot.params['id'] ;
    this.dish.menuId  = Number(menuId) ;
    if (menuId) {
      this.processingStartedEvent.emit({
        processing : Processing.ADD,
        dish       : this.dish
      }) ;
    } else {
      let dishesToAdd = JSON.parse(localStorage.getItem('dishesToAdd') || '[]') ;
      localStorage.setItem('dishesToAdd', JSON.stringify(
        dishesToAdd.concat({
          tmpId    : dishesToAdd.length,
          name     : this.dish.name,
          calories : this.dish.calories
        })
      )) ;
      this.addingDishFinishedEvent.emit() ;
      this.updateDishesToAddEvent.emit() ;
    }
  }

  // action : annuler l'enregistrement d'un nouveau plat
  public onCancelSave(): void {
    this.addingDishFinishedEvent.emit() ;
  }

  // gestion d'évènement : mise à jour de la saisie du nom du plat
  public onDishNameInputChanges(): void {
    this.dishNameInputChangesEvent.emit(this.dish.name) ;
  }

  // mode édition
  // ------------

  // action : valider les changements
  public onValidateChanges(): void
  {
    const menuId = this.activatedRoute.snapshot.params['id'] ;
    if (menuId) {
      if (JSON.stringify(this.dish) != JSON.stringify(this.tmpDish)) {
        this.processingStartedEvent.emit({ processing: Processing.UPDATE, dish: this.dish }) ;
      } else {
        this.mode = ViewMode.VIEW_MODE ;
      }  
    } else {
      localStorage.setItem('dishesToAdd', JSON.stringify(
        JSON.parse(localStorage.getItem('dishesToAdd') || '[]').map(
          (dish:any) => dish.tmpId == this.dish.id
            ? { ...dish, name: this.dish.name, calories: this.dish.calories }
            : dish
        )
      )) ;
      this.updateDishesToAddEvent.emit() ;
      this.mode = ViewMode.VIEW_MODE ;
    }
  }

  // action : annuler les changements
  public onCancelChanges(): void
  {
    this.dish = {...this.tmpDish} ;
    this.mode = ViewMode.VIEW_MODE ;
  }

  // mode suppression
  // ----------------

  // action : confirmer la suppression
  public onConfirmDeletion(): void
  {
    const menuId = this.activatedRoute.snapshot.params['id'] ;
    if (menuId) {
      this.processingStartedEvent.emit({
        processing : Processing.DELETE,
        dish       : this.dish
      }) ;  
    } else {
      localStorage.setItem('dishesToAdd', JSON.stringify(
        JSON.parse(
          localStorage.getItem('dishesToAdd') || '[]'
        ).filter((dish:any) => dish.tmpId != this.dish.id)
      )) ;
      this.updateDishesToAddEvent.emit() ;
    }
  }

  // action : annuler la suppression
  public onCancelDeletion(): void { this.mode = ViewMode.VIEW_MODE ; }

  // gestion des évènements
  // ----------------------

  // gestion d'évènement : traitement terminé
  public onProcessingCompleted(): void
  {
    if (this.mode == ViewMode.EDITION_MODE) {
      this.mode = ViewMode.VIEW_MODE ;
    }
  }
}