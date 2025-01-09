import { useParams } from 'react-router-dom';
import General from './general';
import PageNotFound from 'PageNotFound';

const IndexComponent = () => {
  const { action } = useParams<{ action: string }>();
  
  switch (action) {
    case 'general':
      return <General />;
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;