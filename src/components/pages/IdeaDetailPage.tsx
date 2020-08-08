import React, { useState, useEffect, Fragment } from "react";
import { Typography, Container } from "@material-ui/core";
import { TIdeaDetail } from "../../model/idea.model";
import { jsx } from "@emotion/core";
import { StyleMainTitle } from "../style/Common.style";
import { getIdeaDetail } from "../../firebase/ideas";
import { TMatchProps } from "../../model/component.model";
import { Skeleton } from "@material-ui/lab/";

/** @jsx jsx */

export const IdeaDetailPage: React.FC<TMatchProps> = ({
  match: {
    params: { ideaId },
  },
}) => {
  const [loading, setLoading] = useState(true);
  const [idea, setIdea] = useState<TIdeaDetail | null>(null);

  useEffect(() => {
    getIdeaDetail(ideaId).then((res) => {
      setIdea(res);
      setLoading(false);
    });
  }, [ideaId]);

  return (
    <Container maxWidth='md'>
      {loading ? (
        <Fragment>
          <Typography variant='h1' css={StyleMainTitle} align='center'>
            <Skeleton />
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <Skeleton key={i} />
              ))}
            <Skeleton width='70%' />
          </Typography>
        </Fragment>
      ) : (
        <Fragment>
          <Typography variant='h1' css={StyleMainTitle} align='center'>
            {idea!.title}
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            {idea!.description}
          </Typography>
        </Fragment>
      )}
    </Container>
  );
};
