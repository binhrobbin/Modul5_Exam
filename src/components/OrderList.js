import { useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { Container, Pagination, Table } from "react-bootstrap";
import { Field, Form, Formik } from "formik";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setID] = useState(-1);
  const [page, setPage] = useState(1);
  const [arr, setArr] = useState([1, 2, 3]);
  const [numbers, setNumbers] = useState([5, 3, 1]);
  const [name, setName] = useState(0);
  const [form, setForm] = useState({});

  const handleSubmit = async (value) => {
    const limit = value.numbers;
    console.log(value.numbers);
    const orderList = await OrderService.searchTop(page, limit);
    setName(value.numbers);
    setOrders(orderList);
  };

  const handleShow = (id) => {
    setID(id);
    setShow(true);
  };

  const handleClose = () => {
    setID(-1);
    setShow(false);
  };

  const handleAccept = () => {
    setShow(false);
    OrderService.deleteOrder(id)
      .then((res) => {
        setReload(!reload);
        toast.success("xóa thành công");
        setID(-1);
      })
      .catch((err) => {
        toast.error("xóa thất bại");
      });
  };

  useEffect(() => {
    getAll();
  }, [reload, page]);

  const getAll = async () => {
    const orderList = await OrderService.getAll2(page);
    setOrders(orderList);
  };

  const handlePaging = (choicePage) => {
    setPage(choicePage);
  };
  const handleNext = async () => {
    const orderList = await OrderService.getAll2(page + 1);
    if (orderList.length !== 0) {
      setPage(page + 1);
      setOrders(orderList);
    }
  };
  const handlePrev = async () => {
    const orderList = await OrderService.getAll2(page - 1);
    if (orderList.length !== 0) {
      setPage(page - 1);
      setOrders(orderList);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <h1>Thống kê đơn hàng</h1>
        {/* <input type="text" onChange={(e) => setName(e.target.value)} /> */}
        <br></br>
        <Formik initialValues={form} onSubmit={handleSubmit}>
          <Form>
            Tốp:{" "}
            <Field name="numbers" as="select">
              {/* <option value={""}>Vui lòng chọn loại</option> */}
              {numbers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </Field>{" "}
            Đơn hàng có tổng số tiền bán cao nhất .
            <Button variant="info" type="submit">
              Xem top
            </Button>
          </Form>
        </Formik>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Loại sản phẩm</th>
              <th>Ngày mua</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index}</td>
                <td>{order.id}</td>
                <td>{order.products.name}</td>
                <td>{order.products.price}</td>
                <td>{order.products.type}</td>
                <td>{order.date}</td>
                <td>{order.quantity}</td>
                <td>{order.money}</td>
                <td>
                  <Link to={"/orders/" + order.id + "/update/"}>
                    <Button variant="warning">Sửa</Button>
                  </Link>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleShow(order.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to={"/create"}>
          <Button variant="primary">Thêm mới</Button>
        </Link>
        <Pagination>
          <Pagination.First onClick={handlePrev} />
          {arr.map((number) => {
            if (number === page)
              return (
                <Pagination.Item
                  key={number}
                  onClick={() => handlePaging(number)}
                  active
                >
                  {number}
                </Pagination.Item>
              );
            else
              return (
                <Pagination.Item
                  key={number}
                  onClick={() => handlePaging(number)}
                >
                  {number}
                </Pagination.Item>
              );
          })}

          <Pagination.Last onClick={handleNext} />
        </Pagination>
      </Container>
    </>
  );
}
export default OrderList;
