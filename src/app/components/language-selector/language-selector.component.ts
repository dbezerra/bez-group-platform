import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit {
  currentLanguage: string = 'pt-BR';
  availableLanguages: { code: string; name: string; flag: string }[] = [];
  showDropdown: boolean = false;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.availableLanguages = this.translationService.getAvailableLanguages();
  }

  changeLanguage(languageCode: string): void {
    this.translationService.setLanguage(languageCode);
    this.currentLanguage = languageCode;
    this.showDropdown = false;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  getCurrentFlag(): string {
    const currentLang = this.availableLanguages.find(lang => lang.code === this.currentLanguage);
    return currentLang ? currentLang.flag : '🇧🇷';
  }

  getCurrentLanguageName(): string {
    const currentLang = this.availableLanguages.find(lang => lang.code === this.currentLanguage);
    return currentLang ? currentLang.name : 'Português (Brasil)';
  }
}