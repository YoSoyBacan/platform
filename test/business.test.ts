import request from 'supertest';
import app from '../src/app';
import { expect} from 'chai';


describe('POST /api/business', () => {
  it('should return a 200?', (done) => {
      request(app).post('/api/business')
          .field('name', 'John Doe')
          .field('address', 'Tech Computer')
          .field('country', 'Ecuador')
          .field('city', 'Quito')
          .field('businessTelephone', '099933049')
          .field('email', 'john@me.com')
          .end(function(err, res) {
              expect(res.error).to.be.false;
              done();
          })
          .expect(200);

  });
});
