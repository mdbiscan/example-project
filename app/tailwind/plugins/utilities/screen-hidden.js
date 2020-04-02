/*global module*/

// Hides, but screen readers will pick it up.
module.exports = function() {
  return function({ addUtilities }) {
    const screenHidden = {
      '.screen-hidden': {
        clip: 'rect(1px, 1px, 1px, 1px)',
        clipPath: 'inset(50%)',
        height: '1px',
        width: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
      }
    };

    addUtilities(screenHidden);
  }
};
