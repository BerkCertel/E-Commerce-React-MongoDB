import Blog from '../components/Blog/Blog';
import Categories from '../components/Categories/Categories';
import ProductSlider from '../components/ProductSlider/ProductSlider';
import Slider from '../components/Slider/Slider';
import React from "react";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";



function HomePage() {




    return (
        <React.Fragment>
            <Slider />
            <Categories />
            <ProductSlider />
            <Blog />
            <CampaignSingle />
            {/* <Products /> */}
        </React.Fragment>
    )
}

export default HomePage