import Image from "next/image";

interface PhotographeProps {
  title: string;
  image: string;
  description: string;
}

export default function Photographe({ title, image, description }: PhotographeProps) {
  return (
    <article className="m-6 p-6 border-2 bg-slate-100 rounded-lg flex flex-col justify-items-center shadow-inner">
      <div className="w-48 h-48 bg-slate-500 m-auto rounded-full flex justify-center">
        <Image src={image} alt={title} width={100} height={100} />
      </div>
      <h3 className="m-4 p-2 bg-slate-300 rounded-lg text-center text-lg shadow-inner">{title}</h3>
      <p>{description}</p>
    </article>
  );
}
