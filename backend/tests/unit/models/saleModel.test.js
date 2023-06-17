// teste de saleModel

const chai = require('chai');
const sinon = require('sinon');
const connect = require('../../../src/models/connection');
const saleModel = require('../../../src/models/saleModel');
const { mockAll, uniqueIdMock, mockSale } = require('../mockFile/saleMocked');

const { expect } = chai;

describe('teste da rota sales em Model', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('teste se a rota de /sales é corretamente chamada', async function () {
        sinon.stub(connect, 'execute').resolves(mockAll);
        const res = await saleModel.saleList();
        expect(res).to.be.deep.equal(mockAll[0]);
        sinon.restore();
    });
    it('teste se /sales/:id é corretamente chamada', async function () {
        const mockId = 1;
        sinon.stub(connect, 'execute').resolves(uniqueIdMock);
        const res = await saleModel.saleListById(mockId);
        expect(res).to.be.deep.equal(uniqueIdMock[0]);
        sinon.restore();
    });
    it('teste darota sale na post function com prod que nao existe', async function () {
        sinon.stub(connect, 'execute').resolves([[]]);
        const res = await saleModel.verifyProdIdSale(mockSale);
        expect(res).to.be.deep.equal(false);
        sinon.restore();
    });
});
