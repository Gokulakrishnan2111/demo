import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMenusComponent } from './assign-menus.component';

describe('AssignMenusComponent', () => {
  let component: AssignMenusComponent;
  let fixture: ComponentFixture<AssignMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
