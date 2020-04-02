/*global module*/

module.exports = function() {
  return function({ addComponents, theme }) {
    const BASE = Object.freeze({
      alignItems: 'center',
      borderRadius: theme('borderRadius.default'),
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'inline-flex',
      fontFamily: theme('fontFamily.sans'),
      fontSize: theme('fontSize.md'),
      fontWeight: theme('fontWeight.medium'),
      height: '4.8rem',
      justifyContent: 'center',
      lineHeight: '4.8rem',
      outline: 'none',
      overflow: 'hidden',
      padding: '0 3.2rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      position: 'relative',

      '&:active': {
        top: '1px'
      },
    });

    const _ICON_BOX = Object.freeze({
      alignItems: 'center',
      display: 'inline-flex',
      height: '4.8rem',
      justifyContent: 'center',
      textAlign: 'center',
      width: '4.4rem',
    });

    const _LARGE = Object.freeze({
      fontSize: theme('fontSize.md'),
      height: '5.4rem',
      lineHeight: '5.4rem',
      padding: '0 4.8rem',

      '.__icon-box': {
        height: '5.4rem',
        width: '4.8rem',
      },

      'svg.__icon': {
        height: '1.6rem',
        width: '1.6rem',
      },
    });

    const _SMALL = Object.freeze({
      fontSize: theme('fontSize.xs'),
      height: '2.4rem',
      lineHeight: '2.4rem',
      padding: '0 1.6rem',

      '.__icon-box': {
        height: '2.4rem',
        width: '2.8rem',
      },

      'svg.__icon': {
        height: '1.2rem',
        width: '1.2rem',
      },
    });

    const _ICON = Object.freeze({
      height: '1.6rem',
      width: '1.6rem',
    });

    const _DISABLED = Object.freeze({
      backgroundColor: theme('colors.gray.500'),
      color: theme('colors.gray.800'),
      cursor: 'default',

      '.__icon-box': {
        borderLeftColor: theme('colors.gray.700'),
      },

      'svg.__icon': {
        fill: theme('colors.gray.800'),
      },
    });

    const buttons = {
      '.button-component-primary': Object.assign({
        backgroundColor: theme('colors.green.500'),
        color: theme('colors.white'),

        'svg.__icon': Object.assign({
          fill: theme('colors.white'),
        }, _ICON),

        '&.with-icon': {
          padding: '0 0 0 1.2rem',
        },

        '.__icon-box': Object.assign({
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderLeftColor: theme('colors.white'),
          marginLeft: '1.2rem',
        }, _ICON_BOX),

        '&.small': Object.assign({

          '&.with-icon': {
            padding: '0 0 0 0.8rem',
          },

          '.__icon-box': {
            marginLeft: '0.8rem',
          },
        }, _SMALL),

        '&.large': Object.assign({

          '&.with-icon': {
            padding: '0 0 0 1.6rem',
          },

          '.__icon-box': {
            marginLeft: '1.6rem',
          },
        }, _LARGE),

        '&.disabled': _DISABLED,
      }, BASE),

      '.button-component-secondary': Object.assign({
        backgroundColor: theme('colors.white'),
        borderColor: theme('colors.green.500'),
        borderStyle: 'solid',
        borderWidth: '1px',
        color: theme('colors.green.500'),

        '&.with-icon': {
          padding: '0 1.2rem 0 0',
        },

        '.__icon-box': _ICON_BOX,

        'svg.__icon': Object.assign({
          fill: theme('colors.green.500'),
        }, _ICON),

        '&.small': Object.assign({

          '&.with-icon': {
            padding: '0 0.8rem 0 0',
          },
        }, _SMALL),

        '&.large': Object.assign({

          '&.with-icon': {
            padding: '0 1.6rem 0 0',
          },
        }, _LARGE),

        '&.disabled': _DISABLED,
      }, BASE),

      '.button-component-link': {
        color: theme('colors.green.500'),
        fontSize: 'inherit',
        fontWeight: theme('fontWeight.medium'),
        padding: '0',

        '&:hover': {
          textDecoration: 'underline',
        },

        '&:active': {
          textDecoration: 'none',
        },
      },

      'a.link-button-primary': Object.assign({
        backgroundColor: theme('colors.green.500'),
        color: theme('colors.white'),

        '&.disabled': _DISABLED,

        '&:hover': {
          textDecoration: 'none',
        },
      }, BASE),

      'a.link-button-secondary': Object.assign({
        backgroundColor: theme('colors.white'),
        borderColor: theme('colors.green.500'),
        borderStyle: 'solid',
        borderWidth: '1px',
        color: theme('colors.green.500'),

        '&.disabled': _DISABLED,

        '&:hover': {
          textDecoration: 'none',
        },
      }, BASE),
    };

    addComponents(buttons);
  }
};
