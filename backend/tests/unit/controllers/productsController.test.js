// Testes relativos à camada Controller

const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('sinon-chai');
const prodService = require('../../../src/services/prodService');
const prodControl = require('../../../src/controllers/prodControl');
const { postMockReturn, editProdMockReturn } = require('../mockFile/saleMocked');

chai.use(chaiSinon);
const { expect } = chai;

describe('teste de controller da rota /products', function () {
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
        const request = {};
        const response = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(prodService, 'prodList').resolves(myMock);
        await prodControl.prodList(request, response);
        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(myMock);
        sinon.restore();
    });
    it('teste da res da rota /products/:id', async function () {
        const request = { params: { id: 1 } };
        const response = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(prodService, 'prodListById')
        .resolves({ id: 1, name: 'Martelo de Thor' });
        await prodControl.prodListById(request, response);
        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith({ id: 1, name: 'Martelo de Thor' });
        sinon.restore();
    });

    it('teste se a res de /products retorna corretamente com item', async function () {
      const request = { body: { name: 'T-shirt' } };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(prodService, 'addProd').resolves(postMockReturn);
      await prodControl.addProd(request, response);
      expect(response.status).to.have.been.calledWith(201);
      expect(response.json).to.have.been.calledWith(postMockReturn);
      sinon.restore();
  });
  it(
  'teste se post /products retorna erro, sem name',
   async function () {
      const request = { body: { name: '' } };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(prodService, 'addProd').resolves({ 
        message: '"name" is not allowed to be empty', 
      });
      await prodControl.addProd(request, response);
      expect(response.json).to.have.been
        .calledWith({ message: '"name" is not allowed to be empty' });
      sinon.restore();
  },
);
  it(
    'rota post /products retorna com item errado, name com menos de 5 caracteres',
     async function () {
      const request = { body: { name: 'joia' } };
      const response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(prodService, 'addProd').resolves({ 
        message: '"name" length must be at least 5 characters long', 
      });
      await prodControl.addProd(request, response);
      expect(response.json).to.have.been.calledWith({ 
        message: '"name" length must be at least 5 characters long', 
      });
      sinon.restore();
    },
  );

  it('teste da rota put /products/:id', async function () {
    const request = { body: { name: 'Camiseta' }, params: { id: 1 } };
    const response = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(prodService, 'editProd').resolves(editProdMockReturn);
    await prodControl.editProd(request, response);
    expect(response.status).to.have.been.calledWith(200);
    expect(response.json).to.have.been.calledWith(editProdMockReturn);
    sinon.restore();
});
});
