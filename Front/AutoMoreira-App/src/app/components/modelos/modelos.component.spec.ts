/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelosComponent } from './modelos.component';

describe('ModelosComponent', () => {
  let component: ModelosComponent;
  let fixture: ComponentFixture<ModelosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
