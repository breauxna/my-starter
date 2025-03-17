import { useParams } from "react-router";
import { Spinner } from "../ui/Spinner";
import { useFetchProduct } from "../../state/query/products";
import { formatDollarAmount } from "../../utils/money";

export function ProductDetails() {
  const { productId } = useParams();
  const productQuery = useFetchProduct(productId || '');

  if (productQuery.isPending) return <Spinner />;
  if (productQuery.isError) return <span>{productQuery.error.message}</span>;

  const {
    name, 
    description,
    price,
    imageUrl,
  } = productQuery.data.data;

  return (
    <section className="m-6 flex flex-col sm:flex-row gap-6">
      <section className="basis-7/12">
        <img className="object-cover w-full h-[calc(70vh)] rounded-md" src={imageUrl} alt={name} />
      </section>
      <section className="flex flex-col gap-5 basis-5/12">
        <header className="flex justify-between items-center">
          <span className="text-xl">
            <b>{name}</b>
          </span>
          <span>
            <b>{formatDollarAmount(price)}</b>
          </span>
        </header>
        <section>
          <p>
            {description}
          </p>
        </section>
      </section>
    </section>
  )
}