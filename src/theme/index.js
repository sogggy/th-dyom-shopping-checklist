import React from "react"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#24586D",
    },
    secondary: {
      main: "#FFC857",
      secondary: "#EBDBAF"
    }
  },
  typography: {
    fontFamily: [
      "Lato",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h4: {
      fontSize: '1rem',
      '@media (min-width: 1000px)': {
        fontSize: '1.6rem'
      },
      '@media (max-width: 600px)': {
        fontSize: '0.6rem'
      },
    }, 
    h5: {
      fontSize: '0.8rem',
      '@media (min-width: 1000px)': {
        fontSize: '1.4rem'
      },
      '@media (max-width: 600px)': {
        fontSize: '0.4rem'
      },
    }
  },
  shadows: [
    "none",
    "0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.10)",
  ]
})

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <div>{children}</div>
    </ThemeProvider>
  )
}
