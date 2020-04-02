/*global module*/

module.exports = function() {
  return function({ addComponents, theme }) {
    const link = {
      'a': {
        color: theme('colors.green.500'),
        fontSize: 'inherit',
        fontWeight: theme('fontWeight.medium'),

        '&:hover': {
          textDecoration: 'underline',
        },

        '&:active': {
          textDecoration: 'none',
        },
      },
    };

    addComponents(link);
  }
};
