import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { BreadcrumbState } from '@/stores';

interface BreadcrumbItem {
  path: string;
  name: string;
}

interface BreadcrumbsSetterProps {
  breadcrumbs: BreadcrumbItem[];
}

export const BreadcrumbsSetter = ({ breadcrumbs } : BreadcrumbsSetterProps) => {
  const setBreadcrumb = useSetRecoilState(BreadcrumbState);

  useEffect(() => {
    setBreadcrumb(breadcrumbs);
  }, [setBreadcrumb, breadcrumbs]);

  return null;
};
