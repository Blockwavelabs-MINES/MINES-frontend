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
    
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
}
 
export default TwitterCard;