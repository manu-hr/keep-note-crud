import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input()
  note?:Note
  showActions = false;
  icon:string = '';
  iconColor:string = '';

  @Output()
  ondelete:EventEmitter<Note['id']> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    switch(this.note?.priority) {
      case 'Critical' :{
        this.icon = 'gpp_maybe'; 
        this.iconColor = 'accent';

        break;
      } 
      case 'High' :{
        this.icon = 'arrow_circle_up';
        this.iconColor = 'accent';
        break;
      } 
      case 'Medium' :{
        this.icon = 'remove_circle_outline'; 
        this.iconColor = 'primary';

        break;
      }
      case 'Low' :{
        this.icon = 'arrow_circle_down';
        this.iconColor = 'primary';

        break;
      }
    }
  }

  onDelete(id:Note['id']): void {
    this.ondelete.emit(id);
  }

}
