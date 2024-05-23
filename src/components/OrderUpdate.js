import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import OrderService from "../services/OrderService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import Validate from "./Validate";

function Update() {
  const [form, setForm] = useState(null);
  const [typesProduct, setTypesProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getAllTypes();
    getProduct(id);
  }, []);
  useEffect(() => {}, [form]);
  const getAllTypes = async () => {
    const typeList = await ProductService.getAll();
    setTypesProduct(typeList);
  };
  const getProduct = async (id) => {
    const product = await ProductService.findByID(id);
    product.types = JSON.stringify(product.types);
    setForm(product);
  };
  const handleSubmit = async (value) => {
    value.types = JSON.parse(value.types);
    value.id = +value.id;
    value.price = +value.price;
    ProductService.updateProduct(value)
      .then((res) => {
        value.types = JSON.stringify(value.types);
        setForm(value);
        toast.success("Cập nhật thành công");
      })
      .catch((err) => {
        toast.error("Cập nhật thất bại");
      });
  };
  return (
    <>
      {!form ? (
        <div>Loading...</div>
      ) : (
        <>
        <h1>Cập nhật Sản phẩm</h1>
        <Formik
          initialValues={form}
          onSubmit={handleSubmit}
          validationSchema={Yup.object(Validate.validateProduct())}
        >
          <Form>
            <label>ID</label>
            <br></br>
            <ErrorMessage name="id" component={"span"}></ErrorMessage>
            <br></br>
            <Field name="id" readOnly></Field>
            <br></br>
            <br></br>
            <label>Tên</label>
            <br></br>
            <ErrorMessage name="name" component={"span"}></ErrorMessage>
            <br></br>
            <Field name="name"></Field>
            <br></br>
            <br></br>
            <label>Giá</label>
            <br></br>
            <ErrorMessage name="price" component={"span"}></ErrorMessage>
            <br></br>
            <Field name="price"></Field>
            <br></br>
            <br></br>
            <label>Loại Sản phẩm</label>
            <br></br>
            <ErrorMessage name="types" component={"span"}></ErrorMessage>
            <br></br>
            <Field name="types" as="select">
              <option value={""}>Vui lòng chọn loại</option>
              {typesProduct.map((type) => (
                <option key={type.id} value={JSON.stringify(type)}>
                  {type.typeName}
                </option>
              ))}
            </Field>
            <br></br>
            <br></br>
            <button type="submit">Cập nhật</button>
          </Form>
        </Formik>
        </>
      )}
    </>
  );
}
export default Update;
