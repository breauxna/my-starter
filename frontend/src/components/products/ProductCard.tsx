import { Link } from "react-router";
import { Card } from "../ui/Card";

type ProductCardProps =  {id: string, name: string, description: string, price: number, imageUrl: string };

export function ProductCard({id, name, description, price, imageUrl}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} target="_blank">
      <Card title={name} info={description} price={price} img={{src: imageUrl, alt: name}} />
    </Link>
  )
}