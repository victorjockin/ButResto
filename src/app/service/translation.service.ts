// modules
import { Injectable }                  from '@angular/core' ;
import { HttpClient }                  from '@angular/common/http' ;
import { BehaviorSubject, Observable } from 'rxjs' ;

// énumérations
import { Language } from '../enum/language' ;

@Injectable({ providedIn: 'root' })
export class TranslationService
{
  // attributs
  private translations : any                    = {} ;
  private language  : BehaviorSubject<Language> = new BehaviorSubject<Language>(Language.FRENCH) ;
  public  language$ : Observable<Language>      = this.language.asObservable() ;

  // constructeur
  constructor(private httpClient : HttpClient) {
    const appLanguage = localStorage.getItem('app-language') as Language ;
    if (Object.values(Language).includes(appLanguage)) {
      this.loadTranslations(appLanguage) ;
    } else {
      this.loadTranslations(Language.FRENCH) ;
    }
  }

  // charge les traductions pour une langue donnée
  public loadTranslations(language: Language) {
    this.httpClient.get(
      `/assets/i18n/${language.toLowerCase()}.json`
    ).subscribe(data => {
      this.translations = data ;
      this.language.next(language) ;
      localStorage.setItem('app-language', language) ;
    }) ;
  }

  // donne la traduction de la chaîne passée en paramètre
  public getTranslation(key: string, params?: { [key: string]: any }): string {
    const keys = key.split('.') ;
    let translation = this.translations ;
    for (let k of keys) {
      if (translation && typeof translation == 'object' && k in translation) {
        translation = translation[k] ;
      } else {
        break ;
      }
    }
    if (typeof translation != 'string') {
      const stack = [this.translations] ;
      translation = undefined ;
      while (stack.length > 0) {
        const current = stack.pop() ;
        if (typeof current != 'object' || current == null) continue ;
        for (const k in current) {
          if (k == key && typeof current[k] == 'string') {
            return current[k] ;
          }
          if (typeof current[k] == 'object') {
            stack.push(current[k]) ;
          }
        }
        if (translation) break ;
      }
    }
    if (typeof translation != 'string') return key ;
    if (params) {
      for (const paramKey in params) {
        const regex = new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g') ;
        translation = translation.replace(regex, params[paramKey]) ;
      }
    }
    return translation ;
  }

  // change la langue
  public changeLanguage(language: Language) {
    this.loadTranslations(language) ;
  }

  // donne la langue actuelle
  public getCurrentLanguage(): Language {
    return this.language.value ;
  }
}