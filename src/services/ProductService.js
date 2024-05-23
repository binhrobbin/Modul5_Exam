import axios from "axios";

export default class ProductService{
    static async getAll(){
        const response = await axios.get("http://localhost:8080/products")
        return response.data;
    }
}
// export default ProductService;