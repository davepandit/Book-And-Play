import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keywords} />
      </Helmet>
    );
  };

  Meta.defaultProps = {
    title: 'Welcome To BookAndPlay',
    description: 'We make your sport sessions smooooooth',
    keywords: 'slots , booking , ticket , play , badminton , tabletennis , tt , NITK',
  };
  
  export default Meta;