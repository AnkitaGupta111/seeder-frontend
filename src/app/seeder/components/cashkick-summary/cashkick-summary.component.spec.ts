import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashkickSummaryComponent } from './cashkick-summary.component';

describe('CashkickSummaryComponent', () => {
  let component: CashkickSummaryComponent;
  let fixture: ComponentFixture<CashkickSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashkickSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashkickSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
