import List from './List';
import PageNotFound from '@/PageNotFound';
import { useParams } from 'react-router';

interface ICategoryProps {
  id: string
}

const Index = ({id}: ICategoryProps) => {
  const param = useParams()
  const tabPageAction = param['tabPageAction'] || 'list';

  switch (tabPageAction) {
    case 'list':
      return <List id={id} />;
    default:
      return <PageNotFound />;
  }
}

export default Index;
