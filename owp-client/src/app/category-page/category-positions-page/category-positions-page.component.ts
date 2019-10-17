import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { Position, Category } from '../../interfaces'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter } from 'minimatch';

@Component({
  selector: 'app-category-positions-page',
  templateUrl: './category-positions-page.component.html',
  styleUrls: ['./category-positions-page.component.css']
})
export class CategoryPositionsPageComponent implements OnInit{

  @Input('categoryId') categoryId: string
  @ViewChild('search', null) searchRef: ElementRef
  positions: Position[] = []
  category: Category
  searchFilter: string = ''


  constructor(private positionService: PositionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.searchFilter = this.searchRef.nativeElement.value
    this.searchRef.nativeElement.value = ''
    this.positions = []

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
        this.category = category
      }
    )

    this.searchFilter = ''

  }

  // ngAfterViewInit() {

  // }

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

  onDeletePosition(position: Position) {
    const deleting = window.confirm(`Ви дійсно хочете видалити "${position.name}" ?`)

    if (deleting) {
      this.positionService.delete(position).subscribe(
        response => {
          const index = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(index, 1)
        },
        error => console.log(error.message ? error.message : error)
      )
    }

  }

  inputSearchClear() {
    this.searchRef.nativeElement.value = ''
  }

}
