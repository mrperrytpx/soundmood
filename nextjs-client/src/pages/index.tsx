import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  LANDING_TEXTS,
  LISTENERS_TEXTS,
  VISITORS_TEXTS,
} from "../consts/texts";
import { getRandomNumber } from "../consts/getRandomNumber";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
  withCredentials: true,
});

const HomePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ landingText, visitorsText, listenersText }) => {
  const [volume, setVolume] = useState("1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [listeners, setListeners] = useState<string | number>(0);
  const [visitors, setVisitors] = useState<string | number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePausePlay = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      socket.emit("start-streaming");
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current?.pause();
      socket.emit("stop-streaming");
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    socket.on("start-streaming", (data) => {
      setListeners(data.listeners);
    });
    socket.on("stop-streaming", (data) => {
      setListeners(data.listeners);
    });

    socket.on("user-disconnect", (data) => {
      setListeners(data.listeners);
      setVisitors(data.visitors);
    });

    socket.on("user-connect", (data) => {
      setVisitors(data.visitors);
      setListeners(data.listeners);
    });
  }, [socket, setListeners, setVisitors]);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = e.target.value;
    if (audioRef.current) {
      audioRef.current.volume = +newVolume;
    }
    setVolume(newVolume);
    localStorage.setItem("sh-volume", newVolume);
  };

  return (
    <div className="bg-black/70 w-full flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center my-auto justify-center w-[min(95%,500px)] gap-4 p-4 rounded-lg">
        <h1 className="text-3xl sm:text-5xl font-bold text-center">
          Serenity Hearth
        </h1>

        <div className="w-20 md:w-24 aspect-square flex flex-col items-center justify-center">
          <button
            onClick={handlePausePlay}
            id="toggle"
            className="w-full aspect-square flex items-center justify-center flex-row bg-black rounded-full"
          >
            <Image
              width={200}
              height={200}
              className={`w-full h-full ${
                isPlaying ? "hidden" : "inline-block"
              }`}
              src="play.svg"
              alt="Play audio button"
            />
            <Image
              width={100}
              height={100}
              className={`w-full h-full ${
                isPlaying ? "inline-block" : "hidden"
              }`}
              src="pause.svg"
              alt="Pause audio button"
            />
          </button>
          <audio ref={audioRef} id="audioplayer" className="hidden" loop={true}>
            <source src="sound.m4a" type="audio/mp4" />
            <source src="sound.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="w-full max-w-[200px] my-1 flex justify-center rounded-lg">
          <form className="w-full">
            <input
              aria-labelledby="volumeSlider"
              id="volumeSlider"
              name="volumeSlider"
              type="range"
              min="0"
              max="1"
              value={volume}
              onChange={handleVolumeChange}
              step={0.01}
              className="w-full slider rounded-lg bg-transparent appearance-none"
            />
            <label className="text-center w-full block" htmlFor="volumeSlider">
              Volume
            </label>
          </form>
        </div>
        <p className="h-6" id="landingText">
          {landingText}
        </p>
      </div>
      <div className="flex items-center flex-col mt-auto mb-2">
        <div className="flex gap-1 text-center flex-wrap items-center justify-center">
          <p id="visitorsText">{visitorsText}</p>
          <span id="visitorsSpan">{visitors}</span>
        </div>
        <div className="flex gap-1 text-center flex-wrap items-center justify-center">
          <p id="listenersText">{listenersText}</p>
          <span id="listenersSpan">{listeners}</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<{
  landingText: string;
  visitorsText: string;
  listenersText: string;
}> = async () => {
  return {
    props: {
      landingText: LANDING_TEXTS[getRandomNumber(LANDING_TEXTS.length)],
      visitorsText: VISITORS_TEXTS[getRandomNumber(VISITORS_TEXTS.length)],
      listenersText: LISTENERS_TEXTS[getRandomNumber(LISTENERS_TEXTS.length)],
    },
  };
};
