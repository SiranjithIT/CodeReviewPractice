import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsDispayComponent } from './errors-dispay.component';

describe('ErrorsDispayComponent', () => {
  let component: ErrorsDispayComponent;
  let fixture: ComponentFixture<ErrorsDispayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorsDispayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorsDispayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
