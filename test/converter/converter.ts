import {
    convertNameToRegion,
    convertRegionToName,
} from '../../src/util/converter';

const testConvertNameToRegion = () =>
    describe('Convert region full name to acronym', () => {
        it('should be able to convert full name to acronym', () => {
            expect(convertRegionToName('SL')).toBe('Sungai Long');
            expect(convertRegionToName('KP')).toBe('Kampar');
            expect(convertRegionToName('BTHO')).toBe('Bandar Tun Hussein Onn');
        });
    });

const testConvertRegionToName = () =>
    describe('Convert region acronym to full name', () => {
        it('should be able to convert acronym to full name', () => {
            expect(convertNameToRegion('Sungai Long')).toBe('SL');
            expect(convertNameToRegion('Kampar')).toBe('KP');
            expect(convertNameToRegion('Bandar Tun Hussein Onn')).toBe('BTHO');
        });
    });

export { testConvertRegionToName, testConvertNameToRegion };
