import {
  HeroEditorial,
  ValuesStrip,
  Bestsellers,
  StoryTeaser,
  ReviewsSection,
  JournalTeaser,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <HeroEditorial />
      <ValuesStrip />
      <Bestsellers />
      <StoryTeaser />
      <ReviewsSection />
      <JournalTeaser />
    </>
  );
}
