import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carro } from './../model/Carro'

@Injectable({
  providedIn: 'root'
})
export class CarrosService {
  private baseUrl = 'http://localhost:8080/api/carro';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}/listarTodos`)
  }

  getAllPaged(page: number) {
    return this.http.get<any[]>(`${this.baseUrl}/listarTodosPaginados?page=${page}`)
  }

  getTop10Fabricantes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/listarTop10Fabricantes`);
  }

  getTop10CarroComMaisPecas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarTop10CarroComMaisPecas`);
  }

  deleteCarro(carroID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${carroID}`);
  }

  updateCarro(carro: Carro): Observable<Carro> {
    return this.http.put<Carro>(`${this.baseUrl}`, carro);
  }

  createCarro(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(`${this.baseUrl}`, carro);
  }

  findAllPagedByTerm(term: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarTodosPaginados/${term}`);
  }
}

