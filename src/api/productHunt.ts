import fetch from "node-fetch";

export const getList = async () => {
  const url = "https://api.producthunt.com/v2/api/graphql";
  const query = /* GraphQL */ `
    {
      posts() {
        edges {
          node {
            id
            name
            description
            url
            tagline
            votesCount
            productLinks {
              type
              url
            }
            media {
              url(width: 200, height: 200)
            }
            thumbnail {
              url(width: 200, height: 200)
            }
          }
        }
      }
    }
  `;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_PRODUCT_HUNT_API_KEY}`,
    },
    body: JSON.stringify({ query }),
  };

  return await fetch(url, options).then((res) => {
    if (res.status !== 200) new Error("not status 200");
    return res.json();
  });
};
