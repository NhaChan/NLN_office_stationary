import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from '../../assets/images/slider1.webp';
import slider2 from '../../assets/images/slider2.webp';
import slider3 from '../../assets/images/slider3.webp';
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavbarComponent/NavBarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
// import { Flex } from "antd";


const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'LapTop']
    return (
        <>
            <div style={{ padding: '0 150px' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div id="container" style={{background: '#efefef', padding: '0 150px'}}>
                <SliderComponent arrImages={[slider1, slider2, slider3]} />
                <div style={{ marginTop: '20px', display: "flex", alignItems: 'center', gap: '20px'}}>
                    <CardComponent  />
                    <CardComponent  />
                    <CardComponent  />
                    
                </div>
                <ButtonComponent textbutton="Xem thêm" type="outline" styleButton={{
                    border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229',
                    width: '240px', height: '38px', borderRadius: '4px'
                }} />
            </div>

        </>
    )
}

export default HomePage