// modules
import { Component, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core' ;
import { DialogState } from '../../enum/dialog-state' ;
import { DOCUMENT } from '@angular/common' ;

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})

/**
 * Composant représentant un dialogue de confirmation.
 * 
 * Date de dernière modification :
 * - Samedi 15 mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class ConfirmationDialogComponent
{
  // attributs
  public title!        : string ;
  public message!      : string ;
  public confirmLabel! : string ;
  public cancelLabel!  : string ;
  public data!         : any ;

  // états
  public displayDialog : boolean     = false ;
  public dialogState   : DialogState = DialogState.INACTIVE ;

  // évènements
  @Input() public openDialogEvent! : EventEmitter<{
    title        : string,
    message      : string,
    confirmLabel : string,
    cancelLabel  : string,
    data         : any
  }> ;
  @Output() public onConfirmEvent = new EventEmitter<any>() ;

  // constructeur
  constructor(
    private renderer : Renderer2,
    @Inject(DOCUMENT) private document : Document
  ) {}

  // initialisation du dialogue
  ngOnInit(): void
  {
    this.openDialogEvent.subscribe(dialog => {
      this.title        = dialog.title ;
      this.message      = dialog.message ;
      this.confirmLabel = dialog.confirmLabel ;
      this.cancelLabel  = dialog.cancelLabel ;
      this.data         = dialog.data ;
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden') ;
      this.openDialog() ;
    }) ;
  }

  // action : confirmer
  public onConfirm(): void {
    this.dialogState = DialogState.CONFIRMED ;
    this.renderer.removeStyle(this.document.body, 'overflow') ;
    setTimeout(() => {
      this.closeDialog() ;
      this.onConfirmEvent.emit(this.data) ;
    }, 300) ;
  }

  // action : annuler
  public onCancel(): void {
    this.dialogState = DialogState.CANCELLED ;
    this.renderer.removeStyle(this.document.body, 'overflow') ;
    setTimeout(() => {
      this.closeDialog() ;
    }, 300) ;
  }

  // méthode privée : ouvre le dialogue
  private openDialog(): void {
    this.displayDialog = true ;
    this.dialogState   = DialogState.PENDING ;
  }

  // méthode privée : ferme le dialogue
  private closeDialog(): void {
    this.displayDialog = false ;
    this.dialogState   = DialogState.INACTIVE ;
    this.renderer.removeStyle(this.document.body, 'overflow') ;
  }
}