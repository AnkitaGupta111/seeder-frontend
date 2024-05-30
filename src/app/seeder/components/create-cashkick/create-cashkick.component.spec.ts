import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCashkickComponent } from './create-cashkick.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('CreateCashkickComponent', () => {
  let component: CreateCashkickComponent;
  let fixture: ComponentFixture<CreateCashkickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCashkickComponent, HttpClientTestingModule],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateCashkickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
