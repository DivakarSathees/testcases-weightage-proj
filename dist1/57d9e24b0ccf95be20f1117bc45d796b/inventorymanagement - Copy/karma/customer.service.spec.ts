import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CustomerService', () => {
  let service: CustomerService;

  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  fit('Frontend_CustomerService_should get Customers', () => {
    const mockPayments: any[] = [];

    service['getCustomers']().subscribe((payments: any[]) => {
      expect(payments).toEqual(mockPayments);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    req.flush(mockPayments);
  });

  fit('Frontend_CustomerService_should create Customer', () => {
    const mockCustomer = {
      CustomerName: 'Test',
      email: 'test@gmail.com',
      mobileNumber: '1234567890',
    };
    // const response = { id: '1', ...gift };

    (service as any).createCustomer(mockCustomer).subscribe();
    const req = httpMock.expectOne(`${(service as any).baseUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCustomer);
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    req.flush(mockCustomer);
  });

  fit('Frontend_CustomerService_should update Customer', () => {
    const mockCustomer = {
      CustomerId: 1,
      CustomerName: 'UpdatedTest',
      email: 'updatedtest@gmail.com',
      mobileNumber: '9876543210',
    };

    service['updateCustomer'](mockCustomer).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/${mockCustomer.CustomerId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCustomer);
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush(mockCustomer);
  });

  fit('Frontend_CustomerService_should delete Customer', () => {
    const customerId = 1;

    service['deleteCustomer'](customerId).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/${customerId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush({});
  });


});
