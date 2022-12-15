import React from "react";

export const validateCreateProductForm = (values: any) => {
  // console.log(Object.values(values));
  let errors: any = {};

  // for (let key in values) {
  //   if (values.hasOwnProperty(key)) {
  //     if (!values[key].length) {
  //       errors.key = `Field not ${key}`;
  //     }
  //     console.log(`${key} : ${values[key]}`);
  //   }
  // }

  if (!values.title) {
    errors.title = "Field not Name Product";
  }
  if (values.title.length > 50) {
    errors.title = "Field Name Product max symbol 50";
  }
  // -------------
  if (values.category.length < 1) {
    errors.category = "Field not Category";
  }
  if (values.category.length > 30) {
    errors.category = "Field Category max symbol 30";
  }
  // --------------
  if (values.classification.length < 1) {
    errors.classification = "Field not Classification";
  }
  if (values.classification.length > 30) {
    errors.classification = "Field Classification max symbol 30";
  }
  // --------------
  if (!values.price) {
    errors.price = "Field not Price";
  } else if (!/^\s*[\d]+([,\.][\d]+)?\s*$/.test(values.price)) {
    errors.price = "Invalid email address";
  }
  // --------------
  if (!values.count) {
    errors.count = "Field not Count";
  } else if (!/^\s*[\d]+([,\.][\d]+)?\s*$/.test(values.count)) {
    errors.count = "Invalid email address";
  }

  // --------------
  if (!values.gender) {
    errors.gender = "Field not Gender";
  }
  // --------------
  if (!values.volume) {
    errors.volume = "Field not volume";
  }
  if (values.volume.length > 30) {
    errors.volume = "Field volume max symbol 30";
  }
  // --------------
  if (!values.type_of_aroma) {
    errors.type_of_aroma = "Field not Type of Aroma";
  }
  if (values.type_of_aroma.length > 30) {
    errors.type_of_aroma = "Field Type of Aroma max symbol 30";
  }
  // --------------
  if (!values.country_of_TM) {
    errors.country_of_TM = "Field not Country of TM";
  }
  if (values.country_of_TM.length > 30) {
    errors.country_of_TM = "Field Type of Country of TM max symbol 30";
  }
  // --------------
  if (!values.made_in) {
    errors.made_in = "Field not Made In";
  }
  if (values.made_in.length > 30) {
    errors.made_in = "Field Made In max symbol 30";
  }
  // --------------
  if (!values.description) {
    errors.description = "Field not Description";
  }
  if (values.description.length > 250) {
    errors.description = "Field Description max symbol 250";
  }
  return errors;
};
