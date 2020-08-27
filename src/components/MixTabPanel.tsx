import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core/";
import { jsx } from "@emotion/core";
import { Shuffle } from "@material-ui/icons/";
import { getWord } from "../utils/words";
import { SpaceSlot } from "./SpaceSlot";
import { WordSlot } from "./WordSlot";
import { StyleSlotContainer, StyleButton } from "./style/Common.style";
import { TWordSlot } from "../model/component.model";
import { TProduct } from "../model/product.model";
import { WebsiteSlot } from "./WebsiteSlot";
import { products } from "../data/products";
import { getProduct } from "../utils/common.functions";
import { ProductsContext } from "../contexts/productContext";
/** @jsx jsx */

let seenWords: Set<string> = new Set();
const initSlotWord: TWordSlot[] = [
  {
    text: getWord(seenWords),
    isFixed: false,
  },
];
const initSlotWebsite: { product: TProduct; isFixed: boolean }[] = [
  {
    product: products[0],
    isFixed: false,
  },
];
const switchCount: number = initSlotWord.length + initSlotWebsite.length;

export const MixTabPanel = () => {
  const productsContext = React.useContext(ProductsContext);
  const [slotWebsites, setSlotWebsites] = React.useState<{ product: TProduct; isFixed: boolean }[]>(initSlotWebsite);
  const [slotWords, setSlotWords] = React.useState<TWordSlot[]>(initSlotWord);
  const [isShuffleBtn, setIsShuffleBtn] = React.useState<boolean>(true);

  React.useEffect(() => {
    setSlotWebsites([
      {
        product: getProduct(productsContext.items, new Set()),
        isFixed: false,
      },
    ]);
  }, [productsContext.items]);

  React.useEffect(() => {
    let isFixedCount: number = slotWebsites.filter((word) => word.isFixed).length + slotWords.filter((word) => word.isFixed).length;
    setIsShuffleBtn(switchCount !== isFixedCount);
  }, [isShuffleBtn, slotWebsites, slotWords]);

  const resetWords = async () => {
    let newSlotWebsites: { product: TProduct; isFixed: boolean }[] = slotWebsites.map((site) => {
      return { ...site, product: site.isFixed ? site.product : getProduct(productsContext.items, new Set()) };
    });
    setSlotWebsites([...newSlotWebsites]);

    for (const word of slotWords) {
      if (word.isFixed) continue;
      seenWords.delete(word.text);
    }
    let newSlotWords: TWordSlot[] = slotWords.map((word) => {
      return { ...word, text: word.isFixed ? word.text : getWord(seenWords) };
    });
    setSlotWords([...newSlotWords]);
  };

  const handleWebsiteSwitchChange = (index: number) => {
    setSlotWebsites((prev) => [
      ...prev.map((product, i) => {
        return { ...product, isFixed: i === index ? !product.isFixed : product.isFixed };
      }),
    ]);
  };

  const handleWordSwitchChange = (index: number) => {
    setSlotWords((prev) => [
      ...prev.map((word, i) => {
        return { ...word, isFixed: i === index ? !word.isFixed : word.isFixed };
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
          📷
        </span>
        Instagram ✖️
        <span role='img' aria-label='trash'>
          🗑
        </span>
        disappearing ={" "}
        <span role='img' aria-label='ghost'>
          👻
        </span>
        Snapchat
      </Typography>

      <Grid css={StyleSlotContainer} container>
        <WebsiteSlot product={slotWebsites[0].product} index={0} isOn={slotWebsites[0].isFixed} handleSwitchChange={handleWebsiteSwitchChange} />
        <SpaceSlot />
        <WordSlot index={0} text={slotWords[0].text} isOn={slotWords[0].isFixed} handleSwitchChange={handleWordSwitchChange} />
      </Grid>

      <Grid container direction='column' alignItems='center'>
        <Button variant='contained' css={StyleButton} color='primary' onClick={resetWords} disabled={!isShuffleBtn} startIcon={<Shuffle />}>
          Shuffle
        </Button>
      </Grid>
    </Fragment>
  );
};
