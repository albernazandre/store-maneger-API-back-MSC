// teste de valid do body

const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('sinon-chai');
const bodyValid = require('../../../src/middlewares/bodyValid');

chai.use(chaiSinon);
const { expect } = chai;

describe('teste retorno de bodyValid', function () {
    it('teste de retorno de valid body', async function () {
        const request = { body: { name: 'T-shirt' } };
        const response = {};
        let next = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        await bodyValid(request, response, next);
        expect(next).to.have.been.calledWith();
    });
    it('teste retorno de invalid body', async function () {
        const request = { body: { hulk: '' } };
        const response = {};
        let next = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        await bodyValid(request, response, next);
        expect(response.status).to.have.been.calledWith(400);
        expect(response.json).to.have.been.calledWith({ message: '"name" is required' });
    });
});
