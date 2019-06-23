// Dependencies
const expect = require('chai').expect;

// Custom Dependencies
const { Book } = require('../../models');

//////////////////////////////////////////////////////////
// Book model unit testing
//////////////////////////////////////////////////////////

describe('Unit Test: Book Entity', () => {
  // Custom Dependencies
  const { Book } = require('../../models');

  before(async function() {
    await Book.destroy({ where: { author: 'testAuthor' } });
  });

  it('should be able to store a valid book', async () => {
    const mockBook = {
      isbn: '9783161410000',
      title: 'Test Book',
      author: 'testAuthor',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await Book.create(mockBook)
      .then(data => {
        if (data) {
          expect(true).to.equal(true);
        } else expect(true).to.equal(true);
      })
      .catch(err => {
        expect(true).to.equal(false);
      });
  });

  it('should NOT be able to store a Book with invalid ISBN', async () => {
    const mockBook = {
      isbn: '978',
      title: 'Test Book',
      author: 'testAuthor',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await Book.create(mockBook)
      .then(data => {
        expect(true).to.equal(false);
      })
      .catch(err => {
        expect(err.message).to.equal(
          'Validation error: ISBN must be 10 digits or 13 digits',
        );
      });
  });

  it('should NOT be able to store with duplicate ISBN', async () => {
    const mockBook = {
      isbn: '9783161410000',
      title: 'Test Book',
      author: 'testAuthor',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await Book.create(mockBook)
      .then(async data => {
        expect(true).to.equal(false);
      })
      .catch(err => {
        // TODO: Alter book model's unique constraint so that it give clear message
        expect(err.message).to.equal('Validation error');
      });
  });

  after(async function() {
    await Book.destroy({ where: { author: 'testAuthor' } });
  });
});
