import swal from 'sweetalert2';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment.prod';

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

const book: Book = {
  name: 'Libro namne',
  author: '',
  isbn: '',
  price: 15,
  amount: 2,
};

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ?? null;
    });

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        return (storage[key] = value);
      }
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('shoueld be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks return a list of books and does a get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBooks);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
    expect(req.request.method).toBe('GET');
    req.flush(listBooks);
  });

  it('getBooksFromCart return array empty when localstorage is empty', () => {
    const listBooks = service.getBooksFromCart();
    expect(listBooks.length).toBe(0);
  });

  it('addBookToCart  add a book successfully when the list does not exist in the localstorage', () => {
    const toast = {
      fire: () => null,
    } as any;

    const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
      return toast;
    });

    let listBooks = service.getBooksFromCart();
    expect(listBooks.length).toBe(0);
    service.addBookToCart(book);
    listBooks = service.getBooksFromCart();
    expect(listBooks.length).toBe(1);

    expect(spy1).toHaveBeenCalled();
  });
  it('removeBooksfromCart remmoves the list from the localStorage', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.removeBooksFromCart();
    expect(listBook.length).toBe(null);
  })
});
