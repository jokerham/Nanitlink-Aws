import { useParams } from 'react-router-dom';
import View from './View';
import PageNotFound from '@/PageNotFound';
import Edit from './Edit';

const IndexComponent = () => {
  const { action, id } = useParams<{ action: string, id: string }>();

  if (!id) {
    return <PageNotFound />;
  }

  switch (action ?? 'view') {
    case 'index':
    case 'view':
      return <View id={id}/>
    case 'edit':
      return <Edit id={id}/>
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;