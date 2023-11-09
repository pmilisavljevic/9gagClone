import { useNavigate } from "react-router-dom";
// import { LogInUser } from "src/services/client";

import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import NavBar from "src/Layout/NavBar";
import {
  fetchUserInfo,
  getToken,
  userError,
  userStatus,
} from "src/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "src/store/store";
// import { toast } from "react-toastify";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(userError);
  const loading = useSelector(userStatus);
  // const user = useSelector(userInfo);
  // const punjenje = true;
  // const greska = "greska je napravljena";

  // function navigateToPage() {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     navigate("/");
  //   } else return <div>GRESKA</div>;
  // }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(getToken(values))
        .then((tokenResult) => {
          if (tokenResult.meta.requestStatus === "fulfilled") {
            return dispatch(fetchUserInfo());
          } else {
            // Handle the token fetch error
            throw new Error("Failed to get token");
          }
        })
        .then((userInfoResult) => {
          // Check if the fetchUserInfo thunk was fulfilled
          if (userInfoResult.meta.requestStatus === "fulfilled") {
            // Navigate to the desired route
            navigate("/");
          } else {
            // Handle the user info fetch error
            throw new Error("Failed to fetch user info");
          }
        })
        .catch((error) => {
          // Handle any errors that occurred during the dispatches
          console.error(error);
        });
    },
  });

  return (
    <>
      <NavBar />
      <div>
        <Container component="main" maxWidth="lg">
          <Box
            sx={{
              mt: 5,
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            {loading && <CircularProgress sx={{ mt: 2 }} />}

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                width: 400,
                mt: 3,
                mb: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ borderRadius: 4, backgroundColor: "rgb(87, 87, 221)" }}
              >
                Submit
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
