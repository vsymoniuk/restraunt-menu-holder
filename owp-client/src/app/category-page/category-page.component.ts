import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { Category } from '../interfaces';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => {
        this.categories = categories
      },
      error => console.log(error.message ? error.message : error)
    )
  }

  onDeleteCategory(event: Event, category: Category) {
  //   event.stopImmediatePropagation()
  //   event.stopPropagation()
  event.preventDefault()

    const deleting = window.confirm(`Ви дійсно хочете видалити "${category.name}" ?`)

    if(deleting) {
      this.categoryService.delete( category).subscribe(
        response => {
          const index = this.categories.findIndex( c => c._id === category._id)
          this.categories.splice(index, 1)
        },
        error => console.log(error.message ? error.message : error)
      )
  }
  }

}
