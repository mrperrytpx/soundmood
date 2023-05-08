import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LANDING_TEXTS, LISTENERS_TEXTS } from "../consts/texts";
import { getRandomNumber } from "../consts/getRandomNumber";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import { io } from "socket.io-client";
import { Icon } from "../components/Icon";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
  withCredentials: true,
});

const HomePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ landingText, listenersText }) => {
  const [volume, setVolume] = useState("1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [listeners, setListeners] = useState<string | number>(0);

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
    socket.emit("get-streamers");

    socket.on("current-streamers", (data) => {
      setListeners(data.listeners);
    });

    socket.on("user-start", (data) => {
      setListeners(data.listeners);
    });
    socket.on("user-stop", (data) => {
      setListeners(data.listeners);
    });

    return () => {
      socket.off("user-start");
      socket.off("user-stop");
      socket.off("current-streamers");
    };
  }, [setListeners]);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = e.target.value;
    if (audioRef.current) {
      audioRef.current.volume = +newVolume;
    }
    setVolume(newVolume);
    localStorage.setItem("sh-volume", newVolume);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black/70 p-2">
      <div className="my-auto flex w-[min(95%,500px)] flex-col items-center justify-center gap-8 rounded-lg p-4">
        <h1 className="text-center text-3xl font-bold sm:text-5xl">
          Serenity Hearth
        </h1>

        <div className="flex aspect-square w-20 flex-col items-center justify-center md:w-24">
          <button
            onClick={handlePausePlay}
            id="toggle"
            className="flex aspect-square w-full animate-wavepulse flex-row items-center justify-center rounded-full bg-[#1fcfc1] opacity-80 hover:opacity-100"
          >
            <Image
              width={200}
              loading="eager"
              height={200}
              className={`h-full w-full ${
                isPlaying ? "hidden" : "inline-block"
              }`}
              src="play.svg"
              alt="Play audio button"
            />
            <Image
              width={100}
              height={100}
              loading="eager"
              className={`h-full w-full ${
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
        <div className="my-1 flex w-full max-w-[200px] justify-center rounded-lg">
          <form className="w-full">
            <input
              aria-label="Volume"
              id="volumeSlider"
              name="volumeSlider"
              type="range"
              min="0"
              max="1"
              value={volume}
              onChange={handleVolumeChange}
              step={0.01}
              className="slider w-full appearance-none rounded-lg bg-transparent"
            />
          </form>
        </div>
        <p className="text-center" id="landingText">
          {landingText}
        </p>
        <div className="flex w-full items-center justify-center gap-8">
          <a
            className="group inline-block h-10 w-10"
            href="https://twitter.com/serenity_hearth"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <Icon
              name="twitter"
              className="h-full w-full group-hover:fill-white"
            />
          </a>
          <a
            className="group inline-block h-10 w-10 rounded-full bg-black"
            href="https://github.com/mrperrytpx/soundmood"
            target="_blank"
            rel="noreferrer"
            aria-label="Github"
          >
            <Icon
              name="github"
              className="h-full w-full group-hover:fill-white"
            />
          </a>
        </div>
      </div>
      <div className="mb-2 mt-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-1 text-center">
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
  listenersText: string;
}> = async () => {
  return {
    props: {
      landingText: LANDING_TEXTS[getRandomNumber(LANDING_TEXTS.length)],
      listenersText: LISTENERS_TEXTS[getRandomNumber(LISTENERS_TEXTS.length)],
    },
  };
};
