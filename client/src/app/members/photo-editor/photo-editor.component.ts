import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { response } from 'express';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit, OnDestroy {

  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private accountService: AccountService, private membersService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    })
  }
  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.membersService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if (p.isMain)
              p.isMain = false;
            if (p.id === photo.id)
              p.isMain = true;
          });
        }
      }
    });
  }

  deletePhoto(photoId: number) {
    this.membersService.deletePhoto(photoId).subscribe({
      next: _ => {
        if (this.member) {
          this.member.photos = this.member.photos.filter(x => x.id !== photoId);
        }
      }
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedMimeType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
        if (photo.isMain && this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    }
  }

  ngOnDestroy(): void { }

}
