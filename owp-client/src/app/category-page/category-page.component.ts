import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { Category } from '../interfaces';
import { MaterializeService, Modal } from '../materialize/materialize.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal', null) modalRef: ElementRef
  categories: Category[] = []
  isNew: Boolean = false


  //modal variables
  @ViewChild('inputFile', null) inputFileRef: ElementRef
  form: FormGroup
  modal: Modal
  image: File

  imagePreview = ''
  categoryIdPretendent: string
  categoryId: string


  constructor(private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
this.fetch()
  }

  private fetch() {
    this.categoryService.getAll().subscribe(
      categories => {
        this.categories = categories
      },
      error => console.log(error.message ? error.message : error)
    )
  }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  onDeleteCategory(event: Event, category: Category) {
    //   event.stopImmediatePropagation()
    event.stopPropagation()
    // event.preventDefault()

    const deleting = window.confirm(`Ви дійсно хочете видалити "${category.name}" ?`)

    if (deleting) {
      this.categoryService.delete(category).subscribe(
        response => {
          const index = this.categories.findIndex(c => c._id === category._id)
          this.categories.splice(index, 1)
        },
        error => console.log(error.message ? error.message : error)
      )
    }
  }

  onUpdateCategory(event: Event, category: Category) {
    this.modal.open()
    this.imagePreview = category.imageSrc
    this.categoryId = this.categoryIdPretendent

    event.stopPropagation()

    // event.preventDefault()

    this.form.patchValue({
      name: category.name
    })

    this.isNew = false
    this.categoryIdPretendent = ''
  }

  onAddCategory() {

    this.form.reset({name: ''})
    this.imagePreview = ''

    this.isNew = true
    this.modal.open()

  }

  onCancel() {
    this.modal.close()
  }

  onFormSubmit() {

    let observable$
    this.form.disable

    if (this.isNew) {
      //create

      observable$ = this.categoryService.create(this.form.value.name, this.image)

    } else {
      //update
      observable$ = this.categoryService.update(this.categoryId, this.form.value.name, this.image)
    }


    observable$.subscribe(
      category => {
        this.form.disable()
        this.categories.push(category)
        
      },
      error => {
        console.log({
          success: false,
          message: error.message ? error.message : error
        })
        this.form.enable()
      }
    )


    this.modal.close()
    // this.fetch()
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

  getSelectedCategory(category: Category) {
    this.categoryIdPretendent = category._id
    // const link = '/categories'+category._id
    this.router.navigate([`/categories/${category._id}`])
  }

}
