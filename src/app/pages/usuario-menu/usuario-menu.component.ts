import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@/shared/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-usuario-menu',
    imports: [CommonModule, MenuModule, ButtonModule],
    templateUrl: './usuario-menu.component.html',
    styleUrl: './usuario-menu.component.css'
})
export class UsuarioMenuComponent {

  nombreUsuario: string = '';
  cedula: string = '';
  isAuthenticated = false;
  userPhoto: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.username$.subscribe((username) => {
      this.nombreUsuario = username;
    });

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.cedula$.subscribe((cedula) => {
      this.cedula = cedula;
    });

    this.authService.userPhoto$.subscribe((photo) => {
      this.userPhoto = photo;
    });

    this.menuItems = [
      {
        label: 'Iniciar Sesión',
        icon: 'pi pi-sign-in',
        visible: !this.isAuthenticated,
        command: () => this.onLoginClick()
      },
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        visible: this.isAuthenticated,
        command: () => this.onProfileClick()
      },
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        visible: this.isAuthenticated,
        command: () => this.onSettingsClick()
      },
      {
        separator: true,
        visible: this.isAuthenticated
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        visible: this.isAuthenticated,
        command: () => this.onLogoutClick()
      }
    ];
  }

  onProfileClick() {
    // Acción para el perfil
  }

  onSettingsClick() {
    // Acción para la configuración
  }

  async onLogoutClick() {
    await this.authService.logout();
  }

  async onLoginClick() {
    await this.authService.login();
  }

  menuItems: MenuItem[] = [];

}
