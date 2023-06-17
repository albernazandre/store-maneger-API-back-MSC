// Mock de Sales

const mockAll = [[
    {
        saleId: 1,
        date: '2021-03-17T00:00:00.000Z',
        productId: 1,
        quantity: 1,
    },
    {
        saleId: 1,
        date: '2021-03-17T00:00:00.000Z',
        productId: 2,
        quantity: 1,
    },
]];

const uniqueIdMock = [[
    {
        saleId: 1,
        date: '2021-03-17T00:00:00.000Z',
        productId: 1,
        quantity: 1,
    },
]];

const postMockBD = [{
    insertId: 9,
  }];
  const postMockReturn = {
    id: 9,
    name: 'T-shirt',
  };

  const salePostMock = {
    id: 13,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  };

  const mockSale = [
    {
        productId: 1,
        quantity: 1,
    },
    {
        productId: 2,
        quantity: 5,
    },
];

const editProdMockReturn = {
  id: '1',
  name: 'Martelo do Batman',
};

module.exports = {
    mockAll,
    uniqueIdMock,
    postMockBD,
    postMockReturn,
    salePostMock,
    mockSale,
    editProdMockReturn,
};
