import React, { FC } from "react";
import { Button, Grid, Typography, Card, CardHeader, Avatar, CardMedia, CardActions, CardContent } from "@material-ui/core/";
import { Skeleton } from "@material-ui/lab/";
import { jsx, css } from "@emotion/core";
import { TProduct, TProductsContext } from "../model/product.model";
import { GreenSwitch } from "./common/GreenSwitch";
import { ProductsContext } from "../contexts/productContext";
/** @jsx jsx */

const StyleComponent = css`
  display: grid;
  width: 47.5%;
`;

const StyleCardContainer = css`
  background-color: #eee;
  display: flex;
`;

const StyleCard = css`
  margin: 4px;
`;

const StyleCardMedia = css`
  height: 0;
  padding-top: 56.25%;
`;

export const WebsiteSlot: FC<{
  product: TProduct;
  index: number;
  isOn: boolean;
  handleSwitchChange: (index: number) => void;
}> = ({ product, index, isOn, handleSwitchChange }) => {
  const productContext = React.useContext<TProductsContext>(ProductsContext);
  return (
    <Grid css={StyleComponent}>
      <Grid item css={StyleCardContainer}>
        {productContext.loading ? (
          <Card css={StyleCard}>
            <CardHeader avatar={<Skeleton variant='circle' width={40} height={40} />} title={<Skeleton width='30%' />} />
            <Skeleton css={StyleCardMedia} variant='rect' width='100%' component='div' />
            <CardContent>
              <Typography variant='subtitle1' component='p'>
                <Skeleton />
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                <Skeleton />
                <Skeleton />
                <Skeleton width='70%' />
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Card css={StyleCard}>
            <CardHeader avatar={<Avatar src={product.thumbnail.url}></Avatar>} title={product.name} />
            <CardMedia css={StyleCardMedia} image={product.media[0].url} />
            <CardContent>
              <Typography variant='subtitle1' component='p'>
                {product.tagline}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {product.description}
              </Typography>
            </CardContent>
            {product.url && (
              <CardActions disableSpacing>
                <Button target='_blank' size='small' color='primary' href={product.url}>
                  Learn More
                </Button>
              </CardActions>
            )}
          </Card>
        )}
      </Grid>
      <Grid
        item
        css={css`
          text-align: center;
        `}
      >
        <GreenSwitch index={index} value={isOn} handleSwitchChange={handleSwitchChange} />
      </Grid>
    </Grid>
  );
};
