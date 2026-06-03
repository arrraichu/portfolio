export default function Title({title, subtitle}: Readonly<{
  title: string,
  subtitle: string
}>) {
  return (
    <section className="flex flex-col mt-5 py-5 px-5 md:px-10 lg:px-18 gap-2">
      <h1>{title}</h1>

      {subtitle !== "" && (
        <span className="my-2 px-2 text-center md:text-left italic">
          {subtitle}
        </span>
      )}
    </section>
  );
};
