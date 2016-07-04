jest.unmock('../nameAlert');

describe('nameAlert', () => {
    it('shows an alert box with the users name in it', () => {
        const nameAlert = require('../nameAlert');
        expect(nameAlert('james smyth')).toBe('james smyth')
    });
});
