// Testes da camada de services

const chai = require('chai');
const sinon = require('sinon');
const prodService = require('../../../src/services/prodService');
const prodModel = require('../../../src/models/prodModel');
const { postMockReturn, editProdMockReturn } = require('../mockFile/saleMocked');

const { expect } = chai;

describe('teste de describe de /products', function () {
    it('teste da res da rota /products', async function () {
        const myMock = [
            {
              id: 1,
              name: 'Martelo de Thor',
            },
            {
              id: 2,
              name: 'Traje de encolhimento',
            },
            {
              id: 3,
              name: 'Escudo do CapitÃ£o AmÃ©rica',
            },
          ];
        sinon.stub(prodModel, 'prodList').resolves(myMock);
        const res = await prodService.prodList();
        expect(res).to.be.deep.equal(myMock);
        sinon.restore();
    });
    it('teste da res da rota /products/:id', async function () {
        sinon.stub(prodModel, 'prodListById').resolves({ id: 1, name: 'Martelo de Thor' });
        const res = await prodService.prodListById(1);
        expect(res).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
        sinon.restore();
    });
    it('teste da rota quando id nao existe', async function () {
        sinon.stub(prodModel, 'prodListById').resolves(undefined);
        const res = await prodService.prodListById(4);
        expect(res).to.be.deep.equal({ message: 'Product not found' });
        sinon.restore();
    });
    it('teste da res de post /products', async function () {
      const mockNameProd = 'Camiseta';
      sinon.stub(prodModel, 'addProd').resolves(postMockReturn);
      const response = await prodService.addProd(mockNameProd);
      expect(response).to.be.deep.equal(postMockReturn);
      sinon.restore();
  });
  it('teste a res de put /products/:id', async function () {
    const mockProdName = 'Martelo do Batman';
    sinon.stub(prodModel, 'editProd').resolves(editProdMockReturn);
    const res = await prodService.editProd(mockProdName, 1);
    expect(res).to.be.deep.equal(editProdMockReturn);
    sinon.restore();
  });
});
