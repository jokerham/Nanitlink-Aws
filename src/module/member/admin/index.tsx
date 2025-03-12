import React from 'react';
import { useParams } from 'react-router-dom';
import List from './List';
import PageNotFound from 'PageNotFound';
import Detail from './Detail';
import Group from './group';

interface Props {
}

const IndexComponent: React.FC<Props> = () => {
  const { action } = useParams<{ action: string }>();
  switch (action) {
    case 'list':
      return <List />;
    case 'detail':
      return <Detail />
    case "group":
      return <Group />;
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;