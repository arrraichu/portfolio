import clsx from 'clsx';
import Image from 'next/image';

export default function ImageContent({ src, alt, placement }: Readonly<{
  src: string,
  alt: string,
  placement: string
}>) {
  return (
    <section className="flex flex-col py-8 md:py-10 lg:py-12 mx-0 lg:ml-20 lg:mr-30 gap-2">
      <div
        className={clsx(
          'relative w-[104%] aspect-video my-2 mr-0 transform-[translateX(-2%)]',
          'lg:mr-20 lg:transform-[translateX(0)]',
          'rounded-none border-x-0 border-y-6 border-(--accent-color) bg-(--accent-color)',
          'lg:rounded-lg lg:border-x-6',
          'emboss-edges'
        )}
      >
        <Image
          className="object-cover rounded-none lg:rounded-lg"
          src={src}
          alt={alt}
          fill={true}
        />
      </div>
    </section>
  )
}