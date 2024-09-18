import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthenticationService } from '../src/authentication/authentication.service';
import { AuthenticationSignupDto } from '../src/authentication/dto/authentication-signup.dto';

describe('Ticket Creation Flow', () => {
  let app: INestApplication;
  let server: any;
  let authService: AuthenticationService;
  const projectId = 'dc1dff60-fb08-409c-a360-5a9123d3c41';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer();
    authService = moduleFixture.get<AuthenticationService>(
      AuthenticationService,
    );

    const signupDto: AuthenticationSignupDto = {
      email: 'william@gmail.com',
      password: 'william',
      first_name: 'William',
      last_name: 'FORT',
    };

    try {
      await authService.signin({
        email: signupDto.email,
        password: signupDto.password,
      });
      console.log('User already exists. Skipping user creation.');
    } catch (error) {
      if (error.response?.statusCode === 404) {
        await authService.signup(signupDto);
        console.log('User created successfully.');
      } else {
        throw error;
      }
    }
  });

  it('should create a ticket and notify distributors', async () => {
    const authResponse = await request(server)
      .post('/auth/signin')
      .send({ email: 'william@gmail.com', password: 'william' })
      .expect('Set-Cookie', /ACCESS_TOKEN/);

    const cookies = authResponse.headers['set-cookie'];

    const createTicketResponse = await request(server)
      .post(`/tickets/project/${projectId}`)
      .set('Cookie', cookies)
      .send({
        title: 'Test Ticket',
        content: 'Test Content',
      });

    expect(createTicketResponse.status).toBe(201);
    expect(createTicketResponse.body).toHaveProperty('id');

    const ticketId = createTicketResponse.body.id;
    const ticketResponse = await request(server)
      .get(`/tickets/${ticketId}`)
      .set('Cookie', cookies)
      .expect(200);

    expect(ticketResponse.body.title).toBe('Test Ticket');

    const notificationsResponse = await request(server)
      .get('/notifications')
      .set('Cookie', cookies)
      .expect(200);

    expect(notificationsResponse.body).toHaveLength(1);
    expect(notificationsResponse.body[0].message).toContain(
      'Nouvelle discussion à distribuer',
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
