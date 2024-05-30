import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAccSummaryCardComponent } from './cash-acc-summary-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyPipe } from '@angular/common';

describe('CashAccSummaryCardComponent', () => {
  let component: CashAccSummaryCardComponent;
  let fixture: ComponentFixture<CashAccSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashAccSummaryCardComponent, HttpClientTestingModule],
      providers: [CurrencyPipe]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashAccSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
