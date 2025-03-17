import { useEffect, useState } from "react"
import { Spinner } from "../ui/Spinner";
import { Paginator } from "../common/Paginator";
import { useSearchParams } from "react-router";
import { useFetchProducts } from "../../state/query/products";
import { ProductCard } from "./ProductCard";

export function Products() {
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const search = searchParams.get('search') || '';
  const productsQuery = useFetchProducts(page, 10, search);

  useEffect(() => {
    if (productsQuery.data?.pagination) {
      setTotalPageCount(productsQuery.data.pagination.totalPages);
    }
  }, [productsQuery.data?.pagination]);

  if (productsQuery.isError) return <span>Error: {productsQuery.error.message}</span>;

  return (
    <section className="flex flex-col m-6 sm:m-0 items-center">
      <article className="flex flex-wrap gap-6 mb-12 min-h-[calc(100vh-theme(space.14))] md:min-h-[calc(80vh-4.5rem)]">
        {productsQuery.isPending ? 
          <Spinner /> :
          (
            productsQuery.data.data.length ?
            productsQuery.data.data.map(({ _id, name, description, price, imageUrl }) => {
              return (
                <ProductCard key={_id} id={_id} name={name} description={description} price={price} imageUrl={imageUrl} />
              );
            }) :
            <span>No results</span>
          )
        }
      </article>
      {totalPageCount > 0 &&
        <Paginator
          totalPageCount={totalPageCount}
        />
      }
    </section>
  )
}