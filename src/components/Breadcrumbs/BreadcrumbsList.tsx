import { useRecoilValue } from 'recoil';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { BreadcrumbState } from '@/stores';

export const BreadcrumbsList = () => {
  const breadcrumbs = useRecoilValue(BreadcrumbState);
  if(breadcrumbs.length === 0) {
    return(<></>);
  } else {
    const lastIndex = breadcrumbs.length - 1;
    const last = breadcrumbs[lastIndex];
    const source = breadcrumbs.slice(0, lastIndex);
    return(
      <Breadcrumbs aria-label="breadcrumb">
        {source.map(({ path, name }) => (
          <Link key={path} color="inherit" component={RouterLink} to={path}>
            {name}
          </Link>
        ))}
        <Typography color="text.primary">{last.name}</Typography>
      </Breadcrumbs>
    );
  }
};
