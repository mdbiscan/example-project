/*global module*/

module.exports = function() {
  return function({ addComponents, theme }) {
    const dropdown = {
      '.dropdown-component': {
        display: 'inline-block',
        padding: '0.4rem 0 0',
        position: 'relative',
        minWidth: '28.5rem',

        '.__container': {
          borderBottomColor: theme('colors.gray.700'),
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
        },

        'label': {
          color: theme('colors.transparent'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.regular'),
          transition: '200ms ease all',
        },

        '.__select-box__selected-option': {
          borderBottomColor: theme('colors.gray.700'),
          cursor: 'pointer',
          fontSize: theme('fontSize.md'),
          padding: '0.2rem 2.4rem 0.2rem 0',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },

        '.__select-box__options': {
          backgroundColor: theme('colors.inverse.default'),
          borderRadius: '4px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          height: '0',
          left: '0',
          opacity: '0',
          overflow: 'hidden',
          position: 'absolute',
          right: '0',
          top: '6rem',
          transition: 'opacity 250ms ease-in-out',
          width: '0',
          zIndex: '1',
        },

        '.__select-box__option': {
          bottom: '0',
          boxSizing: 'borderBox',
          color: theme('colors.base.default'),
          cursor: 'pointer',
          fontSize: theme('fontSize.md'),
          overflow: 'hidden',
          padding: '1rem 1.6rem',
          textOverflow: 'ellipsis',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        },

        '.__select-box__option--active': {
          color: theme('colors.green.500'),
        },

        '.__select-box__option--selected': {
          fontWeight: '700',
        },

        '.__message': {
          color: theme('colors.gray.700'),
          fontSize: theme('fontSize.sm'),
          marginTop: '2px',
        },

        'svg.__icon': {
          fill: theme('colors.base.default'),
          position: 'absolute',
          right: '0',
          top: '3.4rem',
        },

        '.__select-box--open': {

          '.__select-box__options': {
            height: 'auto',
            opacity: '1',
            width: 'auto',
          },

          'label': {
            color: theme('colors.gray.700'),
          },
        },


        '&.has-value' : {
          '.__select-box__selected-option': {
            color: theme('colors.base.default'),
          },

          'label': {
            color: theme('colors.gray.700'),
          },
        },

        '&.disabled': {
          borderColor: theme('colors.gray.600'),
          cursor: 'not-allowed',

          '.__container': {
            borderColor: theme('colors.gray.600'),
          },

          '.__select-box__selected-option': {
            color: theme('colors.gray.600'),
            cursor: 'not-allowed',
            outline: 'none',
          },

          'label': {
            color: theme('colors.gray.600'),
          },

          'svg.__icon': {
            fill: theme('colors.gray.600'),
          }
        },
      },
    };

    addComponents(dropdown);
  }
};
