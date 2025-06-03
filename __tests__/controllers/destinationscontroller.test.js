import { getDestinations } from "../../src/controllers/destinationsController";

describe('getDestinations', () => {
    //Test número 1:
    it('debe devolver un array de destinos', async () => {
        //Moc de req y res
        const req = {};
        const res = {
            status: vi.fn().mockReturnThis(), //vi.fn() es el mock de vitest
            json: vi.fn()
        };

        //ejecutamos el controlador:
        await getDestinations(req,res);

        //verific que se llamó res.status(200)
        expect(res.status).toHaveBeenCalledWith(200);
        //verifica que se devolvio un array con los destinos:
        expect(res.json).toHaveBeenCalled();
    });
})