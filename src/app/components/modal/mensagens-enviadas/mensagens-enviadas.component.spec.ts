import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagensEnviadasComponent } from './mensagens-enviadas.component';

describe('MensagensEnviadasComponent', () => {
  let component: MensagensEnviadasComponent;
  let fixture: ComponentFixture<MensagensEnviadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MensagensEnviadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensagensEnviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
