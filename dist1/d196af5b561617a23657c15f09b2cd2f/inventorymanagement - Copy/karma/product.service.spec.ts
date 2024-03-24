import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService} from './product.service';
describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

fit('Frontend_ProductService_should create a product', () => {
    const mockProduct ={};

    service['createProduct'](mockProduct).subscribe();

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    expect(req.request.body).toEqual(mockProduct);

    req.flush({});
  });

  fit('Frontend_ProductService_should get products', () => {
    service['getProducts']().subscribe();

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush([]);
  });

  fit('Frontend_ProductService_should update a product', () => {
    const mockProduct = {
      ['ProductId']: 1,
      // update other fields as needed
    };

    service['updateProduct'](mockProduct).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/${mockProduct['ProductId']}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    expect(req.request.body).toEqual(mockProduct);

    req.flush({});
  });

  fit('Frontend_ProductService_should delete a product', () => {
    const productId = 1;

    service['deleteProduct'](productId).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/${productId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush({});
  });
});
