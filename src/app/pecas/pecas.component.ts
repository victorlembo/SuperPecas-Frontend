import { Component, OnInit } from '@angular/core';
import { PecasService } from '../services/pecas.service';
import { Peca } from '../model/Peca';

@Component({
  selector: 'app-pecas',
  templateUrl: './pecas.component.html',
  styleUrls: ['./pecas.component.css']
})
export class PecasComponent {
  peca: Peca = {
    pecaID: '',
    nome: '',
    descricao: '',
    numeroSerie: '',
    fabricante: '',
    modeloCarro: '',
    carroID: '',
  };

  data: any[] = [];
  totalRecords = 0;
  first = 0;
  rows = 10;
  visible: boolean = false;
  term: string = '';
  dialogHeader: string = '';
  isEdit: boolean = false;
  display: boolean = false;
  message: string = '';

  constructor(private pecasService: PecasService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.pecasService.getAll().subscribe((response: any) => {
      this.data = response;
    });
  }

  getAllPaged() {
    const page = this.first / this.rows;
    this.pecasService.getAllPaged(page).subscribe((response: any) => {
      this.data = response.content;
      this.totalRecords = response.totalElements;
    });
  }


  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  deletePeca(pecaID: number) {
    this.pecasService.deletePeca(pecaID)
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.openDialog(response.message);
            window.location.reload();
          }
        },
        error: (error) => {
          if (error.status === 400 || error.status === 404) {
            this.openDialog(error.error);
          }
        }
      });
  }




  updatePeca(peca: Peca) {
    this.pecasService.updatePeca(peca).subscribe({
      error: (error) => {
        if (error.status === 400) {
          this.openDialog(error.error);
        }
        if (error.status === 404) {
          this.openDialog(error.error);
        }
      }
    });
  }


  editForm(peca: Peca) {
    this.peca = { ...peca };
    this.visible = true;
    this.dialogHeader = "Editar Peça";
    this.isEdit = true;
  }

  addForm() {
    this.peca = {
      pecaID: '',
      nome: '',
      descricao: '',
      numeroSerie: '',
      fabricante: '',
      modeloCarro: '',
      carroID: '',
    };
    this.visible = true;
    this.dialogHeader = "Cadastrar Peça";
    this.isEdit = false;
  }

  submitForm() {
    if (this.isEdit) {
      this.updatePeca(this.peca);
    } else {
      this.createPeca(this.peca);
    }
    this.closeForm();
    window.location.reload();
  }

  closeForm() {
    this.visible = false;
  }

  createPeca(peca: Peca) {
    this.pecasService.createPeca(peca)
      .subscribe({
        next: () => {
          this.closeForm();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (error: any) => {
        }
      });
  }

  search(): void {
    if (this.term.trim()) {
      this.pecasService.findAllPagedByTerm(this.term).subscribe((data) => {
        this.data = data.content;
        this.totalRecords = data.totalElements;
      });
    } else {
      this.getAllPaged();
    }
  }

  clearSearch(): void {
    this.term = '';
    this.getAll();
  }

  openDialog(message: string) {
    this.display = true;
    this.message = message;
  }

}
