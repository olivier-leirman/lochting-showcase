import { useParams } from 'react-router-dom';
import { ComponentPage } from './ComponentPage';

export function ComponentDetail() {
  const { id } = useParams();
  // Delegate to existing ComponentPage for now
  return <ComponentPage />;
}
