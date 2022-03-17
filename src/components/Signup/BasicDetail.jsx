import { FormLabel, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
const BasicDetails = ({
  name,
  email,
  phone,
  age,
  updateInfos,
  handleCurrent,
}) => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Too short")
      .max(25, "Too long")
      .required("Required"),
    email: yup.string().email("Enter a valid email").required("Required"),
    phone: yup
      .number()
      .min(6000000000, "Enter valid phone number")
      .max(9999999999, "Enter valid phone number")
      .required("Required"),
    age: yup.number().max(100, "Enter correct age").required("Required"),
  });
  const formik = useFormik({
    validationSchema: validationSchema,
    initialErrors: {
      name: "",
      email: "",
      phone: "",
      age: "",
    },
    initialValues: {
      name: name,
      email: email,
      phone: phone,
      age: age,
    },
    validateOnBlur: true,
    onSubmit: (values) => {
      updateInfos(values);
      handleCurrent("increment");
    },
  });
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <form style={{ margin: "2vw" }} onSubmit={formik.handleSubmit}>
        <FormLabel>Name</FormLabel>
        <br />
        <TextField
          type="text"
          required
          placeholder="Your name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.errors.name && (
          <p style={{ color: "red" }}>{formik.errors.name}</p>
        )}

        <br />
        <FormLabel>Email</FormLabel>
        <br />
        <TextField
          type="email"
          required
          placeholder="Your email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.errors.email && (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        )}

        <br />
        <FormLabel>Phone</FormLabel>
        <br />
        <TextField
          type="phone"
          required
          placeholder="Your phone"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.errors.phone && (
          <p style={{ color: "red" }}>{formik.errors.phone}</p>
        )}

        <br />
        <FormLabel>Age</FormLabel>
        <br />
        <TextField
          type="number"
          required
          placeholder="Your age"
          name="age"
          onChange={formik.handleChange}
          value={formik.values.age}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.errors.age && (
          <p style={{ color: "red" }}>{formik.errors.age}</p>
        )}
        <br />
        <Button type="submit" variant="contained">
          Next
        </Button>
      </form>
    </div>
  );
};

export default BasicDetails;
