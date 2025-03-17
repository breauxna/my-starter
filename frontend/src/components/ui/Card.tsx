import { formatDollarAmount } from "../../utils/money";

interface CardProps {
  title?: string;
  info?: string;
  price?: number;
  img?: {
    src: string;
    alt: string;
  }
  onClick?: () => void;
}

export function Card({title, info, price, img, onClick}: CardProps) {
  return (
    <article className={`w-80 h-96 sm:w-96 rounded border overflow-hidden ${onClick && 'cursor-pointer hover:shadow-md'}`} onClick={onClick}>
      {img && <img className="object-cover w-full h-64 rounded-t-sm" src={img.src} alt={img.alt} loading="lazy" />}
      <div className="px-6 py-4">
        <div className="flex content-center justify-between">
          <header>{title}</header>
          {price && 
            <section>
              <p className="font-bold">{formatDollarAmount(price)}</p>
            </section>
          }
        </div>
        <section>
          <p className="text-gray-500 text-base line-clamp-3">{info}</p>
        </section>
      </div>
    </article>
  )
}