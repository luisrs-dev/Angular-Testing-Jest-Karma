import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { CartComponent } from './cart.component';

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

describe('Cart component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Debe ser TestingModule
      ],
      declarations: [CartComponent],
      providers: [
        BookService, // Todos los servicios del constructro deben ser incorporados en providers
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    // Ejemplo del curso
    const bookService = fixture.debugElement.injector.get(BookService);

    // Ejemplo de video garage ideas
    //bookService = TestBed.inject(BookService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bookService = fixture.debugElement.injector.get(BookService);

    //En el ngOnInit se cargan los libros con el servicio
    // Este método sirve para hacer un spyOn
    spyOn(bookService, 'getBooksFromCart').and.callFake( () => listBooks);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice return an amount', () => {
    const totalPrice = component.getTotalPrice(listBooks);
    //expect(totalPrice).toEqual(106);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBe(0);
    expect(totalPrice).not.toBeNull();
  });

  it('onInputNumberChange increment correctly', () => {
    const action = 'plus';
    const book = { ...listBooks[0] };
    // Formas incorrectas de instanciar un servicio
    //const bookService1 = (component as any)._bookService;
    //const bookService2 = component["_bookService"];
    const spy1 = spyOn(bookService, 'updateAmountBook').and.callFake(
      () => null
    );
    //const spy1 = spyOn(bookService, "updateAmountBook" ).and.callFake( () => {
    //  return []
    //});
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toEqual(2);
    component.onInputNumberChange(action, book);

    //expect(book.amount).toEqual(3);
    expect(book.amount === 3).toBeTrue();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onInputNumberChange decrement correctly', () => {
    const action = 'minus';
    const book = { ...listBooks[0] };

    // Su valor es 3 por que se ha incrementado antes
    expect(book.amount).toEqual(2);
    // Formas incorrectas de instanciar un servicio
    //const bookService1 = (component as any)._bookService;
    //const bookService2 = component["_bookService"];
    const spy1 = spyOn(bookService, 'updateAmountBook').and.callFake(
      () => null
    );
    //const spy1 = spyOn(bookService, "updateAmountBook" ).and.callFake( () => {
    //  return []
    //});
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    component.onInputNumberChange(action, book);

    expect(book.amount).toEqual(1);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it("onClearBooks works correctly", () => {
    const spy1 = spyOn((component as any), "_clearListCartBook").and.callThrough();
    component.listCartBook = listBooks;
    //console.log('before: ' + component.listCartBook.length);
    
    component.onClearBooks();
    //console.log('after: ' + component.listCartBook.length);

    expect(component.listCartBook.length).toBe(0);
    //expect(component.listCartBook.length === 0).toBeTrue();
    expect(spy1).toHaveBeenCalled();
    })
});
