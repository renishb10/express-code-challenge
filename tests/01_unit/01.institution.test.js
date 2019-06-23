// Dependencies
const expect = require('chai').expect;

//////////////////////////////////////////////////////////
// Institution model unit testing
//////////////////////////////////////////////////////////

console.log('////////////////////////////////////////////');
console.log('/////////////// MODULE TESTING /////////////');
console.log('////////////////////////////////////////////');

describe('Unit Test: Institution Entity', () => {
  // Custom Dependencies
  const { Institution } = require('../../models');

  before(async function() {
    await Institution.destroy({ where: { emailDomain: 'test.ac.uk' } });
  });

  it('should be able to store a valid institute', async () => {
    const mockInstitute = {
      name: 'Test University',
      url: 'https://www.test.ac.uk',
      emailDomain: 'test.ac.uk',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await Institution.create(mockInstitute)
      .then(data => {
        if (data) {
          expect(true).to.equal(true);
        } else expect(true).to.equal(true);
      })
      .catch(err => {
        expect(true).to.equal(false);
      });
  });

  it('should NOT be able to store a Institute with invalid name', async () => {
    const mockInstitute = {
      name: '.',
      url: 'https://www.test.ac.uk',
      emailDomain: 'test.ac.uk',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await Institution.create(mockInstitute)
      .then(data => {
        expect(true).to.equal(false);
      })
      .catch(err => {
        expect(err.message).to.equal(
          'Validation error: Institution Name must be with at least 2 chars but not more than 100',
        );
      });
  });

  it('should NOT be able to store without emailDomain', async () => {
    const mockInstitute = {
      name: 'Test University',
      url: 'https://www.test.ac.uk',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await Institution.create(mockInstitute)
      .then(data => {
        expect(true).to.equal(false);
      })
      .catch(err => {
        expect(err.message).to.equal(
          'notNull Violation: Institution.emailDomain cannot be null',
        );
      });
  });

  after(async function() {
    await Institution.destroy({ where: { emailDomain: 'test.ac.uk' } });
  });
});
