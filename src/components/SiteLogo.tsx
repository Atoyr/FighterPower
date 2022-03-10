import * as React from 'react';

type siteLogoProps = {
  children? : React.ReactNode;
  size?: number;
  title?: boolean;
  type?: string;
}

const SiteLogo = (props: siteLogoProps) => {
  const h = props.size ?? 250;
  const w = h * 10;
  const type = props.type ?? "arcade";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 250" x="0" y="0" width={w} height={h} >
      { /*<circle cx="125" cy="125" r="125" fill="#FFD"/> */}

      <circle cx="57" cy="125" r="32" fill="#f55"  />

      <circle cx="141" cy="105" r="27" fill="#f55"  />
      <circle cx="135" cy="145" r="27" fill="#f55"  />
      <circle cx="181" cy="90" r="27" fill="#f55"  />
      <circle cx="175" cy="130" r="27" fill="#f55"  />
      <circle cx="221" cy="90" r="27" fill="#f55"  />
      <circle cx="215" cy="130" r="27" fill="#f55"  />

      <circle cx="141" cy="105" r="22" fill="#fff" />
      <circle cx="135" cy="145" r="22" fill="#fff" />
      <circle cx="181" cy="90" r="22" fill="#fff" />
      <circle cx="175" cy="130" r="22" fill="#fff" />
      <circle cx="221" cy="90" r="22" fill="#fff" />
      <circle cx="215" cy="130" r="22" fill="#fff" />
      <text alignmentBaseline="middle" x="280" y="125"
        style={{
          fontSize: 200,
          fill: "#FFF",
        }}
      >FighterPower</text>
    </svg>
  );
};

export default SiteLogo;
