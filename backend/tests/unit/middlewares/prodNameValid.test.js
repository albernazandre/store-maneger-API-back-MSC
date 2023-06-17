// teste de validacao do name field

const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('sinon-chai');
const prodNameValid = require('../../../src/middlewares/prodNameValid');

chai.use(chaiSinon);
const { expect } = chai;

describe('teste de return de nameValid', function () {
    it('teste valid name', async function () {
        const request = { body: { name: 'Bambole' } };
        const response = {};
        let next = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        await prodNameValid(request, response, next);
        expect(next).to.have.been.calledWith();
    });
    it('teste se nome com menos de 5 caract', async function () {
        const request = { body: { name: 'hulk' } };
        const response = {};
        let next = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        await prodNameValid(request, response, next);
        expect(response.status).to.have.been.calledWith(422);
        expect(response.json).to.have.been.calledWith({ 
            message: '"name" length must be at least 5 characters long', 
        });
    });
    it('teste se ha retorno com empty name', async function () {
        const request = { body: { name: '' } };
        const response = {};
        let next = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        await prodNameValid(request, response, next);
        expect(response.status).to.have.been.calledWith(400);
        expect(response.json).to.have.been.calledWith({ 
            message: '"name" is not allowed to be empty', 
        });
    });
});
