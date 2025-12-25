// modules
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core' ;

// énumérations
import { LoadingStatus } from '../../enum/loading-status' ;

@Component({
  selector: 'app-loading-pop-up',
  templateUrl: './loading-pop-up.component.html',
  styleUrl: './loading-pop-up.component.css'
})

/**
 * Composant représentant un pop-up de chargement.
 * 
 * Date de dernière modification :
 * - Dimanche 23 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class LoadingPopUpComponent implements OnChanges
{
  // attributs
  @Input()  loadingStatus!   : string ;
  @Output() loadingCompleted = new EventEmitter<void>() ;

  ngOnChanges(changes : SimpleChanges): void
  {
    if (changes['loadingStatus'] && this.loadingStatus == LoadingStatus.LOADED)
    {
      setTimeout(() => {
        this.loadingCompleted.emit() ;
      }, 300) ;
    }
  }
}