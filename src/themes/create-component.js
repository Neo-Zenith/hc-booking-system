import { filledInputClasses, outlinedInputClasses } from '@mui/material';

export default function createComponents({ palette }) {
    return {
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    fontSize: '1.2rem',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                },
                sizeSmall: {
                    padding: '6px 16px',
                },
                sizeMedium: {
                    padding: '8px 20px',
                },
                sizeLarge: {
                    padding: '11px 24px',
                },
                textSizeSmall: {
                    padding: '7px 12px',
                },
                textSizeMedium: {
                    padding: '9px 16px',
                },
                textSizeLarge: {
                    padding: '12px 16px',
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    color: palette.warning.main,
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    fontSize: 1.4,
                    fontWeight: 500,
                    lineHeight: '24px',
                    '&::placeholder': {
                        color: palette.text.secondary,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: palette.action.hover,
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.neutral[300],
                        },
                    },
                    [`&.${outlinedInputClasses.focused}`]: {
                        backgroundColor: 'transparent',
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.primary.main,
                        },
                    },
                    [`&.${filledInputClasses.error}`]: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: palette.error.main,
                        },
                    },
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
            },
        },
    };
}
