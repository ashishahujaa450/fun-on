import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextListingComponent } from './text-listing.component';

describe('TextListingComponent', () => {
  let component: TextListingComponent;
  let fixture: ComponentFixture<TextListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
