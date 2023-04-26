import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  console.log(title);
  return (
    <Helmet
      title={title ? `${title} | Fighter Power` : undefined}
      defaultTitle="Fighter Power"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
