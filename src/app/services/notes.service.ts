import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  
  url:string = 'http://localhost:3000/notes';

  notes = new BehaviorSubject<Note[]>([]);
    
  constructor( private http:HttpClient) {  }


  getNotes():Observable<Note[]> {
    return this.http.get<Note[]>(this.url);
  }

  addNotes(note:Note):Observable<any> {
    return this.http.post(this.url, note)
  }

  deleteNote(id:Note['id']):Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
