import { Composition } from "remotion";
import { HoneyPhoneDemo, HoneyPhonePreview } from "./HoneyPhoneDemo";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="HoneyPhoneDemo"
      component={HoneyPhoneDemo}
      durationInFrames={290 * 30}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="HoneyPhonePreview"
      component={HoneyPhonePreview}
      durationInFrames={27 * 30 + 8}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
