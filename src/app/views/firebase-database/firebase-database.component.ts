import { Component } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-firebase-database',
    imports: [CommonModule, FormsModule],
    templateUrl: './firebase-database.component.html',
    styleUrl: './firebase-database.component.scss'
})
export class FirebaseDatabaseComponent {
  messageOfTheDay: string = '';
  imageTitle: string = '';

  constructor(private storageService: StorageService, private authService: AuthService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    /* We always load OUR information, not from others */
    this.storageService.getDocumentByAddress(`miscellaneous-features/firebase-database-section/users/${this.authService.getCurrentUser()?.uid}`).subscribe({
      next: (resp) => {
        this.messageOfTheDay = resp?.['messageOfTheDay'];
        this.imageTitle = resp?.['imageTitle'];
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.storageService.getFileUrl(`gs://miscellaneous-fts.firebasestorage.app/miscellaneous-features/firebase-database-section/users/${this.authService.getCurrentUser()?.uid}`).then((fileUrl) => {
      if (fileUrl) {
        this.fileType = 'firebase';
        this.fileSrc = fileUrl;
      }
    });
  }

  setInfoDatabase() {
    return this.storageService.setDocumentByAddress(`miscellaneous-features/firebase-database-section/users/${this.authService.getCurrentUser()?.uid}`, {
      messageOfTheDay: this.messageOfTheDay,
      imageTitle: this.imageTitle,
    });
  }

  
  /*=============================================
  =            Input file            =
  =============================================*/
  
  fileType: string = '';
  fileSrc: string = 'assets/blueWallpaper.png';
  fileTitle: string = 'Upload your file';
  previewHover: boolean = false;
  file: any;

  hoverTitle() {
    this.previewHover = true;
  }

  blurTitle() {
    this.previewHover = false;
  }

  previewBeforeUpload($event: any) {
    if (!$event.target.files.length) {
      return;
    }

    this.file = $event.target.files[0];
    this.fileTitle = this.file.name;
    this.imageTitle = this.file.name; //We update the title here, linked to the database
    this.fileSrc = URL.createObjectURL(this.file);
    this.blurTitle();

    /* We set the file type */
    const fileTitleArr = this.fileTitle.split('.');
    const termination = fileTitleArr[fileTitleArr.length - 1];

    if (termination == 'png' || termination == 'jpg') {
      this.fileType = 'image';
    } else {
      this.fileType = '';
    }
  }
  
  clearFile() {
    if (this.fileSrc.startsWith('blob:')) {
      URL.revokeObjectURL(this.fileSrc); // Limpia la URL generada
    }

    this.fileType = '';
    this.fileSrc = 'assets/blueWallpaper.png';
    this.fileTitle = 'Upload your file';
    this.previewHover = false;
    this.file = null;
  }

  //Saves the file and its title
  saveData() {
    this.setInfoDatabase();
    if (this.file) {
      this.storageService.uploadFile(`gs://miscellaneous-fts.firebasestorage.app/miscellaneous-features/firebase-database-section/users/${this.authService.getCurrentUser()?.uid}`, this.file).then(() => {
        this._snackBar.open('File saved', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }).catch((err) => {
        console.error(err);
        this._snackBar.open('There is an error, try uploading a smaller file', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });
    } else {
      this._snackBar.open('Title saved', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  }
  
  /*=====  End of Input file  ======*/
}
