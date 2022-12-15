import React, { useState } from "react";
import "./CreateProduct.scss";
import cn from "classnames";
import { useFormik } from "formik";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  createNewProduct,
  getProducts,
} from "../../redux/productReducer/productReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { validateCreateProductForm } from "../../utils/validate/Validate";
import { Input } from "../../components/UI/Form/Input/Input";
import { Textarea } from "../../components/UI/Form/Textarea/Textarea";
import { Radio } from "../../components/UI/Form/Radio/Radio";

interface CreateProductProps {
  createNewProduct: any;
}

export const CreateProduct: React.FC<CreateProductProps> = ({
  createNewProduct,
}) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      category: "",
      classification: "",
      price: "",
      count: "",
      gender: "",
      volume: "",
      type_of_aroma: "",
      country_of_TM: "",
      made_in: "",
      description: "",
    },
    onSubmit: (values: any) => {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      createNewProduct(formData);
      navigate("/my-catalogs");
    },
    enableReinitialize: true,
    validateOnChange: validateAfterSubmit,
    validate: validateCreateProductForm,
  });

  return (
    <div className={cn("containerAdminDark")}>
      <form
        className={"NewProductForm"}
        onSubmit={formik.handleSubmit}
        encType='multipart/form-data'
      >
        <span>
          {location.pathname === "/edit-product"
            ? "Edit Product"
            : "Create New Product"}
        </span>

        <div className='fieldInput'>
          <label>Dowland Image</label>
          <input
            type='file'
            name='image'
            accept='image/*'
            onChange={(e: any) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
          />
        </div>

        <Input label={"Name Product"} name={"title"} formik={formik} />

        <Input label={"Category"} name={"category"} formik={formik} />

        <Input
          label={"Classification"}
          name={"classification"}
          formik={formik}
        />

        <Input label={"Price"} name={"price"} formik={formik} />

        <Input label={"Count"} name={"count"} formik={formik} />

        <Radio
          data={[
            { label: "Man", name: "gender", value: "man" },
            { label: "Woman", name: "gender", value: "woman" },
            { label: "Unisex", name: "gender", value: "unisex" },
          ]}
          label={"Gender"}
          formik={formik}
        />

        <Input label={"Volume"} name={"volume"} formik={formik} />

        <Input label={"Type of aroma"} name={"type_of_aroma"} formik={formik} />

        <Input label={"Country of TM"} name={"country_of_TM"} formik={formik} />

        <Input label={"Made in"} name={"made_in"} formik={formik} />

        <Textarea label={"Description"} id={"description"} formik={formik} />
        <div className={"createButton"}>
          <button
            type='submit'
            onClick={() => {
              setValidateAfterSubmit(true);
              formik.handleSubmit();
            }}
          >
            Create a product
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    productsData: state.product.productsData,
  };
};

export default compose(
  connect(mapStateToProps, { createNewProduct, getProducts }),
)(CreateProduct);
