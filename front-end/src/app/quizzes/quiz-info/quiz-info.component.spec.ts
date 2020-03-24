import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInfoComponent } from './quiz-info.component';

describe('QuizInfoComponent', () => {
  let component: QuizInfoComponent;
  let fixture: ComponentFixture<QuizInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
