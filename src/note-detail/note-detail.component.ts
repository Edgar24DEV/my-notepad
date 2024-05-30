import { Component, ElementRef, NgModule, OnInit, ViewChild, inject } from '@angular/core';
import { NOTES } from '../notes';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-note-detail',
  standalone: true,
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.css',
  imports: [RouterModule, ReactiveFormsModule],
})


export class NoteDetailComponent implements OnInit{
  router = inject(Router); 
  activeRoute = inject(ActivatedRoute);
  id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  note = NOTES.find((i) => i.id === this.id);
  
  editNoteForm = new FormGroup({
    title: new FormControl(this.note?.title, Validators.required),
    text: new FormControl(this.note?.text),
  });


  ngOnInit() {
    if (this.note) {
      this.editNoteForm.patchValue({ text: this.note.text }); // Inicializar el contenido del área de texto con el texto de la nota
    }
  }

  
  deleteNote(){
    if(this.note && confirm("Are you sure?")){
      this.router.navigateByUrl('');
      let del = NOTES.indexOf(this.note, 0);
      NOTES.splice(del, 1);
    }
  }
  deleteNote2(){
    if(this.note){
      this.router.navigateByUrl('');
      let del = NOTES.indexOf(this.note, 0);
      NOTES.splice(del, 1);
    }
  }
  
saveNote(){
 
    
  if (this.editNoteForm.valid) {
    let title = this.editNoteForm.value.title ?? '';
    let text = this.editNoteForm.value.text ?? '';

    let ids = NOTES.map((a) => a.id);
    let maxId = 0;
    if (ids.length > 0) {
      maxId = Math.max(...ids);
    }
  
  let newNote = {
    id: this.id,
    title: title,
    text: text,
  };
  this.deleteNote2();
  NOTES.unshift(newNote);
  this.router.navigateByUrl('');
  
}
}



}