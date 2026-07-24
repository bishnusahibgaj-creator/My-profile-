import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  type?: string;
}

export default function SEO({ title, description, url, type = 'website' }: SEOProps) {
  return (
    <Helmet>
      <title>{title} | Website Building</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | Website Building`} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Website Building`} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
