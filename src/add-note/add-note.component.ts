import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NOTES } from '../notes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-note',
  standalone: true,
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css',
  imports: [RouterModule, ReactiveFormsModule],
})
export class AddNoteComponent {
  // Inyección de dependencias del servicio Router
  router = inject(Router);

    // Creación de un formulario reactivo con dos campos: title y text
  addNoteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl(''),
  });

    // Método que se ejecuta cuando se hace click en el botón de añadir nota
  addNote() {
      // Obtención de los valores de los campos title y text del formulario
    let title = this.addNoteForm.value.title ?? '';
    let text = this.addNoteForm.value.text ?? '';

        // Comprobación de que el formulario es válido
    if (this.addNoteForm.valid) {
      let ids = NOTES.map((a) => a.id);
      let maxId = 0;
      if (ids.length > 0) {
        maxId = Math.max(...ids);
      }

        // Creación de una nueva nota con los valores obtenidos
      let newNote = {
        id: maxId + 1,
        title: title,
        text: text,
      };
        // Añadido de la nueva nota a la lista de notas
      NOTES.unshift(newNote);

      // Reinicio del formulario
      this.addNoteForm.reset();

      // Redirección a la página principal
      this.router.navigateByUrl('');
    }
  }
}
