import React from "react";
import Categories from "../components/Categories/Categories";
import ProductSlider from "../components/ProductSlider/ProductSlider";

import CampaignSingle from "../components/CampaignSingle/CampaignSingle";


function ShopPage() {
    return (
        <React.Fragment>
            <Categories />
            <ProductSlider />
            <CampaignSingle />
            <ProductSlider />
        </React.Fragment>
    )
}

export default ShopPage