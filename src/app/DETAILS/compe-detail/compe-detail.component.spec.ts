import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompeDetailComponent } from './compe-detail.component';

describe('CompeDetailComponent', () => {
  let component: CompeDetailComponent;
  let fixture: ComponentFixture<CompeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
