import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core/";
import { jsx } from "@emotion/core";
import { Shuffle } from "@material-ui/icons/";
import { SpaceSlot } from "./SpaceSlot";
import { StyleSlotContainer, StyleButton } from "./style/Common.style";
import { TProduct } from "../model/product.model";
import { WebsiteSlot } from "./WebsiteSlot";
import { getProduct } from "../utils/common.functions";
import { ProductsContext } from "../contexts/productContext";
import { products } from "../data/products";
/** @jsx jsx */

let seen: Set<string> = new Set();
const initSlotWebsite = [
  {
    product: products[0],
    isFixed: false,
  },
  {
    product: products[1],
    isFixed: false,
  },
];
const switchCount: number = initSlotWebsite.length;

export const WebsiteTabPanel = () => {
  const productsContext = React.useContext(ProductsContext);
  const [slotWebsites, setSlotWebsites] = React.useState<{ product: TProduct; isFixed: boolean }[]>(initSlotWebsite);
  const [isShuffleBtn, setIsShuffleBtn] = React.useState<boolean>(true);

  React.useEffect(() => {
    seen = new Set();
    setSlotWebsites([
      {
        product: getProduct(productsContext.items, seen),
        isFixed: false,
      },
      {
        product: getProduct(productsContext.items, seen),
        isFixed: false,
      },
    ]);
  }, [productsContext.items]);

  React.useEffect(() => {
    let isFixedCount: number = slotWebsites.filter((word) => word.isFixed).length;
    setIsShuffleBtn(switchCount !== isFixedCount);
  }, [isShuffleBtn, slotWebsites]);

  React.useEffect(() => {
    let isFixedCount: number = slotWebsites.filter((word) => word.isFixed).length;
    setIsShuffleBtn(switchCount !== isFixedCount);
  }, [isShuffleBtn, slotWebsites]);

  const resetWords = async () => {
    for (const site of slotWebsites) {
      if (site.isFixed) continue;
      seen.delete(site.product.id);
    }
    let newSlotWebsites: { product: TProduct; isFixed: boolean }[] = slotWebsites.map((site) => {
      return { ...site, product: site.isFixed ? site.product : getProduct(productsContext.items, seen) };
    });
    setSlotWebsites([...newSlotWebsites]);
  };

  const handleWebsiteSwitchChange = (index: number) => {
    setSlotWebsites((prev) => [
      ...prev.map((product, i) => {
        return { ...product, isFixed: i === index ? !product.isFixed : product.isFixed };
      }),
    ]);
  };

  return (
    <Fragment>
      <Typography variant='h6' gutterBottom align='center'>
        associates with a new idea by combining a website and a word.
      </Typography>
      <Typography variant='subtitle1' gutterBottom align='center'>
        ex.){" "}
        <span role='img' aria-label='photo'>
          🏨
        </span>
        Booking.com ✖️
        <span role='img' aria-label='trash'>
          🤝
        </span>
        eBay ={" "}
        <span role='img' aria-label='ghost'>
          🏠
        </span>
        Airbnb
      </Typography>

      <Grid css={StyleSlotContainer} container>
        <WebsiteSlot product={slotWebsites[0].product} index={0} isOn={slotWebsites[0].isFixed} handleSwitchChange={handleWebsiteSwitchChange} />
        <SpaceSlot />
        <WebsiteSlot product={slotWebsites[1].product} index={1} isOn={slotWebsites[1].isFixed} handleSwitchChange={handleWebsiteSwitchChange} />
      </Grid>

      <Grid container direction='column' alignItems='center'>
        <Button variant='contained' css={StyleButton} color='primary' onClick={resetWords} disabled={!isShuffleBtn} startIcon={<Shuffle />}>
          Shuffle
        </Button>
      </Grid>
    </Fragment>
  );
};
