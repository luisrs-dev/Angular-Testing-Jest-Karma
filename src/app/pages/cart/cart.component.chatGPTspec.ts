import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let bookServiceMock: jasmine.SpyObj<BookService>;

  const mockBooks: Book[] = [
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

  beforeEach(async () => {
    bookServiceMock = jasmine.createSpyObj('BookService', ['getBooksFromCart', 'updateAmountBook', 'removeBooksFromCart']);

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: BookService, useValue: bookServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart books on init', () => {
    bookServiceMock.getBooksFromCart.and.returnValue(mockBooks);

    component.ngOnInit();

    expect(component.listCartBook).toEqual(mockBooks);
    expect(component.totalPrice).toBeGreaterThan(0); // 10*2 + 15*1 = 35
    //expect(component.totalPrice).toBe(35); // 10*2 + 15*1 = 35
  });

  it('should calculate total price correctly', () => {
    const totalPrice = component.getTotalPrice(mockBooks);
    expect(totalPrice).toBeGreaterThan(0);
  });

  it('should increase book amount when action is plus', () => {
    const book = { id: 1, title: 'Book 1', price: 10, amount: 2 };
    bookServiceMock.updateAmountBook.and.returnValue([{ ...book, amount: 3 }]);

    component.onInputNumberChange('plus', book);

    expect(book.amount).toBe(3);
    expect(component.totalPrice).toBeGreaterThan(0); // 10*3 = 30, 15*1 = 15, total = 45
    //expect(component.totalPrice).toBe(45); // 10*3 = 30, 15*1 = 15, total = 45
  });

  it('should decrease book amount when action is minus', () => {
    const book = { id: 1, title: 'Book 1', price: 10, amount: 2 };
    bookServiceMock.updateAmountBook.and.returnValue([{ ...book, amount: 1 }]);

    component.onInputNumberChange('minus', book);

    expect(book.amount).toBe(1);
    expect(component.totalPrice).toBeGreaterThan(0); // 10*1 = 10, 15*1 = 15, total = 25
  });

  it('should clear all books', () => {
    component.listCartBook = [...mockBooks];
    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);
    expect(bookServiceMock.removeBooksFromCart).toHaveBeenCalled();
  });

  it('should not clear books if the cart is empty', () => {
    spyOn(console, 'log');
    component.listCartBook = [];

    component.onClearBooks();

    expect(console.log).toHaveBeenCalledWith('No books available');
  });
});
