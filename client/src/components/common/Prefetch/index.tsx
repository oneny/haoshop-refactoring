import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from 'store';
import { brandApiSlice } from 'store/apis/brandApiSlice';
import { categoryApiSlice } from 'store/apis/categoryApiSlice';
import { collectionApiSlice } from 'store/apis/collectionApiSlice';
import { lookbookApiSlice } from 'store/apis/lookbookApiSlice';

export const Prefetch = () => {
  useEffect(() => {
    console.log('subsribing');
    const brands = store.dispatch(brandApiSlice.endpoints.getBrands.initiate());
    const categories = store.dispatch(
      categoryApiSlice.endpoints.getCategories.initiate(),
    );
    const collections = store.dispatch(
      collectionApiSlice.endpoints.getCollections.initiate({
        perPage: 20,
        currentPage: 1,
      })
    );
    const lookbooks = store.dispatch(
      lookbookApiSlice.endpoints.getLookbooks.initiate({
        perPage: 20,
        currentPage: 1,
      })
    );

    return () => {
      console.log('unsubscribing');
      brands.unsubscribe();
      categories.unsubscribe();
      collections.unsubscribe();
      lookbooks.unsubscribe();
    }
  }, []);

  return <Outlet />;
};
