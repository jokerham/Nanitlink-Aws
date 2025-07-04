import { useParams } from 'react-router';
import Add from './Add';
import List from './List';
import PageNotFound from '@/PageNotFound';

interface ICategoryProps {
  id: string
}

const Index = ({id}: ICategoryProps) => {
  const param = useParams()
  const tabPageAction = param['tabPageAction'] || 'list';

  switch (tabPageAction) {
    case 'list':
      return <List id={id} />;
    case 'add':
      return <Add id={id} />;
    default:
      return <PageNotFound />;
  }
}

export default Index;
