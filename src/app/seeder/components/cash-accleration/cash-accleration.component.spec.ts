import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashAcclerationComponent } from './cash-accleration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyPipe } from '@angular/common';
import { provideRouter } from '@angular/router';

describe('CashAcclerationComponent', () => {
  let component: CashAcclerationComponent;
  let fixture: ComponentFixture<CashAcclerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashAcclerationComponent, HttpClientTestingModule],
      providers:[CurrencyPipe, provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashAcclerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
