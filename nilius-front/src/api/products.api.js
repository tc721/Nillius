import axios from "axios";


export const getProductsRequest = async() => {
    return await axios.get('http://localhost:4000/product')
}

export const getProductsIdRequest = async() => {
    return await axios.get('http://localhost:4000/productsId')
}

export const getProductCategoryRequest = async(category) => {
    return await axios.get(`http://localhost:4000/productcategory/${category}`)
}

export const getProductRequest = async(id_product) => {
    return await axios.get(`http://localhost:4000/product/${id_product}`)
}

export const createProductRequest = async(product) => {
    return await axios.post('http://localhost:4000/product', product)
}

export const deleteProductRequest = async(id_product) => {
    return await axios.delete(`http://localhost:4000/product/${id_product}`)
}

export const getImgRequest = async(img) => {
    return await axios.get(`http://localhost:4000/img/${img}`)
}