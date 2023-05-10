import { Client } from '../Models/Client.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/Services/Client.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  success!: string;
  public formClient!: FormGroup;
  public erreur!: string;
  clients: Client[] = [];
  client!: Client;

  constructor(
    public fb: FormBuilder,
    private ClientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formClient = this.fb.group({
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      telephone: ['', Validators.required],
    });

    this.chargementClient();
  }

  // récupration de l'observable (un tableau de région) émis par le service
  private chargementClient() {
    this.ClientService.loadClient().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },

    );
  }

  onSubmit() {
    const c = new Client();
    c.nom = this.formClient.value.nom;
    c.ville = this.formClient.value.ville;
    c.telephone = this.formClient.value.telephone;
    this.ClientService.insertClient(c).subscribe(
      (data: any) => {
        console.log(data);
        this.formClient.reset();
        // recharger la liste des régions après insertion réussie
        this.chargementClient();
        this.affichageMessage();
      },
      (error: any) => {
        console.log(error);
        this.erreur = "Erreur lors de l'insertion du client.";
      }
    );
  }

  private affichageMessage() {
    setTimeout(() => {
      this.success = 'Insertion réussie';
      setTimeout(() => {
        this.success = '';
      }, 2000);
    }, 3000);
  }

  gotoEditClient(client: Client) {
    this.router.navigate(['/clients', client.id]);
  }

  deleteClient(id: number) {
    this.ClientService.deleteClient(id).subscribe(
      (data: any) => {
        console.log(data);
        // Supprimer le client de la liste
        this.clients = this.clients.filter((c) => c.id !== id);
      },
      (error: any) => {
        console.log(error);
        this.erreur = 'Erreur lors de la suppression du client.';
      }
    );
  }
}
