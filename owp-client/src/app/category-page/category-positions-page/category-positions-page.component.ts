import { Component, OnInit, Input } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { Position, Category } from '../../interfaces'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from "rxjs";
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-positions-page',
  templateUrl: './category-positions-page.component.html',
  styleUrls: ['./category-positions-page.component.css']
})
export class CategoryPositionsPageComponent implements OnInit {

  @Input('categoryId') categoryId: string
  positions: Position[] = []
  // category: Observable<Category>
  category: Category


  constructor(private positionService: PositionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // this.category = this.categoryService.getById(this.categoryId)
    // console.log(this.category);

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

    // this.positionService.getByCategoryId(this.category._id).subscribe(
    //   positions => {
    //     this.positions = positions
    //   }
    // )


    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if(params['id']) {
            return this.positionService.getByCategoryId(params['id'])
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
    
    if(deleting) {
        this.positionService.delete( position).subscribe(
          response => {
            const index = this.positions.findIndex( p => p._id === position._id)
            this.positions.splice(index, 1)
          },
          error => console.log(error.message ? error.message : error)
        )
    }

  }

  inputSearchClear() {

  }

}
