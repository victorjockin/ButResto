// modules
import { Directive, AfterViewInit, ElementRef } from '@angular/core' ;

@Directive({ selector: '[itemListAutoWidths]' })
export class ItemListAutoWidthsDirective implements AfterViewInit
{
  // attributs
  private observer! : MutationObserver ;

  // constructeur
  constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement as HTMLElement ;
    this.calculateWidths() ;
    this.observer = new MutationObserver(() => {
      this.calculateWidths() ;
    }) ;
    this.observer.observe(host, { childList: true, subtree: true, }) ;
  }

  private calculateWidths(): void {
    // récupération des éléments html
    const host                      = this.elementRef.nativeElement             as HTMLElement ;
    const itemIdElements            = host.querySelectorAll('.item-id')         as NodeListOf<HTMLElement> ;
    const itemIdHeaderElement       = host.querySelector('#itemIdColumn')       as HTMLElement|null ;
    const firstItemActionsElement   = host.querySelector('.item-actions')       as HTMLElement|null ;
    const itemActionsHeaderElement  = host.querySelector('#itemActionsColumn')  as HTMLElement|null ;
    // sortie si aucun item n'est affiché
    if (itemIdElements.length != 0) {
      // calcul de la plus grande largeur
      let maxWidth = 0 ;
      for (let i = 0 ; i < itemIdElements.length ; i++) {
        const width = itemIdElements[i].offsetWidth ;
        if (width > maxWidth) { maxWidth = width ; }
      }
      // application de la largeur à la colonne des id
      if (itemIdHeaderElement) {
        itemIdHeaderElement.style.minWidth = `${maxWidth}px` ;
      }
      itemIdElements.forEach(e => { e.style.minWidth = `${maxWidth}px` ; }) ;
    }
    // application de la largeur aux éléments
    if (firstItemActionsElement) {
      const itemActionsWidth = firstItemActionsElement.offsetWidth ;
      if (itemActionsHeaderElement) {
        itemActionsHeaderElement.style.minWidth = `${itemActionsWidth}px` ;
      }
    }
  }

  public ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect() ;
  }
}