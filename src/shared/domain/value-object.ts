import isEqual  from "lodash/isEqual";

export class ValueObject {
    public equals(vo: this): boolean {
        if (!vo) return false;
        // Compara se os nomes das classes são iguais
        if (vo.constructor.name !== this.constructor.name) return false;
        // Verifica se todas as propriedades do objeto de valor são iguais entre eles
        return isEqual(vo, this);
    }
}