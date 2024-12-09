import { Category } from "../category.entity";

describe('Category Unit Tests', () => {
    describe('constructor', () => {
        test('should create a category with default values', () => {
            const category = new Category({
                name: 'Movie'
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
        test('should create a category with name and description', () => {
            const testValue = {
                name: 'Movie',
                description: 'Filme do DiCaprio'
            }
            const category = new Category({
                name: testValue.name,
                description: testValue.description
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe(testValue.name);
            expect(category.description).toBe(testValue.description);
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
        test("should create a category with all values", () => {
            const created_at = new Date();
            const category = new Category({
                name: 'Movie',
                description: 'Movie description',
                is_active: false,
                created_at
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie description');
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
        });                
    });    
    describe("create command", () => {
        test("should create a category", () => {
            const category = Category.create({
                name: "Movie"
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
        test("should create a category with description", () => {            
            const category = new Category({
                name: 'Movie',
                description: 'Movie description',                
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie description');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
        test("should create a category with is_active", () => {
            const created_at = new Date();
            const category = new Category({
                name: 'Movie',
                is_active: false,                
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
    });
    test("should change name", () => {            
        let testValue = "Os sem floresta"
        const category = new Category({
            name: 'Movie', 
            description: 'Filme do tobias'
        });
        category.changeName(testValue);            
        expect(category.name).toBe(testValue);            
    });
    test("should change description", () => {            
        let testValue = "Filme do Leonardo DiCaprio"
        const category = new Category({
            name: 'Movie',     
            description: 'Filme do Adam Sandler'                      
        });
        category.changeDescription(testValue);            
        expect(category.description).toBe(testValue);            
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
})