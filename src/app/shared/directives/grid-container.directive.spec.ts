import { Component } from '@angular/core';
import { GridContainerDirective } from './gridContainer.directive';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


@Component({
  template: `<div appGridContainer></div>`
})
class TestComponent { }

@Component({
  template: `<div appGridContainer [flexDirection]="'column'"
                                   [alignItems]="'flex-start'"
                                   [justifyContent]="'center'"
                                   [gap]="'10px'"
                                   [padding]="'5px'"
                                   [margin]="'10px'"
                                   [height]="'100px'"></div>`
})
class CustomTestComponent { }


describe('GridContainerDirective', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, CustomTestComponent],
      imports: [GridContainerDirective]
    }).compileComponents();
  });


  it('should create an instance of the directive', () => {

    const fixture = TestBed.createComponent(TestComponent);

    const directiveEl = fixture.debugElement.query(By.directive(GridContainerDirective));
    expect(directiveEl).not.toBeNull();

  });

  it('should apply the default styles to the host element', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const divElement = fixture.debugElement.query(By.directive(GridContainerDirective)).nativeElement;

    expect(divElement.style.display).toBe('flex');
    expect(divElement.style.alignItems).toBe('center');
    expect(divElement.style.justifyContent).toBe('start');
    expect(divElement.style.gap).toBe('4px');
    expect(divElement.style.padding).toBe('0px');
    expect(divElement.style.margin).toBe('0px');
    expect(divElement.style.flexDirection).toBe('row');
    expect(divElement.style.height).toBe('auto');
  });

  it('should apply custom styles to the host element', () => {


    const fixture = TestBed.createComponent(CustomTestComponent);
    fixture.detectChanges();

    const divElement = fixture.debugElement.query(By.directive(GridContainerDirective)).nativeElement;

    expect(divElement.style.display).toBe('flex');
    expect(divElement.style.flexDirection).toBe('column');
    expect(divElement.style.alignItems).toBe('flex-start');
    expect(divElement.style.justifyContent).toBe('center');
    expect(divElement.style.gap).toBe('10px');
    expect(divElement.style.padding).toBe('5px');
    expect(divElement.style.margin).toBe('10px');
    expect(divElement.style.height).toBe('100px');
  });
});
