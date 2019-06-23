// Dependencies
const expect = require('chai').expect;

// Custom Dependencies
const { User } = require('../../models');

//////////////////////////////////////////////////////////
// User model unit testing
//////////////////////////////////////////////////////////

describe('Unit Test: User Entity', () => {
  // Custom Dependencies
  const { User } = require('../../models');

  before(async function() {
    await User.destroy({ where: { name: 'test-user' } });
  });

  it('should be able to store a valid user', async () => {
    const mockUser = {
      email: 'test@cardiff.ac.uk',
      password: 'password123',
      name: 'test-user',
      role: 'student',
      InstitutionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await User.create(mockUser)
      .then(data => {
        if (data) {
          expect(true).to.equal(true);
        } else expect(true).to.equal(true);
      })
      .catch(err => {
        expect(true).to.equal(false);
      });
  });

  it('should NOT be able to create a user with invalid Email', async () => {
    const mockUser = {
      email: 'test@test',
      password: 'password123',
      name: 'test-user',
      role: 'student',
      InstitutionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await User.create(mockUser)
      .then(data => {
        expect(true).to.equal(false);
      })
      .catch(err => {
        expect(err.message).to.equal(
          'Validation error: Please provide a valid Email address',
        );
      });
  });

  it('should NOT be able to create a user without binding with Institute', async () => {
    const mockUser = {
      email: 'test1@test.ac.uk',
      password: 'password123',
      name: 'test-user',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await User.create(mockUser)
      .then(data => {
        expect(true).to.equal(false);
      })
      .catch(err => {
        expect(err.message).to.equal(
          'notNull Violation: User.InstitutionId cannot be null',
        );
      });
  });

  it('should NOT be able to create a user with unsupported role', async () => {
    const mockUser = {
      email: 'test2@test.ac.uk',
      password: 'password123',
      name: 'test-user',
      role: 'anonymous',
      InstitutionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await User.create(mockUser)
      .then(data => {
        expect(true).to.equal(false);
      })
      .catch(err => {
        expect(err.message).to.equal(
          'Validation error: Role must be of these types "student", "academic", "administrator"',
        );
      });
  });

  after(async function() {
    await User.destroy({ where: { name: 'test-user' } });

    console.log();
    console.log();
    console.log('////////////////////////////////////////////');
    console.log('///////////////// API TESTING //////////////');
    console.log('////////////////////////////////////////////');
  });
});
