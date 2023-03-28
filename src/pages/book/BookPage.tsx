import { useParams } from 'react-router-dom';

import { BookMainContent } from '../../components/book-page/book-main-content';
import { BookSubContent } from '../../components/book-page/book-sub-content';
import { Breadcrumbs } from '../../components/common/breadcrumbs';
import { Loading } from '../../components/global/loading';
import { Toast } from '../../components/global/toast';
import { Wrapper } from '../../components/global/wrapper';
import { AppNavigation } from '../../components/navigation/app-navigation';
import { QUERY_STATUSES, ROUTES } from '../../constants';
import { isBookBaseType } from '../../helpers';
import { useCategoriesSelector, useCategoriesStatusSelector, useGetBookByIdQuery } from '../../store';

import styles from './BookPage.module.scss';

export const BookPage = () => {
  const { category: currentCategoryPath, bookId } = useParams();
  const categories = useCategoriesSelector();
  const categoriesStatus = useCategoriesStatusSelector();
  const {
    isFetching: isBookFetching,
    isError: isBookError,
    isSuccess: isBookSuccess,
    data: book,
  } = useGetBookByIdQuery(bookId as string, { skip: !bookId });

  const isLoading = categoriesStatus === QUERY_STATUSES.isLoading || isBookFetching;
  const isError = categoriesStatus === QUERY_STATUSES.isError || isBookError;
  const isSuccess = categoriesStatus === QUERY_STATUSES.isSuccess || isBookSuccess;

  const categoryInBreadcrumbs = categories?.find((cat) => cat.path === currentCategoryPath);

  return (
    <>
      {isLoading ? <Loading /> : <Toast error={isError} />}
      <main className={styles['book-page__main']}>
        {categories && (
          <Breadcrumbs
            paths={[
              {
                name: categoryInBreadcrumbs?.name,
                path: categoryInBreadcrumbs ? `${ROUTES.books.base}/${categoryInBreadcrumbs.path}` : undefined,
              },
              { name: book?.title },
            ]}
          />
        )}
        <Wrapper>
          <AppNavigation />
          {isSuccess && book && (
            <>
              <BookMainContent book={book} />
              <BookSubContent
                rating={book.rating}
                details={isBookBaseType(book) ? undefined : book.details}
                comments={isBookBaseType(book) ? undefined : book.comments}
              />
            </>
          )}
        </Wrapper>
      </main>
    </>
  );
};
