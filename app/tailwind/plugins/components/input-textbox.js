/*global module*/

module.exports = function() {
  return function({ addComponents, theme }) {
    const settings = Object.freeze({
      TRANSITION: '200ms ease all',
      WIDTH: '28.5rem',
    });

    const textbox = {
      '.input-textbox-component': {
        boxSizing: 'border-box',
        display: 'inline-block',
        padding: '1.5rem 0 2.5rem',
        position: 'relative',
        minWidth: settings.WIDTH,

        '.__container': {
          position: 'relative',
        },

        'svg.__icon': {
          fill: theme('colors.gray.800'),
          height: '1.6rem',
          position: 'absolute',
          right: '0',
          top: '3rem',
          width: '1.6rem',
        },

        '.__bar': {
          bottom: '-1px',
          height: '2px',
          left: '0',
          position: 'absolute',
          right: '0',
        },

        '.__bar::before': {
          background: theme('colors.green.500'),
          bottom: '1px',
          content: '""',
          display: 'block',
          height: '2px',
          position: 'absolute',
          right: '50%',
          transition: settings.TRANSITION,
          width: '0',
        },

        '.__bar::after': {
          background: theme('colors.green.500'),
          bottom: '1px',
          content: '""',
          display: 'block',
          height: '2px',
          position: 'absolute',
          left: '50%',
          transition: settings.TRANSITION,
          width: '0',
        },

        '&.focus .__bar::before, &.focus .__bar::after': {
          width: '50%',
        },

        '&.error .__bar::before, &.error .__bar::after': {
          background: theme('colors.system.error'),
          width: '50%',
        },

        '&.success .__bar::before, &.success .__bar::after': {
          background: theme('colors.system.success'),
          width: '50%',
        },

        'label': {
          color: theme('colors.transparent'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.regular'),
          transition: settings.TRANSITION,
        },

        '&.focus label, &.has-value label': {
          color: theme('colors.gray.800'),
        },

        '&.focus svg.__icon, &.has-value svg.__icon': {
          fill: theme('colors.green.500'),
        },

        '::placeholer': {
          color: theme('colors.gray.800'),
        },

        'input': {
          backgroundColor: theme('colors.transparent'),
          boxSizing: 'border-box',
          border: 'none',
          borderBottomColor: theme('colors.gray.700'),
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          color: theme('colors.base.default'),
          display: 'inline-block',
          fontSize: theme('fontSize.md'),
          fontWeight: theme('fontWeight.regular'),
          lineHeight: '2.4rem',
          padding: '0.2rem 0',
          width: '100%',

          '&:focus': {
            outline: 'none',
          },
        },

        '&.disabled': {
          cursor: 'not-allowed',

          'svg.__icon': {
            fill: theme('colors.gray.600'),
          },

          '.__container': {
            cursor: 'not-allowed',
          },

          'input': {
            borderBottomColor: theme('colors.gray.600'),
            color: theme('colors.gray.600'),
            cursor: 'not-allowed',
          },

          'label': {
            cursor: 'not-allowed',
          },
        },

        '&.with-icon': {

          'input': {
            paddingRight: '2rem',
          },
        },

        '&.full-width': {
          width: '100%',
        },

        '.__message': {
          color: theme('colors.base.default'),
          fontSize: theme('fontSize.sm'),
          lineHeight: '2rem',
          position: 'absolute',
          bottom: '0',
        },

        '&.success': {
          '.__message': {
            color: theme('colors.system.success'),
          },

        },

        '&.error': {
          '.__message': {
            color: theme('colors.system.error'),
          },

        },
      },
    };

    addComponents(textbox);
  }
};
