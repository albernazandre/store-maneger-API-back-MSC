// Teste da camada service de Sale

const chai = require('chai');
const sinon = require('sinon');
const saleModel = require('../../../src/models/saleModel');
const saleServ = require('../../../src/services/saleService');
const { mockAll, uniqueIdMock, mockSale, salePostMock } = require('../mockFile/saleMocked');

const { expect } = chai;

describe('teste de Service da rota /sales', function () {
    it('teste da res de /sales', async function () {
        sinon.stub(saleModel, 'saleList').resolves(mockAll[0]);
        const res = await saleServ.saleList();
        expect(res).to.be.deep.equal(mockAll[0]);
        sinon.restore();
    });
    it('teste da res de /sales/:id', async function () {
        sinon.stub(saleModel, 'saleListById').resolves(uniqueIdMock[0]);
        const res = await saleServ.saleListById(1);
        expect(res).to.be.deep.equal(uniqueIdMock[0]);
        sinon.restore();
    });
    it('teste de sale not found', async function () {
        const mockId = 9999;
        sinon.stub(saleModel, 'saleListById').resolves([]);
        const res = await saleServ.saleListById(mockId);
        expect(res).to.be.deep.equal({ message: 'Sale not found' });
        sinon.restore();
    });
    it('teste da res de /sales na post function', async function () {
        sinon.stub(saleModel, 'addSale').resolves(salePostMock);
        const res = await saleServ.addSale(mockSale);
        expect(res).to.be.deep.equal(salePostMock);
        sinon.restore();
    });
});
