/*global module*/

module.exports = function() {
  return function({ addComponents, theme }) {
    const headings = {
      '.heading-1': {
        color: theme('colors.base.default'),
        fontFamily: theme('fontFamily.sans'),
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '4.6rem',
        letterSpacing: '-0.02rem',
        lineHeight: '6rem',
        marginBottom: '4.8rem',
      },

      '.heading-2': {
        color: theme('colors.base.default'),
        fontFamily: theme('fontFamily.sans'),
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '4rem',
        letterSpacing: '-0.02rem',
        lineHeight: '5.2rem',
        marginBottom: '3.2rem',
      },

      '.heading-3': {
        color: theme('colors.base.default'),
        fontFamily: theme('fontFamily.sans'),
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '3.6rem',
        letterSpacing: '-0.02rem',
        lineHeight: '4.7rem',
        marginBottom: '3.2rem',
      },

      '.heading-4': {
        color: theme('colors.base.default'),
        fontFamily: theme('fontFamily.sans'),
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '3.2rem',
        letterSpacing: '-0.02rem',
        lineHeight: '4.2rem',
        marginBottom: '2.4rem',
      },

      '.heading-5': {
        color: theme('colors.base.default'),
        fontFamily: theme('fontFamily.sans'),
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '2.8rem',
        letterSpacing: '-0.02rem',
        lineHeight: '3.6rem',
        marginBottom: '2.4rem',
      },

      '.heading-6': {
        color: theme('colors.base.default'),
        fontFamily: theme('fontFamily.sans'),
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '2.4rem',
        letterSpacing: '-0.02rem',
        lineHeight: '3rem',
        marginBottom: '1.6rem',
      },
    };

    addComponents(headings);
  }
};
