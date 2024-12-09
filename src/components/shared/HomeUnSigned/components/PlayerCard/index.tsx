import "./styles.css";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import StaggeredLetters from "@/components/animations/StaggeredLetters";
import { Button } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { useRef } from "react";

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function PLayerCard() {
  const buttonRef = useRef(null);
  const handleConfetti = () => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="player">
      <div className="player-content" style={{ width: "100%" }}>
        <Image
          isBlurred
          alt="NextUI Album Cover"
          as={NextImage}
          isZoomed
          src="/images/album-cover.png"
          width={200}
          height={200}
          shadow="lg"
        />
        <div className="player-content-info">
          <div className="player-content-info__title">
            <StaggeredLetters once={false} text="Daily Mix" />
          </div>
          <p className="player-content-info__subtitle">12 Tracks</p>
          <p className="player-content-info__desc">Frontend Radio</p>

          <div>
            <Button
              ref={buttonRef}
              disableRipple
              className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              size="lg"
              onPress={handleConfetti}
            >
              Press me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
