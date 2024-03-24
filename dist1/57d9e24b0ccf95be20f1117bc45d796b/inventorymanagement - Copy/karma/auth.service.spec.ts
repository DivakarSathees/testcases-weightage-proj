import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {

  let service: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  fit('Frontend_should_call_the_API_and_register_the_user_when_register_is_called', () => {
    const registerData = { username: 'test', password: 'Password@34', userRole: 'Admin', email: 'test@test.com', mobileNumber: '1234567890' };

    service['register'](registerData).subscribe((user: any) => {
          expect(user).toEqual(registerData);
        });

        const req = httpMock.expectOne(`${service.baseUrl}/register`);
        expect(req.request.method).toBe('POST');
        req.flush(registerData);
  });

  fit('Frontend_should_call_the_API_and_login_the_user_when_login_is_called', () => {
    const registerData = {email: 'test@test.com', password: 'Password@34' };

    service['login'](registerData).subscribe((user: any) => {
          expect(user).toEqual(registerData);
        });

        const req = httpMock.expectOne(`${service.baseUrl}/login`);
        expect(req.request.method).toBe('POST');
        req.flush(registerData);
  });
});
