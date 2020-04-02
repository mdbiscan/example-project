/*global module*/

module.exports = function() {
  return function({ addUtilities }) {
    const boxSizing = {
      '.border-box': {
        boxSizing: 'border-box',
      },
      '.content-box': {
        boxSizing: 'content-box',
      },
    };

    addUtilities(boxSizing);
  }
};
