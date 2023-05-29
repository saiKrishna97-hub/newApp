// import { makeStyles } from "@material-ui/core/styles";
// import { styled } from "@mui/material/styles";
// // import styled from "@emotion/styled";
import { createTheme } from "@mui/system";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
    spacing: [4, 8, 12, 16, 20],
  },
});

// export default styled((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//     },
//   },
//   paper: {
//     padding: theme.spacing(2),
//   },
//   form: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   fileInput: {
//     width: "97%",
//     margin: "10px 0",
//   },
//   buttonSubmit: {
//     marginBottom: 10,
//   },
// }));
