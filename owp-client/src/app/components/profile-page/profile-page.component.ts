import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MaterializeService } from 'src/app/services/materialize.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  // @ViewChild('inputFile', null) inputFileRef: ElementRef
  @ViewChild('bio', null) bioRef: ElementRef
  @ViewChild('telegramTag', null) telegramTagRef: ElementRef
  telegramTag
  // image: File
  // imagePreview: string = ''
  bio: string = ''

  profile: User 

  constructor(private authService: AuthService) { }


  ngOnInit() {
    this.authService.myProfile().subscribe(
      res => {
        this.profile = res
        // this.imagePreview = res.imageSrc
      }
    )
  }

  // triggerClick() {
  //   this.inputFileRef.nativeElement.click()
  // }

  // onFileUpload(event: any) {

  //   // const file = event.target.files[0]
  //   // this.image = file
  //   this.image = event.target.files[0]
  //   // const reader = new FileReader()

  //   // // reader.onload = () => {
  //   // //   this.imagePreview = reader.result as string
  //   // // }

  //   // this.imagePreview = file.name


  //   // reader.readAsDataURL(file)

  // }

  onSubmit() {

    // this.profile.imageSrc = this.imagePreview
    if(this.profile.telegramTag !== this.telegramTagRef.nativeElement.value) this.profile.chatId = ''
    this.profile.bio = this.bioRef.nativeElement.value
    this.profile.telegramTag = this.telegramTagRef.nativeElement.value

    

    this.authService.update(this.profile).subscribe(
      res => MaterializeService.toast("Profile was succesfully updated!")
      
    )
    

    this.ngOnInit()

  }

}
