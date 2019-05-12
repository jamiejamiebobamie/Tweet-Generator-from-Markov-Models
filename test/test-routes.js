const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const status = "status"

chai.use(chaiHttp);

describe('routes', ()  => {


   // TEST INDEX
   it('should show landing page', (done) => {
     chai.request(server)
         .get('/')
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html;
           done();
         });
   });

   // TEST tweet
   it('should tweet status', (done) => {
     chai.request(server)
         .get('/new_tweet/:msg')
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html;
           done();
         });
   });

});
