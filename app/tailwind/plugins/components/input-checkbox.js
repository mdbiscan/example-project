/*global module*/
module.exports = function() {
  return function({ addComponents, theme }) {
    const checkbox = {
      '.input-checkbox-component': {
        alignItems: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'inline-flex',
        fontSize: theme('fontSize.sm'),
        justifyContent: 'flex-start',
        userSelect: 'none',

        '.__checkmark-box': {
          alignItems: 'center',
          backgroundColor: theme('colors.transparent'),
          borderColor: theme('colors.green.500'),
          borderRadius: '2px',
          borderStyle: 'solid',
          borderWidth: '2px',
          boxSizing: 'border-box',
          display: 'inline-flex',
          height: '1.6rem',
          justifyContent: 'center',
          marginRight: '1rem',
          overflow: 'hidden',
          position: 'relative',
          width: '1.6rem',

          'svg.__checkmark': {
            fill: theme('colors.white'),
            height: '1.2rem',
            width: '1.2rem',
          },
        },

        '&.checked': {

          '.__checkmark-box': {
            backgroundColor: theme('colors.green.500'),
          },
        },

        '&.disabled': {
          cursor: 'not-allowed',

          '.__checkmark-box': {
            borderColor: theme('colors.gray.600'),
            backgroundColor: theme('colors.gray.600'),
          },

          '&.readonly': {
            cursor: 'default',

            '.__checkmark-box': {
              borderColor: theme('colors.green.500'),
              backgroundColor: theme('colors.green.500'),
            },
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
    }

    addComponents(checkbox)
  }
}
