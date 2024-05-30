import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSummaryCardComponent } from './home-summary-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeSummaryCardComponent', () => {
  let component: HomeSummaryCardComponent;
  let fixture: ComponentFixture<HomeSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSummaryCardComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
