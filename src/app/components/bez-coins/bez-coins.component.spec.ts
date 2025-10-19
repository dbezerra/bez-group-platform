import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezCoinsComponent } from './bez-coins.component';

describe('BezCoinsComponent', () => {
  let component: BezCoinsComponent;
  let fixture: ComponentFixture<BezCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BezCoinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BezCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
