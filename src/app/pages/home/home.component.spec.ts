import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';

const listBooks: Book[] = [
  {
    name: 'Libro namne',
    author: '',
    isbn: '',
    price: 15,
    amount: 2,
  },
  {
    name: 'Libro namne',
    author: '',
    isbn: '',
    price: 20,
    amount: 1,
  },
  {
    name: 'Libro namne',
    author: '',
    isbn: '',
    price: 8,
    amount: 7,
  },
];

const bookServiceMock = {
  getBooks: () => of(listBooks)
}

@Pipe({name: 'reduceText'})
class ReduceTextPipe implements PipeTransform{
  transform():string{
    return ''
  }
}

describe('Home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent, ReduceTextPipe],
      providers: [
        //BookService
        {
          provide: BookService, useValue: bookServiceMock
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBook get books from the subscribe', () => {
    const bookService = fixture.debugElement.injector.get(BookService);

    //const listBook: Book[] = [];
    // Esto es útil pero si el servicio tiene 10 métodos habría que configurar uno por uno
    //const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBooks));

    component.getBooks();
    //expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length).toBe(3);
    expect(component.listBook.length).toBeGreaterThan(0);
  });
});
