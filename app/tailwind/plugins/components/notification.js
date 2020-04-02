/*global module*/

module.exports = function() {
  return function({ addComponents, theme }) {
    const notifications = {
      '.notification-messages-component': {
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: theme('fontSize.md'),
        left: '2rem',
        position: 'fixed',
        right: '2rem',
        top: '1rem',
        zIndex: '60',

        '.__message': {
          alignItems: 'center',
          alignSelf: 'center',
          animation: 'notification-show 180ms cubic-bezier(.175, .885, .32, 1.27499)',
          animationFillMode: 'forwards',
          borderRadius: theme('borderRadius.default'),
          boxShadow: theme('boxShadow.default'),
          boxSizing: 'border-box',
          display: 'flex',
          lineHeight: '4.8rem',
          margin: '1rem 0',
          minWidth: '50%',
          position: 'relative',
          userSelect: 'none',

          '&.error': {
            backgroundColor: theme('colors.system.error'),
            color: theme('colors.white'),
          },

          '&.info': {
            backgroundColor: theme('colors.base.default'),
            color: theme('colors.inverse.default'),
          },

          '&.success': {
            backgroundColor: theme('colors.system.success'),
            color: theme('colors.white'),
          },

          '&.is-closing': {
            animation: 'notification-hide 250ms cubic-bezier(.33859, -.42, 1, -.22)',
          },

          '.__wrapper': {
            flexGrow: '1',
          },

          '.__message-text': {
            color: theme('colors.white.default'),
            fontFamily: theme('fontFamily.medium'),
            fontSize: theme('fontSize.md'),
            lineHeight: '1.8rem',
            padding: '1.5rem 2rem 1.5rem 3rem',
            textAlign: 'center',
            width: '100%',
          },

          '.__countdown': {
            animation: 'notification-message-countdown linear 5s',
            backgroundColor: 'rgba(255,255,255,0.5)',
            bottom: 0,
            height: '0.6rem',
            left: 0,
            position: 'absolute',
            width: 0,
          },

          '.__close-button': {
            color: theme('colors.white.default'),
            flexGrow: '0',
            height: '4rem',
            lineHeight: 'initial',
            outline: 'none',
            width: '4rem',
          },
        },
      },

      '.notification-toasts-component': {
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        left: '2rem',
        position: 'fixed',
        right: '2rem',
        bottom: '1rem',
        zIndex: '60',

        '.__toast': {
          alignItems: 'center',
          alignSelf: 'center',
          animation: 'notification-show 180ms cubic-bezier(.175, .885, .32, 1.27499)',
          animationFillMode: 'forwards',
          backgroundColor: theme('colors.base.default'),
          borderRadius: theme('borderRadius.default'),
          boxShadow: theme('boxShadow.default'),
          boxSizing: 'border-box',
          color: theme('colors.inverse.default'),
          display: 'flex',
          justifyContent: 'center',
          lineHeight: '4.8rem',
          margin: '1rem 0',
          minWidth: '50%',
          position: 'relative',
          userSelect: 'none',
          whiteSpace: 'nowrap',

          '&.is-closing': {
            animation: 'notification-hide 250ms cubic-bezier(.33859, -.42, 1, -.22)',
          },

          '.__wrapper': {
            flexGrow: '1',
          },

          '.__toast-text': {
            color: theme('colors.inverse.default'),
            fontFamily: theme('fontFamily.secondary'),
            fontSize: theme('fontSize.md'),
            lineHeight: '1.8rem',
            padding: '1.5rem 2rem 1.5rem 3rem',
            textAlign: 'center',
            whiteSpace: 'break-spaces',
            width: '100%',
          },

          '.__dismiss-button': {
            color: theme('colors.green.500'),
            flexGrow: '0',
            fontFamily: ('fontFamily.secondary'),
            fontSize: theme('fontSize.md'),
            fontWeight: theme('fontWeight.bold'),
            outline: 'none',
            padding: '0 2rem',
            textTransform: 'uppercase',
          },
        },
      },
    };

    addComponents(notifications);
  }
};
