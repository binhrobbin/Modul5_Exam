import * as Yup from "yup";
class Validate{
static validateOrder(){
    return({
      id: Yup.number().typeError('Bạn phải nhập số')
        .required("ID không được để trống")
        .min(0, "ID không được nhỏ hơn 0"),
      date: Yup.string()
        .required("Ngày đặt không được để trống"),
      // money: Yup.number().typeError('Bạn phải nhập số')
      //   .required("Tổng tiền không được để trống")
      //   .min(0, "Tổng tiền không được nhỏ hơn 0")
      //   .max(10000000000),
      quantity: Yup.number().typeError('Bạn phải nhập số')
        .required("Số lượng không được để trống")
        .min(0, "Số lượng không được nhỏ hơn 0")
        .max(10000000000),
      products: Yup.string()
        .required("Không được để trống")
      // name: Yup.string()
      //   .required("Tên không được để trống")
      //   .min(4, "Tên không được nhỏ hơn 4 kí tự"),
      //   // .matches(/^[A-Za-z]{4,100}$/,"Chỉ được nhập chữ"),

    })
}
}
export default Validate;
