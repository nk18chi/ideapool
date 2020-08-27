import React from "react";
import { Grid, Typography, Tabs, Tab } from "@material-ui/core/";
import { jsx, css } from "@emotion/core";
import { StyleMainTitle } from "../style/Common.style";
import { WordSlotTabPanel } from "../WordSlotTabPanel";
import { MixTabPanel } from "../MixTabPanel";
import { WebsiteTabPanel } from "../WebsiteTabPanel";

/** @jsx jsx */

export const TopPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const StyleTabButton = css`
    background-color: #ffd31e;
    color: #fff;
    font-weight: 600;
    min-height: 32px;
    opacity: 0.4;
    font-size: 12px;
  `;

  const StyleIndicator = css`
    max-width: 60px;
    width: 100%;
    background-color: #fff;
  `;

  const StyleTabs = {
    justifyContent: "center",
    backgroundColor: "transparent",
    bottom: 20,
    display: "flex",
  };

  return (
    <article>
      <Grid container alignItems='center'>
        <Grid item xs={12}>
          <Typography variant='h2' css={StyleMainTitle} align='center'>
            Generate new business ideas
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Tabs
            centered={true}
            value={tabValue}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: StyleTabs,
              children: <span css={StyleIndicator} />,
            }}
          >
            <Tab css={StyleTabButton} label='websites' />
            <Tab css={StyleTabButton} label='website × word' />
            <Tab css={StyleTabButton} label='words' />
          </Tabs>
        </Grid>

        <Grid item xs={12}>
          {tabValue === 0 && <WebsiteTabPanel />}
          {tabValue === 1 && <MixTabPanel />}
          {tabValue === 2 && <WordSlotTabPanel />}
        </Grid>
      </Grid>
    </article>
  );
};
