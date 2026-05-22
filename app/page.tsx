import TextContent from "./_components/content/text-content";
import TextButtonsContent from "./_components/content/text-buttons-content";

export default function Home() {
  return (
    <>
      <TextButtonsContent
        title="Alice in Wonderland"
        text="Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”"
        primaryButtonText="Read more"
        primaryButtonHref="#"
        secondaryButtonText="Learn more"
        secondaryButtonHref="#"
      />
      <TextContent
        title="A Study in Scarlet"
        text="In the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon. The regiment was stationed in India at the time, and before I could join it, the second Afghan war had broken out. On landing at Bombay, I learned that my corps had advanced through the passes, and was already deep in the enemy’s country. I followed, however, with many other officers who were in the same situation as myself, and succeeded in reaching Candahar in safety, where I found my regiment, and at once entered upon my new duties."
      />
    </>
  );
}
