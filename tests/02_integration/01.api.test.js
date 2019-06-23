// Dependencies
const expect = require('chai').expect;
const request = require('supertest');

// Custom dependencies
const server = require('../../index');

describe('Bibliotech API Service', function() {
  const mockUser = {
    email: 'test@cardiff.ac.uk',
    password: 'password123',
    name: 'test-user',
    role: 'student',
    InstitutionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let token = '';

  // Custom Dependencies
  const { User } = require('../../models');
  before(async function() {
    await User.destroy({ where: { name: 'test-user' } });
  });

  it('GET / - Express Code Challenge Started', function(done) {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).to.be.equal('Express Code Challenge Started');
        return done();
      });
  });

  it('POST / - Create User', function(done) {
    request(server)
      .post('/api/v1/users/create')
      .send(mockUser)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.data.name).to.be.equal('test-user');
        return done();
      });
  });

  it('POST / - Sign In User', function(done) {
    request(server)
      .post('/api/v1/users/signin')
      .send({
        email: mockUser.email,
        password: mockUser.password,
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        token = res.body.data;
        expect(token).not.empty;
        return done();
      });
  });

  it('GET / - List Books for Sign In user', function(done) {
    request(server)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.status).to.be.equal('success');
        expect(res.body.data).to.be.an('array');
        return done();
      });
  });

  it('GET / - Unauthorized access Books', function(done) {
    request(server)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer .`)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  after(async function() {
    await User.destroy({ where: { name: 'test-user' } });
  });
});
