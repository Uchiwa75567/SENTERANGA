import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsGouvernementauxComponent } from './rapports-gouvernementaux.component';

describe('RapportsGouvernementauxComponent', () => {
  let component: RapportsGouvernementauxComponent;
  let fixture: ComponentFixture<RapportsGouvernementauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportsGouvernementauxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RapportsGouvernementauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
