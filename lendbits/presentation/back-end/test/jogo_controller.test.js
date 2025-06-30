import { getJogos } from '../controllers/jogo_controller.js';
import db from '../config/database.js';

jest.mock('../config/database.js', () => ({
  query: jest.fn()
}));

describe('getJogos', () => {
  test('deve retornar a lista de jogos', async () => {
    
    const fakeJogos = [{ id: 1, nome: 'God of War' }, { id: 2, nome: 'Zelda' }];
    db.query.mockResolvedValue(fakeJogos);

    const req = {};
    const res = {
      send: jest.fn(),
    };

    await getJogos(req, res);

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM jogos");
    expect(res.send).toHaveBeenCalledWith(fakeJogos);
  });
});
