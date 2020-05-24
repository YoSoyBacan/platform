export default (theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
  },
  grid: {
    height: "100%",
  },
  sideLogoWrapper: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  sideLogo: {
    backgroundColor: theme.palette.primary.main,
    height: "100%",
    backgroundSize: "600px",
    display: "flex",
    backgroundImage: 'url(/images/sign_up_logo.svg)',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  form: {
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingBottom: "125px",
    verticalAlign: "default",
    flexBasis: "auto",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  textField: {
    width: "100%",
    "& + & ": {
      marginTop: theme.spacing(2),
    },
  },
  portlet: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    flexBasis: "auto",
    padding: "10px 40px",
  },
  portletHeader:{
    padding: "0px"
  },
  portletLabel: {
    alignText: "center"
  },
  portletFooter:  {
    padding: "20px 0px",
    margin: "0 auto",
    borderTop: "0px",
  }
});
