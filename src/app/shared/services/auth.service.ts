import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UsuarioModelo } from '../interfaces/usuario.model';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>('');
  private cedulaSubject = new BehaviorSubject<string>('');
  private userPhotoSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();
  cedula$ = this.cedulaSubject.asObservable();
  userPhoto$ = this.userPhotoSubject.asObservable();

  router = inject(Router);

  constructor(
    private readonly keycloak: KeycloakService,
    private http: HttpClient,
  ) {
    this.checkAuth();
  }

  private async checkAuth(): Promise<void> {
    const isAuthenticated = await this.keycloak.isLoggedIn();
    this._isAuthenticated.next(isAuthenticated);

    if (isAuthenticated) {
      console.log(this.keycloak.loadUserProfile());
      const usuario = await this.keycloak.loadUserProfile();
      if (usuario) {
        this.usernameSubject.next(usuario.firstName + ' ' + usuario.lastName);
        this.cedulaSubject.next(usuario.username!);
        this.obtenerFoto(usuario.username!).subscribe((foto) => {
          this.userPhotoSubject.next(foto);
        });
      }
    } else {
      this.usernameSubject.next('');
      this.cedulaSubject.next('');
      this.userPhotoSubject.next(null);
    }
  }

  get isAuthenticated$() {
    return this._isAuthenticated.asObservable();
  }

  async login(): Promise<void> {
    try {
      await this.keycloak?.login();
      this._isAuthenticated.next(false);
      await this.checkAuth();
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.keycloak?.logout(location.origin);
      this._isAuthenticated.next(false);
      this.usernameSubject.next('');
      this.cedulaSubject.next('');
      this.userPhotoSubject.next(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  async getToken() {
    if (!this.keycloak.isLoggedIn()) {
      return null;
    }
    if (this.keycloak.isTokenExpired()) {
      try {
        await this.keycloak?.updateToken();
      } catch (error) {
        return null;
      }
    }
    return this.keycloak?.getToken();
  }

  obtenerFoto(cedula: string): Observable<string> {
    return this.http
      .get<{
        imagenBase64: string;
      }>(
        `${environment.apiSiperComunFoto }militares/remote-images/${cedula}`,
      )
      .pipe(
        map((response: { imagenBase64: string }) => `data:image/jpeg;base64,${response.imagenBase64}`),
      );
  }

  obtenerDatosUsuario():UsuarioModelo{
    return{
    username: this.usernameSubject.value,
    cedula: this.cedulaSubject.value,
  }
}
establecerDatosUsuario(usuario: UsuarioModelo): void {
  this.usernameSubject.next(usuario.username);
  this.cedulaSubject.next(usuario.cedula);
  localStorage.setItem('username', usuario.username);
  localStorage.setItem('cedula', usuario.cedula);
}
}
