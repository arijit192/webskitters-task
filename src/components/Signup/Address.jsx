import { FormLabel, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
const Address = ({ state, city, pincode, updateInfos, handleCurrent }) => {
  const validationSchema = yup.object().shape({
    state: yup
      .string()
      .min(3, "Too short")
      .max(30, "Too long")
      .required("Required"),
    city: yup.string().required("Required"),
    pincode: yup
      .string()
      .matches(/^[0-9]/, "Enter valid pincode")
      .length(6)
      .required("Required"),
  });
  const formik = useFormik({
    validationSchema: validationSchema,
    initialErrors: {
      state: "",
      city: "",
      pincode: "",
    },
    initialValues: {
      state: state,
      city: city,
      pincode: pincode,
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
        <FormLabel>State</FormLabel>
        <br />
        <TextField
          type="text"
          required
          placeholder="Your State"
          name="state"
          onChange={formik.handleChange}
          value={formik.values.state}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.errors.state && (
          <p style={{ color: "red" }}>{formik.errors.state}</p>
        )}

        <br />
        <FormLabel>City</FormLabel>
        <br />
        <TextField
          type="city"
          required
          placeholder="Your city"
          name="city"
          onChange={formik.handleChange}
          value={formik.values.city}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.errors.city && (
          <p style={{ color: "red" }}>{formik.errors.city}</p>
        )}

        <br />
        <FormLabel>Pincode</FormLabel>
        <br />
        <TextField
          type="text"
          required
          placeholder="Your pincode"
          name="pincode"
          onChange={formik.handleChange}
          value={formik.values.pincode}
          onBlur={formik.handleBlur}
        />
        <br />
        {formik.errors.pincode && (
          <p style={{ color: "red" }}>{formik.errors.pincode}</p>
        )}
        <br />
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            handleCurrent("");
          }}
        >
          Back
        </Button>
        <Button type="submit" variant="contained" sx={{ marginLeft: 5 }}>
          Next
        </Button>
      </form>
    </div>
  );
};

export default Address;
