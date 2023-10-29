import { Helmet } from 'react-helmet-async';

type TitleProps = {
  title?: string;
  description?: string;
};

export const Title = ({ title = '', description = '' }: TitleProps = {}) => {
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
