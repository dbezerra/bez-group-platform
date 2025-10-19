import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentMemberSubject = new BehaviorSubject<Member | null>(null);
  public currentMember$ = this.currentMemberSubject.asObservable();

  constructor() {
    // Verificar se há um membro logado no localStorage
    const savedMember = localStorage.getItem('currentMember');
    if (savedMember) {
      this.currentMemberSubject.next(JSON.parse(savedMember));
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulação de login - em produção, isso seria uma chamada HTTP
      setTimeout(() => {
        // Dados mockados para demonstração
        const mockMember: Member = {
          id: '1',
          username: username,
          email: `${username}@example.com`,
          password: password,
          plan: 'Gold',
          ranking: 4,
          bezCoins: 2500,
          isActive: true,
          createdAt: new Date('2024-01-01'),
          lastPaymentDate: new Date('2024-01-01'),
          nextPaymentDate: new Date('2024-02-01')
        };

        if (username === 'demo' && password === 'demo') {
          this.currentMemberSubject.next(mockMember);
          localStorage.setItem('currentMember', JSON.stringify(mockMember));
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.currentMemberSubject.next(null);
    localStorage.removeItem('currentMember');
  }

  getCurrentMember(): Member | null {
    return this.currentMemberSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentMemberSubject.value !== null;
  }

  updateMember(member: Member): void {
    this.currentMemberSubject.next(member);
    localStorage.setItem('currentMember', JSON.stringify(member));
  }
}
