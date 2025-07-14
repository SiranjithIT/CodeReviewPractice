import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizedCodeComponent } from './optimized-code.component';

describe('OptimizedCodeComponent', () => {
  let component: OptimizedCodeComponent;
  let fixture: ComponentFixture<OptimizedCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimizedCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizedCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
