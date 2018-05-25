import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPartnershipComponent } from './new-partnership.component';

describe('NewPartnershipComponent', () => {
  let component: NewPartnershipComponent;
  let fixture: ComponentFixture<NewPartnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPartnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
