import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlaylistVideos } from "../hook/useYoutubeContentList";
import influencerData from "../data/influencer_playlist.json";
import InfAllContent from "../components/InfluencerPlay/InfAllContent";

const InfluencerPlayContent = () => {
  const { teamCode, name } = useParams();
  const [clipVideos, setClipVideos] = useState([]);
  const [playVideos, setPlayVideos] = useState([]);

  useEffect(() => {
    const teamObj = influencerData.teams.find((team) => team.team === teamCode);
    if (!teamObj) return;

    const influencer = teamObj.influencers.find((i) => i.name === name);
    if (!influencer) return;

    const fetchVideos = async () => {
      if (influencer.clip) {
        const clip = await fetchPlaylistVideos(influencer.clip, 50);
        setClipVideos(clip.map((v) => ({ ...v, type: "clip" })));
      }

      if (influencer.play) {
        const play = await fetchPlaylistVideos(influencer.play, 50);
        setPlayVideos(play.map((v) => ({ ...v, type: "play" })));
      }
    };

    fetchVideos();
  }, [teamCode, name]);

  return (
    <div className="inner">
      <InfAllContent clipVideos={clipVideos} playVideos={playVideos} />
    </div>
  );
};

export default InfluencerPlayContent;
