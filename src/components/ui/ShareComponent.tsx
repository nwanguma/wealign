import Image from "next/image";
import { WithTooltip } from "./WithTooltip";

const ShareComponent = ({ url, text }: { url: string; text?: string }) => {
  const shareUrls: { [key: string]: string } = {
    Linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    Google: `https://plus.google.com/share?url=${encodeURIComponent(url)}`,
    Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text || "")}`,
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  return (
    <div className="space-y-1">
      <h3 className="text-sm text-gray-600 font-bold">Share</h3>
      <div className="flex space-x-3">
        {["Linkedin", "Twitter", "Facebook"].map((platform) => (
          <div key={platform}>
            {WithTooltip(
              platform,
              <a
                href={shareUrls[platform]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/icons/${platform}-share.svg`}
                  alt={`${platform} share icon`}
                  width={20}
                  height={20}
                />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareComponent;
