import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peca } from '../model/Peca';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PecasService {
  private baseUrl = environment.apiUrl + '/api/peca';
  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/listarTodos`)
  }

  getAllPaged(page: number) {
    return this.http.get(`${this.baseUrl}/listarTodosPaginados?page=${page}`);
  }

  deletePeca(carroID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${carroID}`);
  }

  updatePeca(peca: Peca): Observable<Peca> {
    return this.http.put<Peca>(`${this.baseUrl}`, peca);
  }

  createPeca(peca: Peca): Observable<Peca> {
    return this.http.post<Peca>(`${this.baseUrl}`, peca);
  }

  findAllPagedByTerm(term: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarTodosPaginados/${term}`);
  }

}
