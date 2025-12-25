// modules
import { 
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core' ;

// constantes
import { FOOD_ICONS } from '../../constants/food-icons.const' ;

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})

/**
 * Composant représentant le "hero header" de l'application.
 * 
 * Date de dernière modification :
 * - Dimanche 4 mai 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class HeroComponent implements AfterViewInit, OnDestroy
{
  // attributs
  public icons : string[] = FOOD_ICONS ;  // icônes utilisées pour construire les grilles
  public rows  : number[] = Array(5) ;    // nombre de lignes des grilles d'icônes
  public cols! : number[] ;               // nombre de colonnes des grilles d'icônes

  // éléments HTML
  @ViewChild('mainContainer') mainContainerRef! : ElementRef<HTMLDivElement> ;
  @ViewChild('centerSection') centerSectionRef! : ElementRef<HTMLDivElement> ;

  // observeurs
  private resizeObserver! : ResizeObserver ;

  // constructeur
  constructor(private cdRef: ChangeDetectorRef) {}

  // initialisation de la vue
  public ngOnInit(): void {
    this.icons = this.shuffleArray(this.icons) ;
  }

  // après initialisation de la vue
  public ngAfterViewInit(): void {
    // observateur des dimensions du hero
    this.resizeObserver = new ResizeObserver(entries => {
      // construction des grilles d'icônes
      for (let entry of entries) {
        const iconSize = 50 ; // taille des icônes
        const gap = 15 ;      // espacement des icônes
        const width = entry.contentRect.width - this.centerSectionRef.nativeElement.offsetWidth ;
        const cols = Math.floor(Math.floor((width + gap) / (iconSize + gap)) / 2) ;
        if (!this.cols || this.cols.length != cols) {
          this.cols = [...Array(cols)] ;
          this.cdRef.detectChanges() ;
          setTimeout(() => this.synchronizeAnimations()) ;
        }
      }  
    }) ;
    this.resizeObserver.observe(this.mainContainerRef.nativeElement) ;
    setTimeout(() => this.synchronizeAnimations()) ;
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect() ;
    }
  }

  public getGroup(ci: number, ri: number): number {
    return (ci%2 == ri%2) ? 1 : 2
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1 ; i > 0 ; i--) {
      const j = Math.floor(Math.random() * (i + 1)) ;
      [array[i], array[j]] = [array[j], array[i]] ;
    }
    return array ;
  }

  private synchronizeAnimations(): void {
    const icons = this.mainContainerRef.nativeElement.querySelectorAll('.column i') ;
    const now = performance.now() ;
    const cycle = 8000 ;
    const baseOffset = now % cycle ;
    icons.forEach((icon: Element) => {
      const htmlIcon = icon as HTMLElement ;
      let groupOffset = 0 ;
      if (htmlIcon.classList.contains('group-2')) { groupOffset = 4000 ; }
      const totalOffset = (baseOffset + groupOffset) % cycle ;
      htmlIcon.style.animation = 'none' ;
      void htmlIcon.offsetWidth ;
      htmlIcon.style.animation = `fadeInOut ${cycle}ms linear infinite` ;
      htmlIcon.style.animationDelay = `-${totalOffset}ms` ;
      htmlIcon.style.animationPlayState = 'running' ;
    }) ;
  }
}