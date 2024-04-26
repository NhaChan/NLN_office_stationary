import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from '../../assets/images/S2.png';
import slider2 from '../../assets/images/S4.png';
import slider3 from '../../assets/images/S3.png';
import CardComponent from "../../components/CardComponent/CardComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";
import * as ProductService from '../../services/ProductService'
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";



const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 300)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(6)
    const [typeProducts, setTypeProducts] = useState([])

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey?.[1]; // kiểm tra Optional chaining
        const search = context?.queryKey?.[2]; // kiểm tra Optional chaining
        const res = await ProductService.getAllProduct(search, limit);
        return res;
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK' && res?.data) { // kiểm tra xem dữ liệu có tồn tại không
            setTypeProducts(res.data);
        }
    }

    const { isPending, data: products, isPreviousData } = 
    useQuery({
        queryKey: ['products', limit, searchDebounce],
        queryFn: fetchProductAll,
        config: { retry: 3, retryDelay: 1000, keepPreviousData: true },
        onError: () => setTimeout(() => setLoading(false), 500), // Giảm thời gian loading xuống còn 500ms
        onSuccess: () => setTimeout(() => setLoading(false), 500), // Giảm thời gian loading xuống còn 500ms
    })
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <Loading isPending={isPending || loading}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
                <div id="container" style={{ height: '1400px', width: '1270px', margin: '0 auto' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                    <WrapperProducts>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                    id={product._id}
                                />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore
                            textbutton={isPreviousData ? 'Load more' : "Xem thêm"}
                            type="outline"
                            styleButton={{
                                border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#87b5d3'}`,
                                color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#87b5d3 '}`,
                                width: '240px', height: '38px', borderRadius: '4px'
                            }}
                            disabled={isPreviousData || products?.total === products?.data?.length || products?.totalPage === 1}
                            styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length ? '#fff' : '#87b5d3' }}
                            onClick={() => setLimit((prev) => prev + 6)}
                        />
                    </div>
                </div>
            </div>
        </Loading>

    )
}

export default HomePage