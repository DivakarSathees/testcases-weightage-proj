import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  fit('Frontend_OrderService_should get orders', () => {
    service['getOrders']().subscribe();

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush([]);
  });

  fit('Frontend_OrderService_should get order by id', () => {
    const orderId = 1;

    service['getOrder'](orderId).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/customer/${orderId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush([]);
  });

  fit('Frontend_OrderService_should get order items by id', () => {
    const orderId = 1;

    service['getOrderItems'](orderId).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/${orderId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush([]);
  });

  fit('Frontend_OrderService_should place an order', () => {
    const mockOrder = {
      // create your mock order object here
    };

    service['PlaceOrder'](mockOrder).subscribe();

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    expect(req.request.body).toEqual(mockOrder);

    req.flush({});
  });

  // fit('Frontend_OrderService_should add an order item', () => {
  //   const mockOrderItem = {
  //     // create your mock order item object here
  //   };
  //   const orderId = 1;

  //   service.addOrderItem(mockOrderItem).subscribe();

  //   const req = httpMock.expectOne(`${service.baseUrl}/1/items`);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.headers.get('Authorization')).toBeTruthy();
  //   expect(req.request.body).toEqual(mockOrderItem);

  //   req.flush({});
  // });

  fit('Frontend_OrderService_should delete an order', () => {
    const orderId = 1;

    service['deleteOrder'](orderId).subscribe();

    const req = httpMock.expectOne(`${service['baseUrl']}/${orderId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush({});
  });
});
