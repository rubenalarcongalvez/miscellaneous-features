import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss'
})
export class InputFileComponent {
  fileType: string = '';
  fileSrc: string = 'assets/blueWallpaper.png';
  fileTitle: string = 'Upload your file to preview';
  previewHover: boolean = false;
  file = null;

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

    const file = $event.target.files[0];
    this.fileTitle = file.name;
    this.fileSrc = URL.createObjectURL(file);
    this.blurTitle();

    /* We set the file type */
    const fileTitleArr = this.fileTitle.split('.');
    const termination = fileTitleArr[fileTitleArr.length - 1];

    if (termination == 'png' || termination == 'jpg') {
      this.fileType = 'image';
    } else if (termination == 'mp4' || termination == 'avi') {
      this.fileType = 'video';
    } else {
      this.fileType = '';
    }
  }
  
  clear() {
    this.fileType = '';
    this.fileSrc = 'assets/blueWallpaper.png';
    this.fileTitle = 'Upload your file to preview';
    this.previewHover = false;
    this.file = null;
  }
}
