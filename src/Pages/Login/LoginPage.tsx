// import { useNavigate } from "react-router-dom";
import { LogInUser } from "src/services/client";

// import { registerUser } from "../../services/client";

import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import NavBar from "src/Layout/NavBar";
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
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //
      const registerUserFunction = async () => {
        try {
          await LogInUser(values);
          // toast.success("Logging in successful");
        } catch (err) {
          // toast.error("There was some problem with logging in");
          console.log(err);
        }
      };
      registerUserFunction();
      // navigate("/login");
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

            {/* <form onSubmit={formik.handleSubmit}> */}

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                width: 400,
                mt: 5,
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
            </Box>
            {/* </form> */}
          </Box>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
