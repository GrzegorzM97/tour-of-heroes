import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Enemy } from './enemy';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {

  private enemiesUrl = 'api/enemies';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getEnemies(): Observable<Enemy[]> {
    return this.http.get<Enemy[]>(this.enemiesUrl)
      .pipe(
        tap(_ => this.log('fetched enemies')),
        catchError(this.handleError<Enemy[]>('getEnemies', []))
      );
  }

  getEnemy(id: number): Observable<Enemy> {
    const url = `${this.enemiesUrl}/${id}`;
    return this.http.get<Enemy>(url).pipe(
      tap(_ => this.log(`fetched enemy id=${id}`)),
      catchError(this.handleError<Enemy>(`getEnemy id=${id}`))
    );
  }

  searchEnemies(term: string): Observable<Enemy[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Enemy[]>(`${this.enemiesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found enemies matching "${term}"`) :
         this.log(`no enemies matching "${term}"`)),
      catchError(this.handleError<Enemy[]>('searchEnemy', []))
    );
  }

  //////// Save methods //////////

  addEnemy(enemy: Enemy): Observable<Enemy> {
    return this.http.post<Enemy>(this.enemiesUrl, enemy, this.httpOptions).pipe(
      tap((newEnemy: Enemy) => this.log(`added enemy w/ id=${newEnemy.id}`)),
      catchError(this.handleError<Enemy>('addEnemy'))
    );
  }

  deleteEnemy(id: number): Observable<Enemy> {
    const url = `${this.enemiesUrl}/${id}`;

    return this.http.delete<Enemy>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted enemy id=${id}`)),
      catchError(this.handleError<Enemy>('deleteEnemy'))
    );
  }

  updateEnemy(enemy: Enemy): Observable<any> {
    return this.http.put(this.enemiesUrl, enemy, this.httpOptions).pipe(
      tap(_ => this.log(`updated enemy id=${enemy.id}`)),
      catchError(this.handleError<any>('updateEnemy'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

 
  private log(message: string) {
    this.messageService.add(`EnemyService: ${message}`);
  }
}
