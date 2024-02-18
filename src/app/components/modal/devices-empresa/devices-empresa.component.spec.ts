import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesEmpresaComponent } from './devices-empresa.component';

describe('DevicesEmpresaComponent', () => {
  let component: DevicesEmpresaComponent;
  let fixture: ComponentFixture<DevicesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevicesEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevicesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
