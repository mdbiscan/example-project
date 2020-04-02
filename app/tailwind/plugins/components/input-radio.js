/*global module*/
module.exports = function() {
  return function({ addComponents, theme }) {
    const radioButton = {
      '.input-radio-group-component': {
        display: 'inline-block',
      },

      '.input-radio-component': {
        alignItems: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        fontSize: theme('fontSize.sm'),
        justifyContent: 'flex-start',
        minHeight: '2.5rem',
        userSelect: 'none',

        '.__radio-box': {
          alignItems: 'center',
          borderColor: theme('colors.green.500'),
          borderRadius: '50%',
          borderStyle: 'solid',
          borderWidth: '2px',
          boxSizing: 'border-box',
          display: 'flex',
          height: '1.6rem',
          lineHeight: '1.6rem',
          justifyContent: 'center',
          marginRight: '1rem',
          overflow: 'hidden',
          position: 'relative',
          width: '1.6rem',
        },

        '.__radio': {
          backgroundColor: theme('colors.green.500'),
          borderRadius: '50%',
          height: '0',
          transition: 'all 250ms ease-in-out',
          width: '0',
        },

        '&.checked': {

          '.__radio': {
            height: '0.8rem',
            width: '0.8rem',
          },
        },

        '&.disabled': {
          cursor: 'default',

          '.__radio-box': {
            backgroundColor: theme('colors.gray.600'),
            borderColor: theme('colors.gray.600'),
          },

          '.__radio': {
            backgroundColor: theme('colors.gray.700'),
          },
        },

        'input': {
          clip: 'rect(1px, 1px, 1px, 1px)',
          clipPath: 'inset(50%)',
          height: '1px',
          width: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0',
          position: 'absolute',
        },
      },
    };

    addComponents(radioButton);
  };
};
