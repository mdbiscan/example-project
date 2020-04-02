/*global module*/

module.exports = function() {
  return function({ addComponents, theme }) {
    const toggle = {
      '.toggle-component': {
        display: 'inline-block',

        '.__switch': {
          backgroundColor: theme('colors.gray.700'),
          borderColor: theme('colors.gray.700'),
          borderRadius: '1.8rem',
          borderStyle: 'solid',
          borderWidth: '0.2rem',
          cursor: 'pointer',
          display: 'block',
          height: '2.2rem',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 300ms ease-in-out',
          whiteSpace: 'nowrap',
          width: '3.6rem',
        },

        '.__switch::before': {
          backgroundColor: theme('colors.inverse.default'),
          borderRadius: '50%',
          content: '""',
          display: 'block',
          height: '1.8rem',
          left: '0',
          position: 'absolute',
          top: '0',
          transition: 'all 350ms ease-in-out',
          width: '1.8rem',
        },

        '&.checked': {

          '.__switch': {
            backgroundColor: theme('colors.green.500'),
            borderColor: theme('colors.green.500'),
          },

          '.__switch::before': {
            left: '1.4rem',
          },
        },

        '&.disabled': {

          '.__switch': {
            backgroundColor: theme('colors.gray.600'),
            borderColor: theme('colors.gray.600'),
            cursor: 'not-allowed',
          },

          '.__switch::before': {
            backgroundColor: theme('colors.gray.300'),
          },
        },

        '.__text, input': {
          clip: 'rect(1px, 1px, 1px, 1px)',
          clipPath: 'inset(50%)',
          height: '1px',
          width: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0',
          position: 'absolute',
        }
      },
    };

    addComponents(toggle);
  }
};
