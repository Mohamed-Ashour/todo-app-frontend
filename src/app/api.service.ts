import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { Http, Response } from '@angular/http';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) {
  }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos')
      .map(response => {
        const todos = response.json();
        return todos.map((todo) => new Todo(todo));
      })
      .catch(this.handleError);
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<any> {
    return this.http
      .post(API_URL + '/todos', todo)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  // API: GET /todos/:_id
  public getTodoById(todoId: number): Observable<any> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  // API: PUT /todos/:_id
  public updateTodo(todo: Todo): Observable<any> {
    return this.http
      .put(API_URL + '/todos/' + todo._id, todo)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public deleteTodoById(todoId: number): Observable<any> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}