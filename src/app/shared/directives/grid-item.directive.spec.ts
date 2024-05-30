import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { GridItemDirective } from "./grid-item.directive";
import { By } from "@angular/platform-browser";


@Component({
    template: `<div appGridItem [flex]="flex"
                               [padding]="padding"
                               [margin]="margin"
                               [alignSelf]="alignSelf">
               </div>`
})
class CustomTestComponent {
    flex = '2';
    padding = '10px';
    margin = '5px';
    alignSelf = 'flex-start';
}

@Component({
    template: `<div appGridItem></div>`
})
class TestComponent {
}

describe('GridItemDirective', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomTestComponent, TestComponent],
            imports: [GridItemDirective]
        }).compileComponents();
    });


    it('should create an instance of the directive', () => {

        const fixture = TestBed.createComponent(TestComponent);

        const directiveEl = fixture.debugElement.query(By.directive(GridItemDirective));
        expect(directiveEl).not.toBeNull();
    });

    it('should apply the default styles', () => {

        const fixture = TestBed.createComponent(TestComponent);

        fixture.detectChanges();

        const divElement = fixture.debugElement.query(By.directive(GridItemDirective)).nativeElement;

        expect(divElement.style.flex).toBe('1 1 0%');
        expect(divElement.style.padding).toBe('2px');
        expect(divElement.style.margin).toBe('0px');
        expect(divElement.style.alignSelf).toBe('center');
    });

    it('should apply the input styles', () => {

        const fixture = TestBed.createComponent(CustomTestComponent);

        fixture.detectChanges(); // Trigger change detection

        const divElement = fixture.debugElement.query(By.directive(GridItemDirective)).nativeElement;

        expect(divElement.style.flex).toBe('2 1 0%');
        expect(divElement.style.padding).toBe('10px');
        expect(divElement.style.margin).toBe('5px');
        expect(divElement.style.alignSelf).toBe('flex-start');
    });
});