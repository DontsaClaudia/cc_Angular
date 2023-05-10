import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../Models/Client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  CREATE_CLIENT: string = 'http://localhost:8000/api/Client';

  constructor(public http: HttpClient) {}

  // Création d'un observable qui va émettre une client qui sera souscris dans le composant client
  insertClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.CREATE_CLIENT, client);
  }

  // Création d'un observable qui va émettre un tableau de client qui sera souscris dans le composant client
  loadClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.CREATE_CLIENT);
  }

  // Création d'un observable qui va émettre une client qui sera souscris dans le composant EditClient
  updateClient(id: number, client: Client): Observable<Client> {
    const url = `${this.CREATE_CLIENT}/${id}`;
    return this.http.put<Client>(url, client);
  }

  // Création d'un observable qui va émettre une région qui sera souscris dans le composant EditRegoion
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.CREATE_CLIENT}/${id}`);
  }

  // Suppression d'une région grace a son id
  deleteClient(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.CREATE_CLIENT}/${id}`);
  }
}
