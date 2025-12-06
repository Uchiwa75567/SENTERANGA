import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DataService, TestUser, Product } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './dashboard-admin.component.html'
})
export class DashboardAdminComponent {
  users: TestUser[] = [];
  userMap: { [id: string]: string } = {}; // map userId to full name
  loading = false;
  errorMessage = '';

  // Products validation
  pendingProducts: Product[] = [];
  selectedReason: { [id: string]: string } = {};

  // Announcements validation
  pendingAnnouncements: Product[] = [];
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadPendingProducts();
    this.loadPendingAnnouncements();
  }

  showToastMessage(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 3000);
  }

  loadUsers() {
    this.loading = true;
    this.errorMessage = '';
    this.dataService.getTestUsers().subscribe({
      next: (users) => {
        // Show all users except the current admin
        const currentUser = localStorage.getItem('currentUser');
        const currentAdminId = currentUser ? JSON.parse(currentUser).id : null;
        this.users = users.filter(u => u.id !== currentAdminId && u.userType !== 'admin');
        // Build user map for quick lookups
        users.forEach(u => {
          this.userMap[u.id] = `${u.firstName} ${u.lastName}`;
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    });
  }

  // --- Products ---
  loadPendingProducts() {
    this.dataService.getAllProducts().subscribe({
      next: (list) => {
        this.pendingProducts = (list || []).filter(p => p.statutValidation === 'en_attente' && !(p as any).isAnnonce);
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  // --- Announcements ---
  loadPendingAnnouncements() {
    this.dataService.getAllProducts().subscribe({
      next: (list) => {
        this.pendingAnnouncements = (list || []).filter(p => (p as any).isAnnonce && (p as any).statutAnnonce === 'en_attente');
      },
      error: (err) => {
        console.error('Error loading announcements', err);
      }
    });
  }

  approveAnnouncement(announcement: Product) {
    const updatedAnnouncement = {
      ...announcement,
      statutAnnonce: 'validee' as const,
      statutValidation: 'validé' as const,
      statutDisponibilite: 'disponible' as const
    };

    this.dataService.updateProduct(updatedAnnouncement as any).subscribe({
      next: (result) => {
        // Create notification for the farmer
        this.dataService.createNotification({
          id: `notif-${Date.now()}`,
          userId: announcement.agriculteurId,
          type: 'announcement',
          title: 'Annonce approuvée',
          message: `Votre annonce « ${announcement.titre} » a été approuvée et sera disponible approximativement de ${(announcement as any).periodeApproximativeDebut} à ${(announcement as any).periodeApproximativeFin}.`,
          date: new Date().toISOString(),
          read: false,
          createdAt: new Date().toISOString()
        }).subscribe(() => {
          this.showToastMessage(`Annonce « ${announcement.titre} » approuvée ✓`);
          this.loadPendingAnnouncements();
        });
      },
      error: (err) => {
        console.error('Approve announcement failed', err);
        this.showToastMessage('Erreur lors de l\'approbation de l\'annonce', 'error');
      }
    });
  }

  rejectAnnouncement(announcement: Product) {
    const updatedAnnouncement = {
      ...announcement,
      statutAnnonce: 'rejetee' as const,
      statutValidation: 'rejeté' as const
    };

    this.dataService.updateProduct(updatedAnnouncement as any).subscribe({
      next: (result) => {
        // Create notification for the farmer
        this.dataService.createNotification({
          id: `notif-${Date.now()}`,
          userId: announcement.agriculteurId,
          type: 'announcement',
          title: 'Annonce rejetée',
          message: `Votre annonce « ${announcement.titre} » a été rejetée par l'administration.`,
          date: new Date().toISOString(),
          read: false,
          createdAt: new Date().toISOString()
        }).subscribe(() => {
          this.showToastMessage(`Annonce « ${announcement.titre} » rejetée ✗`);
          this.loadPendingAnnouncements();
        });
      },
      error: (err) => {
        console.error('Reject announcement failed', err);
        this.showToastMessage('Erreur lors du rejet de l\'annonce', 'error');
      }
    });
  }

  // Helper methods for announcement properties
  getAnnouncementStartDate(announcement: any): string {
    return announcement.periodeApproximativeDebut || '';
  }

  getAnnouncementEndDate(announcement: any): string {
    return announcement.periodeApproximativeFin || '';
  }

  approve(user: TestUser) {
    const updated = { ...user, isValidated: true, validationStatus: 'approved' } as TestUser;
    this.dataService.updateUser(updated).subscribe({
      next: (result) => {
        // Create notification
        this.dataService.createNotification({
          id: `notif-${Date.now()}`,
          userId: updated.id,
          type: 'validation',
          title: 'Compte approuvé',
          message: 'Votre compte a été approuvé par l\'administration SENTERANGA. Vous pouvez maintenant vous connecter.',
          date: new Date().toISOString(),
          read: false,
          createdAt: new Date().toISOString()
        }).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Utilisateur approuvé',
              text: `${updated.firstName} ${updated.lastName} a été approuvé(e)`,
              confirmButtonColor: '#22c55e'
            });
            this.loadUsers();
          },
          error: () => {
            Swal.fire({
              icon: 'warning',
              title: 'Utilisateur approuvé',
              text: 'Utilisateur approuvé, mais erreur lors de la notification',
              confirmButtonColor: '#22c55e'
            });
            this.loadUsers();
          }
        });
      },
      error: (err) => {
        console.error('Error updating user:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur d\'approbation',
          text: 'Une erreur s\'est produite lors de l\'approbation',
          confirmButtonColor: '#22c55e'
        });
      }
    });
  }

  reject(user: TestUser) {
    const updated = { ...user, isValidated: false, validationStatus: 'rejected' } as TestUser;
    this.dataService.updateUser(updated).subscribe({
      next: (result) => {
        this.dataService.createNotification({
          id: `notif-${Date.now()}`,
          userId: updated.id,
          type: 'validation',
          title: 'Compte rejeté',
          message: 'Votre demande d\'inscription a été rejetée. Contactez le support pour plus d\'informations.',
          date: new Date().toISOString(),
          read: false,
          createdAt: new Date().toISOString()
        }).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Utilisateur rejeté',
              text: `${updated.firstName} ${updated.lastName} a été rejeté(e)`,
              confirmButtonColor: '#22c55e'
            });
            this.loadUsers();
          },
          error: () => {
            Swal.fire({
              icon: 'warning',
              title: 'Utilisateur rejeté',
              text: 'Utilisateur rejeté, mais erreur lors de la notification',
              confirmButtonColor: '#22c55e'
            });
            this.loadUsers();
          }
        });
      },
      error: (err) => {
        console.error('Error updating user:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de rejet',
          text: 'Une erreur s\'est produite lors du rejet',
          confirmButtonColor: '#22c55e'
        });
      }
    });
  }

  approveProduct(product: Product) {
    this.dataService.updateProductStatus(product.id, 'validé').subscribe({
      next: (updated) => {
        const note = {
          id: `note-${Date.now()}`,
          userId: product.agriculteurId,
          title: 'Produit validé',
          message: `Votre produit « ${product.titre} » a été validé et est maintenant visible sur le marché.`,
          createdAt: new Date().toISOString(),
          read: false
        };
        this.dataService.createNotification(note).subscribe(() => {
          this.showToastMessage(`Produit « ${product.titre} » validé ✓`);
          this.loadPendingProducts();
        });
      },
      error: (err) => { console.error('Approve product failed', err); this.showToastMessage('Erreur lors de la validation', 'error'); }
    });
  }

  rejectProduct(product: Product) {
    const reason = this.selectedReason[product.id] || '';
    if (!reason.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Motif requis',
        text: 'Veuillez saisir un motif de refus.',
        confirmButtonColor: '#22c55e'
      });
      return;
    }

    this.dataService.updateProductStatus(product.id, 'rejeté').subscribe({
      next: (updated) => {
        const note = {
          id: `note-${Date.now()}`,
          userId: product.agriculteurId,
          title: 'Produit rejeté',
          message: `Votre produit « ${product.titre} » a été rejeté. Motif: ${reason}`,
          createdAt: new Date().toISOString(),
          read: false
        };
        this.dataService.createNotification(note).subscribe(() => {
          this.showToastMessage(`Produit « ${product.titre} » rejeté ✗`);
          this.loadPendingProducts();
        });
      },
      error: (err) => { console.error('Reject product failed', err); this.showToastMessage('Erreur lors du refus', 'error'); }
    });
  }
}
