import Hero from './sections/Hero';
import Countdown from './sections/Countdown';
import LoveStory from './sections/LoveStory';
import CeremonyReception from './sections/CeremonyReception';
import Timeline from './sections/Timeline';
import Accommodations from './sections/Accommodations';
import Transportation from './sections/Transportation';
import DressCode from './sections/DressCode';
import FAQ from './sections/FAQ';
import RSVP from './sections/RSVP';
import Footer from './sections/Footer';
import { Divider } from './components/Divider';

function SectionBreak() {
  return (
    <div className="flex justify-center py-2">
      <Divider width={260} className="opacity-70" />
    </div>
  );
}

export default function App() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <SectionBreak />
      <Countdown />
      <SectionBreak />
      <LoveStory />
      <SectionBreak />
      <CeremonyReception />
      <SectionBreak />
      <Timeline />
      <SectionBreak />
      <Accommodations />
      <SectionBreak />
      <Transportation />
      <SectionBreak />
      <DressCode />
      <SectionBreak />
      <FAQ />
      <SectionBreak />
      <RSVP />
      <Footer />
    </main>
  );
}
