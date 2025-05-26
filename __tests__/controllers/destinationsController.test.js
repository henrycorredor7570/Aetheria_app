import { getDestinations } from "../../src/controllers/destinationsController";

describe('getDestinations', () => {
    it('debe devolver un array de destinos', async() => {
        //Moc de req y res
        const req = {};
        const res = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        };

        //Ejecutamos el controlador:
        await getDestinations(req,res);

        //verifica que se llamo res.status(200)
        expect(res.status).toHaveBeenCalledWith(200);
        //verifica que se devolvio un array con los destinos.
        expect(res.json).toHaveBeenCalled();
    });
});