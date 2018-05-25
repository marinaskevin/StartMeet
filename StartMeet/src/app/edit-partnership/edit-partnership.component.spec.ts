import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnershipComponent } from './edit-partnership.component';

describe('EditPartnershipComponent', () => {
  let component: EditPartnershipComponent;
  let fixture: ComponentFixture<EditPartnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
