import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleDispositivoPage } from './detalle-dispositivo.page';

describe('DetalleDispositivoPage', () => {
  let component: DetalleDispositivoPage;
  let fixture: ComponentFixture<DetalleDispositivoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleDispositivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
