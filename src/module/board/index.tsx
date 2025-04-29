import { useParams } from 'react-router-dom';
import PageNotFound from '@/PageNotFound';
import List from './list';
import Edit from './edit';
import Detail from './detail';
import Configure from './admin/Configure';

const IndexComponent = () => {
  const { action, id } = useParams<{ action: string, id: string }>();

  if (!id) {
    return <PageNotFound />;
  }

  switch (action ?? 'list') {
    case 'list':
      return <List id={id}/>
    case 'edit':
      return <Edit id={id}/>
    case 'detail':
      return <Detail id={id}/>
    case 'configure':
      return <Configure id={id} />
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;