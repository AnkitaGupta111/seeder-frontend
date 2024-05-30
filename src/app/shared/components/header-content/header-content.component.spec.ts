import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContentComponent } from './header-content.component';
import { By } from '@angular/platform-browser';

describe('HeaderContentComponent', () => {
  let component: HeaderContentComponent;
  let fixture: ComponentFixture<HeaderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderContentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header and subheader', () => {
    component.header = 'Test Header';
    component.subheader = 'Test Subheader';
    fixture.detectChanges();

    const headerElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    const subheaderElement = fixture.debugElement.query(By.css('div.mat-subheading-1')).nativeElement;

    expect(headerElement.textContent).toContain('Test Header');
    expect(subheaderElement.textContent).toContain('Test Subheader');
  });
});
