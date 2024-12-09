import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe('Uuid Unit Tests', () => {
    const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')
    // TODO - contornar o toThrowError pois está deprecated
    // test('should throw error when uuid is invalid', () => {
    //     expect(() => {
    //         new Uuid('invalid-uuid')
    //     }).toThrowError(new InvalidUuidError());
    // expect(validateSpy).toHaveBeenCalledTimes(1);     
    // });
    test("should create a valid uuid", () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidValidate(uuid.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("Should accept a valid uuid", () => {
        const uuid = new Uuid('3d6f0b92-3765-4d55-ae54-37fd8d6e04e7');
        expect(uuid.id).toBe('3d6f0b92-3765-4d55-ae54-37fd8d6e04e7');
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
});