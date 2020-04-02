/*global module*/

module.exports = function() {
  return function({ addComponents, theme }) {
    const divider = {
      '.div-dark': {
        borderTopColor: theme('colors.gray.700'),
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        display: 'block',
      },

      '.div-light': {
        borderTopColor: theme('colors.gray.600'),
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        display: 'block',
      },
    };

    addComponents(divider);
  }
};
