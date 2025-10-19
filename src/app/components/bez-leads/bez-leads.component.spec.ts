import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezLeadsComponent } from './bez-leads.component';

describe('BezLeadsComponent', () => {
  let component: BezLeadsComponent;
  let fixture: ComponentFixture<BezLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BezLeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BezLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
