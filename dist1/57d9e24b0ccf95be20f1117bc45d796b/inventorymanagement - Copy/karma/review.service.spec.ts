import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewService]
    });

    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  fit('Frontend_ReviewService_should create a review', () => {
    const mockReview = {
      // create your mock review object here
    };

    service['CreateReviews'](mockReview).subscribe();

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBeTruthy();
    expect(req.request.body).toEqual(mockReview);

    req.flush({});
  });

  fit('Frontend_ReviewServiceshould get reviews', () => {
    service['getReviews']().subscribe();

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush([]);
  });
});
