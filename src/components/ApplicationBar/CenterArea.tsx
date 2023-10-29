import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { 
  Breadcrumbs, 
  Box, 
  Link, 
  SvgIcon, 
  Typography , 
  useTheme, 
} from '@mui/material';

import { ReactComponent as logo } from '@/assets/logo.svg'
import { useAuth } from '@/hooks';
import { BreadcrumbState } from '@/stores';

const BreadcrumbsList = ({breadcrumbs, to}) => {
  const theme = useTheme();

  if(breadcrumbs.length === 0) {
    return(
      <RouterLink to={to} style={{ display: 'block', alignItems: 'center', justifyContent: 'center'}}>
        <SvgIcon component={logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle"}}/>
      </RouterLink>
    );
  } else {
    const lastIndex = breadcrumbs.length - 1;
    const last = breadcrumbs[lastIndex];
    const source = breadcrumbs.slice(0, lastIndex);
    return(
      <Breadcrumbs aria-label="breadcrumb">
        {source.map(({ path, name }) => (
          <Link key={path} color="textPrimary" component={RouterLink} to={path}>
            {name}
          </Link>
        ))}
        <Typography color="textPrimary">{last.name}</Typography>
      </Breadcrumbs>
    );
  }
};

export const CenterArea = () => {
  const authState = useAuth();
  const to = authState.user === null ? "/" : "/app/dashboard";
  const breadcrumbs = useRecoilValue(BreadcrumbState);

  return (
    <Box sx={{flexGrow: 1, px: 0.5, display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'center'}}>
      <BreadcrumbsList breadcrumbs={breadcrumbs} to={to} />
    </Box>
  );
};
