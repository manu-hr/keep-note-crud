import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from '../models/note';
import { NOTES } from '../models/notes';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  note:Note = {
    id: undefined,
    title: '',
    content: ''
  };

  @Output()
  noteAdded:EventEmitter<Note> = new EventEmitter();

  constructor(private noteService : NotesService) { }

  ngOnInit(): void {
  }

  add():void {
    this.noteAdded.emit(this.note)
  }

}
