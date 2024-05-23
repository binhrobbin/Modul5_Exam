import axios from "axios";

export default class OrderService{
    static async  getAll2(page) {
        const response = await axios.get(`http://localhost:8080/orders?_page=${page}&_limit=3`);
        // console.log(response.data)
        return response.data;
    }
    static async getAll(){
        const response = await axios.get("http://localhost:8080/orders")
        return response.data;
    }
    static async createOrder(product){
        return await axios.post("http://localhost:8080/orders",product)
    }
    static async deleteOrder(id){
        return await axios.delete("http://localhost:8080/orders/"+ id)
    }
    static async findByID(id){
        const response = await axios.get("http://localhost:8080/orders/"+ id)
        return response.data;
    }
    static async updateOrder(product){
        return await axios.put("http://localhost:8080/orders/"+ product.id,product)
    }
    static async  searchContaining(keyWord) {
        const response = await axios.get("http://localhost:8080/orders?name_like="+keyWord);
        return response.data;
    }
    static async  searchContaining2(keyWord,page) {
        const response = await axios.get(`http://localhost:8080/orders?name_like=${keyWord}&_page=${page}&_limit=3`);
        return response.data;
    }
    static async  searchTop(page,limit) {
        const response = await axios.get(`http://localhost:8080/orders?_sort=money&_order=desc&_page=${page}&_limit=${limit}`);
        return response.data;
    }
}
// export default ProductService;