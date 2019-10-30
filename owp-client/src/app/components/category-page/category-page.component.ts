import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service'
import { Category } from '../../interfaces';
import { MaterializeService, Modal } from '../../services/materialize.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


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

  userRole = null
  imagePreview = ''
  categoryId: string

  currentPage: number = 1
  maxPage: number = 0
  categoriesQuantity: number


  constructor(private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.userRole = this.authService.getUserData().role

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    this.fetch()
  }

  private fetch() {

    this.categoryService.getAll('-1').subscribe(
      categories => this.categoriesQuantity = categories.length,
      error => MaterializeService.toast(error.error.message),
      () => this.maxPage = Math.ceil(this.categoriesQuantity / 3)
    )

    this.categoryService.getAll(this.currentPage.toString()).subscribe(
      categories => {
        this.categories = categories
      },
      error => MaterializeService.toast(error.message ? error.message : error)
    )
  }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.userRole = null
    this.modal.destroy()
  }

  onDeleteCategory(event: Event, category: Category) {
    event.stopPropagation()

    const deleting = window.confirm(`Ви дійсно хочете видалити "${category.name}" ?`)

    if (deleting) {
      this.categoryService.delete(category).subscribe(
        response => {
          const index = this.categories.findIndex(c => c._id === category._id)
          if (this.categories.length % 3 === 1 && this.currentPage !== 1) this.previosPage()
          else this.fetch()

          // if (this.maxPage === 1 && this.categoriesQuantity === 0) this.currentPage = 0

          MaterializeService.toast(`Категорія "${this.categories[index].name}" була успішно видаленa`)
        },
        error => MaterializeService.toast(error.message ? error.message : error)
      )
    }
  }

  onUpdateCategory(event: Event, category: Category) {
    this.image = null
    this.form.enable()
    this.form.patchValue({
      name: category.name
    })
    console.log(this.imagePreview);
    
    this.imagePreview = category.imageSrc
    console.log(this.imagePreview);
    this.categoryId = category._id
    this.modal.open()
    MaterializeService.updateTextInputs()
    
    event.stopPropagation()

    this.isNew = false
  }

  onAddCategory() {
    this.image = null
    this.form.reset({ name: '' })
    this.imagePreview = ''

    this.isNew = true
    this.form.enable()
    this.modal.open()
  }

  onCancel() {
    this.modal.close()
  }

  onFormSubmit() {

    let observable$
    this.form.disable()

    if (this.isNew) {
      //create
      
      observable$ = this.categoryService.create(this.form.value.name, this.image)

    } else {
      //update
      observable$ = this.categoryService.update(this.categoryId, this.form.value.name, this.image)
    }

    observable$.subscribe(
      category => {
        if (this.isNew) {
          
          if(this.categories.length !== 3) this.categories.push(category)
          else this.fetch()
          MaterializeService.toast('Нова категорія буа створена')
        } else {
          console.log(category);
          
          const index = this.categories.findIndex(c => c._id === category._id)
          this.categories[index] = category
          // this.fetch()
          MaterializeService.toast(`Категорію було успішно відредаговано`)
        }
      },
      error => {
        MaterializeService.toast(error.message ? error.message : error)
        this.form.enable()
      }
    )

    this.modal.close()
    this.imagePreview = ''
    this.form.value.name = ''
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
    this.router.navigate([`/categories/${category._id}`])
  }

  previosPage() {
    this.currentPage--
    this.fetch()
  }

  nextPage() {
    this.currentPage++
    this.fetch()
  }

}
