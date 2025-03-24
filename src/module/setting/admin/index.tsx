import { useParams } from 'react-router-dom';
import General from './general';
import PageNotFound from '@/PageNotFound';
import Menu from './menu';

const IndexComponent = () => {
  const { action } = useParams<{ action: string }>();
  
  switch (action) {
    case 'general':
      return <General />;
    case 'menu':
      return <Menu />;
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;