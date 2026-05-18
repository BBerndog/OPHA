import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureEvents } from './future-events';

describe('FutureEvents', () => {
  let component: FutureEvents;
  let fixture: ComponentFixture<FutureEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureEvents],
    }).compileComponents();

    fixture = TestBed.createComponent(FutureEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
