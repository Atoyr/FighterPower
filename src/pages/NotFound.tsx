import React from 'react';
import { useDocumentTitle } from 'hook/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle("NotFound");
  return (
  <div>
    Page Not Found.
  </div>
  );
}
