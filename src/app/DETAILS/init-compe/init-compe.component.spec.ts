import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitCompeComponent } from './init-compe.component';

describe('InitCompeComponent', () => {
  let component: InitCompeComponent;
  let fixture: ComponentFixture<InitCompeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitCompeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitCompeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
