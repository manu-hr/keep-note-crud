import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../models/note';
import { NOTES } from '../models/notes';
import { NotesService } from '../services/notes.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Note[] = [];
  id?: Note["id"];
  title?: Note['title'];
  content?: Note['content'];
  addNoteView:boolean = false;

  constructor(private noteService: NotesService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getNotes();
    this.noteService.notes.subscribe((data) => this.notes = data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      disableClose: true,
      width: '250px',
      data: { id: this.id, title: this.title, content: this.content },
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result.id == null || result.title == null)
        return;
      this.noteService.addNotes(result).subscribe({
        next: data => {
          this.openSnackBar("Note Added");
          this.notes?.push(result);
        },
        error: err => {
          this.openSnackBar("Failed to Add Note");
          alert(err.message)
        }
      });
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK")._dismissAfter(2000);
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.noteService.notes.next(data);
      },
      error: err => alert(err.message)
    })
  }

  addNote(note:Note) {
    this.noteService.addNotes(note).subscribe({
      next : (data) => {
        console.log(data);
        
        this.notes?.push(note);
        this.noteService.notes.next(this.notes);
        this.openSnackBar("Note Added");
        this.addNoteView = false;
      },
      error : err => this.openSnackBar("Something Went Wrong! Note Not Added")
    });
  }

  deleteNote(id:Note['id']):void {
    this.noteService.deleteNote(id).subscribe({
      next: data =>{
        console.log(data);
        this.openSnackBar("Note Deleted");
        let newNoteList:Note[] = this.notes?.filter((note)=> note.id != id) || [];
        this.noteService.notes.next(newNoteList);
      },
      error : err => this.openSnackBar("Something went wrong! Please Try Again!")
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './add-note-dialog.html',
})
export class AddNoteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}