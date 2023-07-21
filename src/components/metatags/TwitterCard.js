import { Helmet } from "react-helmet-async";

const TwitterCard = ({
  title,
  description,
  image
}) => {
  const domain = "https://3tree.io/";

  return (  
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:src" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
 
export default TwitterCard;