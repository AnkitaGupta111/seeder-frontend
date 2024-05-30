import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsComponent } from './contracts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContractsComponent', () => {
  let component: ContractsComponent;
  let fixture: ComponentFixture<ContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
