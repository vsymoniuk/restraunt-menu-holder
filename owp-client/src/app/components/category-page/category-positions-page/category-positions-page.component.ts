import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionService } from '../../../services/position.service';
import { Position, Category } from '../../../interfaces'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter } from 'minimatch';
import { Modal, MaterializeService } from 'src/app/services/materialize.service';

@Component({
  selector: 'app-category-positions-page',
  templateUrl: './category-positions-page.component.html',
  styleUrls: ['./category-positions-page.component.css']
})
export class CategoryPositionsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('search', null) searchRef: ElementRef
  positions: Position[] = []
  currentCategory: Category
  searchFilter: string = ''
  currentPosition: Position
  
  @ViewChild('modal', null) modalRef: ElementRef
  modal: Modal
  form: FormGroup
  isNew: Boolean = false


  constructor(private positionService: PositionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.searchFilter = this.searchRef.nativeElement.value
    this.positions = []

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })

    this.fetch(this.searchFilter)

    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {
            return this.categoryService.getById(params['id'])
          }
          return of(null)
        }
      )
    ).subscribe(
      category => {
        this.currentCategory = category
      }
    )

    this.searchFilter = ''

  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  private fetch(filter: string) {

    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {

            const parameters = Object.assign({}, {
              id: params['id'],
              filter: filter
            })

            return this.positionService.getByCategoryId(parameters)
          }
          return of(null)
        }
      )
    ).subscribe(
      positions => {
        this.positions = positions
      }
    )
  }

  onDeletePosition(event:Event ,position: Position) {
    event.stopPropagation()
    const deleting = window.confirm(`Ви дійсно хочете видалити "${position.name}" ?`)

    if (deleting) {
      this.positionService.delete(position).subscribe(
        response => {
          const index = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(index, 1)
        },
        error => MaterializeService.toast(error.message ? error.message : error)
      )
    }
  }

  onAddPosition() {

    this.isNew = true
    this.currentPosition = null
    this.form.reset({
      name: '',
      cost: 1
    })
    this.form.enable()
    this.modal.open();
    MaterializeService.updateTextInputs()
  }

  onSelectPosition(position: Position) {
    this.isNew = false
    this.currentPosition = position
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.form.enable()
    this.modal.open();
    MaterializeService.updateTextInputs()
  }

  onFormSubmit() {

    this.form.disable()
    let observable$

    const newPosition: Position = {
      _id: this.currentPosition ? this.currentPosition._id : '' ,
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.currentCategory._id
    }


    if (this.isNew) {
      //create
      observable$ = this.positionService.create(newPosition)
    } else {
      //update
      observable$ = this.positionService.update(newPosition)
    }

    observable$.subscribe(
      position => {
        if (this.isNew) {
          MaterializeService.toast('Нова позиція буа створена')
          this.positions.push(position)
        } else {
          const index = this.positions.findIndex(c => c._id === position._id)
          this.positions[index] = position
          MaterializeService.toast(`Позицію було успішно відредаговано`)
        }
        this.modal.close()
      },
      error => {
        MaterializeService.toast(error.message ? error.message : error)
        this.form.enable()
      }
    )
  }

  onCancel() {
    this.modal.close();
  }

  inputSearchClear() {
    this.searchRef.nativeElement.value = ''
  }

}
