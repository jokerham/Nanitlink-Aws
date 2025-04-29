import React from 'react';
import { useParams } from 'react-router';
import List from './List';
import Add from './Add';

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
      return <div>404</div>;
  }
}

export default Index;
