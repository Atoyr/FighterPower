import * as React from 'react';

type siteLogoProps = {
  children? : React.ReactNode;
  size?: number;
  isTitle?: boolean;
  type?: string;
}

const SiteLogo = (props: siteLogoProps) => {
  let h;
  let w;
  let vb;
  h = props.size ?? 250;
  if ( props.isTitle ) {
    w = h * 10;
    vb = "0 0 2500 250";
  } else {
    w = h;
    vb = "0 0 250 250";
  }

  const type = props.type ?? "arcade";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={vb} x="0" y="0" width={w} height={h} >
      { /*<circle cx="125" cy="125" r="125" fill="#FFD"/> */}

      <circle cx="57" cy="125" r="32" fill="#f55"  />

      <circle cx="141" cy="105" r="27" fill="#f55"  />
      <circle cx="135" cy="145" r="27" fill="#f55"  />
      <circle cx="181" cy="90" r="27" fill="#f55"  />
      <circle cx="175" cy="130" r="27" fill="#f55"  />
      <circle cx="222" cy="90" r="27" fill="#f55"  />
      <circle cx="216" cy="130" r="27" fill="#f55"  />

      <circle cx="141" cy="105" r="22" fill="#000" />
      <circle cx="135" cy="145" r="22" fill="#000" />
      <circle cx="181" cy="90" r="22" fill="#000" />
      <circle cx="175" cy="130" r="22" fill="#000" />
      <circle cx="222" cy="90" r="22" fill="#000" />
      <circle cx="216" cy="130" r="22" fill="#000" />

      <circle cx="141" cy="105" r="20" fill="#f55" />
      <circle cx="135" cy="145" r="20" fill="#f55" />
      <circle cx="181" cy="90" r="20" fill="#f55" />
      <circle cx="175" cy="130" r="20" fill="#f55" />
      <circle cx="222" cy="90" r="20" fill="#f55" />
      <circle cx="216" cy="130" r="20" fill="#f55" />
      { props.isTitle && 
        <text alignmentBaseline="middle" x="280" y="125"
          style={{
            fontSize: 200,
            fill: "#FFF",
            userSelect: "none",
          }}
        >FighterPower</text>
      }
    </svg>
  );
};

export default SiteLogo;
