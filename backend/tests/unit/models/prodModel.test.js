// Testes da camada de Models

const chai = require('chai');
const sinon = require('sinon');
const connect = require('../../../src/models/connection');
const prodModel = require('../../../src/models/prodModel');
const { postMockBD, postMockReturn, editProdMockReturn } = require('../mockFile/saleMocked');

const { expect } = chai;

const myMock = [[
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
  ]];

  const uniqueIdMock = [[{
    id: 1,
    name: 'Martelo de Thor',
  }]];

describe('teste rota de prod em Model', function () {
    it('teste de called da rota de prod', async function () {
        sinon.stub(connect, 'execute').resolves(myMock);
        const res = await prodModel.prodList();
        expect(res).to.be.deep.equal(myMock[0]);
        sinon.restore();
    });
    it('teste se a rota com Id param é chamada', async function () {
        const mockId = 1;
        sinon.stub(connect, 'execute').resolves(uniqueIdMock);
        const res = await prodModel.prodListById(mockId);
        expect(res).to.be.deep.equal(uniqueIdMock[0][0]);
        sinon.restore();
    });
    it('teste se rota de criacao e corretamente chamada', async function () {
      const mockNameProd = 'T-shirt';
      sinon.stub(connect, 'execute').resolves(postMockBD);
      const response = await prodModel.addProd(mockNameProd);
      expect(response).to.be.deep.equal(postMockReturn);
      sinon.restore();
  });
  it('teste se a rota de edição de prod', async function () {
    sinon.stub(prodModel, 'verifyProd').resolves(true);
    sinon.stub(connect, 'execute').resolves([[]]);
    const response = await prodModel.verifyProd(editProdMockReturn, 1);
    expect(response).to.be.deep.equal(true);
    sinon.restore();
  });
});
