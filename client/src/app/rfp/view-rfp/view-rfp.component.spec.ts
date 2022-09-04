import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRfpComponent } from './view-rfp.component';

describe('ViewRfpComponent', () => {
  let component: ViewRfpComponent;
  let fixture: ComponentFixture<ViewRfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRfpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
