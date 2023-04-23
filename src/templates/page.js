import React from "react";
import { BlockRendererProvider } from "@webdeveducation/wp-block-tools";
import { blockRendererComponents } from "../config/blockRendererComponents";
import { Link, graphql } from "gatsby";
import { Layout } from "../components";

const Page = (props) => {
  console.log("Page Props", props);
  return (
    <Layout>
      <BlockRendererProvider
        allBlocks={props.pageContext.blocks}
        renderComponent={blockRendererComponents}
        siteDomain={process.env.GATSBY_WP_URL}
        customInternalLinkComponent={(
          { children, internalHref, className },
          index
        ) => {
          //console.log("ARGS", args);
          return (
            <Link to={internalHref} className={className} key={index}>
              {children}
            </Link>
          );
        }}
      />
      {/* <BlockRendererProvider allBlocks={props.pageContext.blocks} /> if we want to dispaly normal blocks*/}
    </Layout>
  );
};
export const query = graphql`
  query PageQuery($databaseId: Int!) {
    wpPage(databaseId: { eq: $databaseId }) {
      seo {
        metaDesc
        title
      }
    }
    wpCar(databaseId: { eq: $databaseId }) {
      seo {
        metaDesc
        title
      }
    }
  }
`;

export const Head = ({ data }) => {
  console.log("Head Data", data);
  const page = data.wpPage || data.wpCar;
  return (
    <>
      <title>{page.seo?.title || ""}</title>
      <meta name="description" content={page.seo?.metaDesc || ""}></meta>
    </>
  );
};

export default Page;
