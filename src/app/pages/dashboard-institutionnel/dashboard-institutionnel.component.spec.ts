import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInstitutionnelComponent } from './dashboard-institutionnel.component';

describe('DashboardInstitutionnelComponent', () => {
  let component: DashboardInstitutionnelComponent;
  let fixture: ComponentFixture<DashboardInstitutionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInstitutionnelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardInstitutionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
