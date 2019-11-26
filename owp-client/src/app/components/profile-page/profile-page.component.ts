import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{

  @ViewChild('inputFile', null) inputFileRef: ElementRef
  image: File
  imagePreview: string = ''

  profile = {email: ''}

  constructor(private authService: AuthService) { }


  ngOnInit() {
    this.authService.myProfile().subscribe(
      res => this.profile = res
    )
  }

  triggerClick() {
    this.inputFileRef.nativeElement.click()
  }

  onFileUpload(event: any) {

    const file = event.target.files[0]
    this.image = file


    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }

    reader.readAsDataURL(file)
  }

}
