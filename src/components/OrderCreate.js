import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import OrderService from "../services/OrderService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Validate from "./Validate";

function Create() {
  const [form, setForm] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllTypes();
  }, []);
  const getAllTypes = async () => {
    const productList = await ProductService.getAll();
    setProducts(productList);
  };
  const handleSubmit = async (value) => {
    value.products = JSON.parse(value.products);
    value.id = +value.id;
    value.quantity = +value.quantity;
    value.money = value.quantity * value.products.price;
    OrderService.createOrder(value)
      .then((res) => {
        navigate("/orders");
        toast.success("Thêm mới thành công");
      })
      .catch((err) => {
        toast.error("Trùng id rồi");
        value.products = JSON.stringify(value.products);
        setForm(value);
      });
  };
  return (
    <>
    <h1>Tạo mới đơn hàng</h1>
    <Formik
      initialValues={form}
      onSubmit={handleSubmit}
      validationSchema={Yup.object(Validate.validateOrder())}
    >
      <Form>
        <label>ID</label>
        <br></br>
        <ErrorMessage name="id" component={"span"}></ErrorMessage>
        <br></br>
        <Field name="id"></Field>
        <br></br>
        <br></br>
        <label>Ngày mua</label>
        <br></br>
        <ErrorMessage name="date" component={"span"}></ErrorMessage>
        <br></br>
        <Field name="date"></Field>
        <br></br>
        {/* <br></br>
        <label>Tổng tiền</label>
        <br></br>
        <ErrorMessage name="money" component={"span"}></ErrorMessage>
        <br></br> */}
        <Field name="money" type="hidden"></Field>
        
        <br></br>
        <label>Số lượng</label>
        <br></br>
        <ErrorMessage name="quantity" component={"span"}></ErrorMessage>
        <br></br>
        <Field name="quantity"></Field>
        <br></br>
        <br></br>
        <label>Loại Sản phẩm</label>
        <br></br>
        <ErrorMessage name="products" component={"span"}></ErrorMessage>
        <br></br>
        <Field name="products" as="select">
          <option value={""}>Vui lòng chọn loại</option>
          {products.map((product) => (
            <option key={product.id} value={JSON.stringify(product)}>
              {product.name}
            </option>
          ))}
        </Field>
        <br></br>
        <br></br>
        <button type="submit">Thêm mới</button>
      </Form>
    </Formik>
    </>
  );
}
export default Create;
