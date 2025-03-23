import { useParams } from 'react-router-dom';
import View from './View';
import PageNotFound from 'PageNotFound';

const IndexComponent = () => {
  const { action, id } = useParams<{ action: string, id: string }>();

  if (!id) {
    return <PageNotFound />;
  }

  switch (action ?? 'view') {
    case 'view':
      return <View id={id}/>
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;