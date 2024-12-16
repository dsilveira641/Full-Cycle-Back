import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe('Category Unit Tests', () => {
    let validateSpy: any;
    beforeEach(() => {
        // Vai resetar os dados do mock a cada teste
        validateSpy = jest.spyOn(Category, "validate");
    })
    describe('constructor', () => {
        test('should create a category with default values', () => {
            const category = Category.create({
                name: 'Movie'
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
        test('should create a category with name and description', () => {
            const testValue = {
                name: 'Movie',
                description: 'Filme do DiCaprio'
            }
            const category = Category.create({
                name: testValue.name,
                description: testValue.description
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe(testValue.name);
            expect(category.description).toBe(testValue.description);
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
        test("should create a category with all values", () => {
            const created_at = new Date();
            const category = Category.create({
                name: 'Movie',
                description: 'Movie description',
                is_active: false,
                created_at
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie description');
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });                
    });    
    describe("create command", () => {
        test("should create a category", () => {
            const category = Category.create({
                name: "Movie"
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
        test("should create a category with description", () => {            
            const category =  Category.create({
                name: 'Movie',
                description: 'Movie description',                
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie description');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
        test("should create a category with is_active", () => {
            const created_at = new Date();
            const category =  Category.create({
                name: 'Movie',
                is_active: false,                
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('category_id field', () => {
        const arrange = [
            { category_id: null }, 
            { category_id: undefined },
            { category_id: new Uuid() }
        ];
        test.each(arrange)('id = %j', ({category_id}) => {
            const category = new Category({
                name: "Movie",
                category_id: category_id as any,
            })
            expect(category.category_id).toBeInstanceOf(Uuid);
            if (category_id instanceof Uuid) {
                expect(category.category_id).toBe(category_id);
            }
        })
    });
    test("should change name", () => {            
        let testValue = "Os sem floresta"
        const category = Category.create({
            name: 'Movie',             
        });
        category.changeName(testValue);            
        expect(category.name).toBe(testValue);  
        expect(validateSpy).toHaveBeenCalledTimes(2);          
    });
    test("should change description", () => {            
        let testValue = "Filme do Leonardo DiCaprio"
        const category = Category.create({
            name: 'Movie',     
            description: 'Filme do Adam Sandler'                      
        });
        category.changeDescription(testValue);            
        expect(category.description).toBe(testValue);  
        expect(validateSpy).toHaveBeenCalledTimes(2);          
    });
    test("should active a category", () => {                    
        const category = new Category({
            name: 'Movie',     
            is_active: false              
        });
        category.activate();            
        expect(category.is_active).toBeTruthy();            
    });
    test("should disable a category", () => {                    
        const category = new Category({
            name: 'Movie',     
            is_active: true              
        });
        category.deactivate();            
        expect(category.is_active).toBeFalsy();            
    });
});

describe("Category Valdiator", () => {
    describe("create command", () => {
        test('should an invalid category with name property', () => {
            expect(() => Category.create({ name: null })).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]
            });
            expect(() => Category.create({ name: '' })).containsErrorMessages({
                name: [
                    "name should not be empty",
                ]
            });
            expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
                name: [                    
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]
            });
            expect(() => Category.create({ name: "t".repeat(256) })).containsErrorMessages({
                name: [                                        
                    "name must be shorter than or equal to 255 characters"
                ]
            });
        });
    });
});

