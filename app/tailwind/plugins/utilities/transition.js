/*global module*/

module.exports = function() {
  return function({ addUtilities }) {
    const transitions = {
      '.transition': {
        transition: 'all 250ms ease-in-out',
      },

      '.transition-500': {
        transition: 'all 500ms ease-in-out',
      },
    };

    addUtilities(transitions);
  }
};
