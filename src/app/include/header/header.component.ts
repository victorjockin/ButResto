// modules
import { Component } from '@angular/core' ;

// services
import { TranslationService } from '../../service/translation.service' ;

// énumérations
import { Language } from '../../enum/language' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent
{
  // récupération des langues
  public languages = Language ;

  // constructeur
  constructor(
    private translationService : TranslationService,
    public  router             : Router
  ) {}

  // action : cliquer sur le nom de l'application
  public onClickOnAppName(): void {
    let count = localStorage.getItem('appNameClicksCount') ;
    if (count == '144') {
      this.router.navigateByUrl('/12') ;
    } else {
      localStorage.setItem(
        'appNameClicksCount', 
        count ? (parseInt(count, 10)+1).toString() : '1'
      ) ;
    }
  }

  // donne la langue actuelle
  public get currentLanguage(): Language {
    return this.translationService.getCurrentLanguage() ;
  }

  // change la langue de l'application
  public changeLanguage(language: Language): void {
    this.translationService.changeLanguage(language) ;
  }
}