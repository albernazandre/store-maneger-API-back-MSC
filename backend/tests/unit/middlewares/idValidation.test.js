// Teste da funcao middleware de validacao de Id

const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('sinon-chai');
const idValid = require('../../../src/middlewares/idValid');

chai.use(chaiSinon);
const { expect } = chai;

describe('teste do retorno do middlew idValid', function () {
    it('teste de retorno de valid id', async function () {
        const request = { params: { id: 1 } };
        const response = {};
        let next = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        await idValid(request, response, next);
        expect(next).to.have.been.calledWith();
    });
    it('teste de retorno de invalid id', async function () {
        const request = { params: { id: 'a' } };
        const response = {};
        let next = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        await idValid(request, response, next);
        expect(response.status).to.have.been.calledWith(422);
        expect(response.json).to.have.been
          .calledWith({ message: 'The data is not in the right form' });
    });
});
