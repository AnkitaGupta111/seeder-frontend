import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashkicksComponent } from './cashkicks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('CashkicksComponent', () => {
  let component: CashkicksComponent;
  let fixture: ComponentFixture<CashkicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashkicksComponent, HttpClientTestingModule],
      providers:[provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashkicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
