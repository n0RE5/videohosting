import { parseViewsToString } from "./Parsers"

test('Проверка значений просмотров', () => {
    expect(parseViewsToString(0)).toBe("0 просмотров")
})

describe('Проверка парсинга просмотров', () => {
    test('Проверка значеня 0', () => {
        expect(parseViewsToString(0)).toBe("0 просмотров")
    })
    test('Проверка значеня 1', () => {
        expect(parseViewsToString(1)).toBe("1 просмотр")
    })
    test('Проверка значеня (1-999)', () => {
        expect(parseViewsToString(999)).toBe("999 просмотров")
    })
    test('Проверка значеня (1000-9999)', () => {
        expect(parseViewsToString(9999)).toBe("9 тыс. просмотров")
    })
    test('Проверка значеня (10000-99999)', () => {
        expect(parseViewsToString(99999)).toBe("99 тыс. просмотров")
    })
    test('Проверка значеня (100000, 999999)', () => {
        expect(parseViewsToString(999999)).toBe("999 тыс. просмотров")
    })
})