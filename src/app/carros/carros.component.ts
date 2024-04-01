import { Component, OnInit } from '@angular/core';
import { CarrosService } from '../services/carros.service';
import { Carro } from '../model/Carro';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {
  carro: Carro = {
    carroID: '',
    nomeModelo: '',
    fabricante: '',
    codigoUnico: '',
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

  constructor(private carroService: CarrosService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.carroService.getAll().subscribe((response: any) => {
      this.data = response;
    });
  }

  getAllPaged() {
    const page = this.first / this.rows;
    this.carroService.getAllPaged(page).subscribe((response: any) => {
      this.data = response.content;
      this.totalRecords = response.totalElements;
    });
  }


  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  deleteCarro(carroId: number) {
    this.carroService.deleteCarro(carroId)
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.openDialog(response.message);
            this.getAll();
          }
        },
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

  updateCarro(carro: Carro) {
    this.carroService.updateCarro(carro).subscribe({
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



  editForm(carro: Carro) {
    this.carro = { ...carro };
    this.visible = true;
    this.dialogHeader = "Editar Carro";
    this.isEdit = true;
  }

  addForm() {
    this.carro = { carroID: '', nomeModelo: '', fabricante: '', codigoUnico: '' };
    this.visible = true;
    this.dialogHeader = "Cadastrar Carro";
    this.isEdit = false;
  }

  submitForm() {
    if (this.isEdit) {
      this.updateCarro(this.carro);
    } else {
      this.createCarro(this.carro);
    }
    this.closeForm();
    window.location.reload();
  }

  closeForm() {
    this.visible = false;
  }

  createCarro(carro: Carro) {
    this.carroService.createCarro(carro)
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
      this.carroService.findAllPagedByTerm(this.term).subscribe((data) => {
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
