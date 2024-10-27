import ExpandingCards from "@/components/homesection/CommunityCarousel";
import CommunityCarousel from "@/components/homesection/CommunityCarousel";
import Hero from "@/components/homesection/Hero";
import Middle from "@/components/homesection/middlese";
import StreamingServicesBar from "@/components/homesection/StreamingServicesBar";
import Testimo from "@/components/homesection/testi";
import VideoGallery from "@/components/homesection/VideoGallery";
import WonchanceCommunity from "@/components/homesection/WonchanceCommunity";


export default function Home() {
  return (
    <>
      <Hero />
      <StreamingServicesBar />
      <ExpandingCards />
      <Middle />
      <ExpandingCards />
      <StreamingServicesBar />
      <VideoGallery />
      <WonchanceCommunity />
      <Testimo/>
    </>

  );
}
