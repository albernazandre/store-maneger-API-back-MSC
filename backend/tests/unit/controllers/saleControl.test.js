// Testes de Sale Controller

const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('sinon-chai');
const saleServ = require('../../../src/services/saleService');
const saleControl = require('../../../src/controllers/saleControl');
const { mockAll, uniqueIdMock } = require('../mockFile/saleMocked');

chai.use(chaiSinon);
const { expect } = chai;

describe('teste de control da rota /sales', function () {
    it('teste da res de /sales', async function () {
        const request = {};
        const response = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(saleServ, 'saleList').resolves(mockAll[0]);
        await saleControl.saleList(request, response);
        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(mockAll[0]);
        sinon.restore();
    });
    it('teste da res de /sales/:id', async function () {
        const request = { params: { id: 1 } };
        const response = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(saleServ, 'saleListById')
        .resolves(uniqueIdMock[0]);
        await saleControl.saleListById(request, response);
        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(uniqueIdMock[0]);
        sinon.restore();
    });
    it('teste se retorna erro sale not found', async function () {
        const request = { params: { id: 9999 } };
        const response = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(saleServ, 'saleListById').resolves({ message: 'Sale not found' });
        await saleControl.saleListById(request, response);
        expect(response.status).to.have.been.calledWith(404);
        expect(response.json).to.have.been.calledWith({ message: 'Sale not found' });
        sinon.restore();
    });
});