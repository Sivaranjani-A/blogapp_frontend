import React from "react";
import { TextInput, Card, Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  title: yup.string().required("Please provide a title for the blog"),
  content: yup.string().required("Please provide the content for the blog"),
  imageURL: yup
    .string()
    .url()
    .required("Please provide a valid image URL for the blog"),
});

const BlogForm = ({ type, blogDetails, onSubmit }) => {
  const { handleSubmit, values, handleBlur, handleChange } = useFormik({
    initialValues: {
      title: blogDetails.title,
      content: blogDetails.content,
      imageURL: blogDetails.imageURL,
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title2" value="Title of the Blog" />
          </div>
          <TextInput
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            id="title"
            type="text"
            required={true}
            shadow={true}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="content2" value="Provide the content of the Blog" />
          </div>
          <TextInput
            sizing="lg"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.content}
            id="content"
            type="text"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="imageURL2" value="Provide a valid image URL" />
          </div>
          <TextInput
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.imageURL}
            id="imageURL"
            type="text"
            required={true}
            shadow={true}
          />
        </div>

        <Button type="submit">{type}</Button>
      </form>
    </Card>
  );
};

export default BlogForm;
