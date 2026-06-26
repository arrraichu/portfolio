import { PrimaryButton, SecondaryButton } from "../buttons/buttons";

export default function TextButtonsContent({
  title, text, primaryButtonText, primaryButtonHref, secondaryButtonText, secondaryButtonHref
}: Readonly<{
  title: string,
  text: string,
  primaryButtonText: string,
  primaryButtonHref: string,
  secondaryButtonText?: string,
  secondaryButtonHref?: string
}>) {
  return (
    <section className="flex flex-col py-8 md:py-10 lg:py-12 px-7 md:px-12 lg:px-20 gap-2">
      <h2>{title}</h2>
      <span className="my-2 px-2">{text}</span>
      <div className="flex pt-4 gap-2">
        <div className="p-2">
          <PrimaryButton text={primaryButtonText} />
        </div>
        {secondaryButtonText && (
          <div className="p-2">
            <SecondaryButton text={secondaryButtonText} />
          </div>
        )}
      </div>
    </section>
  );
}