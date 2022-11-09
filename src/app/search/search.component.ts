import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../models/note';
import { NOTES } from '../models/notes';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText:string = '';

  constructor(private noteService:NotesService) { }

  ngOnInit(): void {
  }

  search() : void {
      this.noteService.getNotes().subscribe({
        next : (data:Note[]) => {
          if(this.searchText == "")
            this.noteService.notes.next(data);
          else {
            let searchRes = data.filter((note) => note.title.toLowerCase().trim().includes(this.searchText.trim()))
            this.noteService.notes.next(searchRes);
          }
        },
        error : err => alert(err.message)
      })
  }

}
