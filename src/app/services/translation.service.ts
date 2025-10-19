import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TRANSLATIONS, Translation } from './translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<string>('pt-BR');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    // Verificar idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && TRANSLATIONS[savedLanguage]) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: string): void {
    if (TRANSLATIONS[language]) {
      this.currentLanguageSubject.next(language);
      localStorage.setItem('preferred-language', language);
    }
  }

  translate(key: string, params?: { [key: string]: string | number }): string {
    const currentLang = this.getCurrentLanguage();
    const translations = TRANSLATIONS[currentLang];
    
    if (!translations || !translations[key]) {
      // Fallback para português se a chave não existir
      const fallbackTranslations = TRANSLATIONS['pt-BR'];
      if (fallbackTranslations && fallbackTranslations[key]) {
        return this.interpolate(fallbackTranslations[key], params);
      }
      return key; // Retorna a chave se não encontrar tradução
    }

    return this.interpolate(translations[key], params);
  }

  private interpolate(text: string, params?: { [key: string]: string | number }): string {
    if (!params) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key]?.toString() || match;
    });
  }

  getAvailableLanguages(): { code: string; name: string; flag: string }[] {
    return [
      { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
      { code: 'en-US', name: 'English (US)', flag: '🇺🇸' }
    ];
  }
}
