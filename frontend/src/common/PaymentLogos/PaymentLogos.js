import React from 'react';

/**
 * Official Razorpay Icon (Geometric bolt inside dark navy container)
 */
export const RazorpayIcon = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <rect width="32" height="32" rx="8" fill="#0C2340" />
    <path
      d="M24.2 5.5L12.5 13.2L11.3 17.5L17.8 13.2L14.4 25.5L9.7 29.3L18.1 13.2L23.2 5.5H24.2Z"
      fill="#FFFFFF"
    />
    <path
      d="M15.8 13.2L9.3 17.5L4.5 20.7L9.2 16.8L15.8 13.2Z"
      fill="#3395FF"
    />
  </svg>
);

/**
 * Official Razorpay Full Logo (Icon + Wordmark)
 */
export const RazorpayLogo = ({ height = 22, className = '' }) => (
  <svg
    height={height}
    viewBox="0 0 120 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    {/* Geometric Bolt Mark */}
    <path
      d="M19.457 0.001L9.123 6.741L8.104 10.45L13.852 6.696L10.889 17.483L6.805 20.816L14.126 6.738L18.588 0.001H19.457Z"
      fill="#0C2340"
    />
    <path
      d="M12.186 6.697L6.438 10.451L2.143 13.256L6.227 9.923L12.186 6.697Z"
      fill="#3395FF"
    />
    {/* Wordmark */}
    <text
      x="24"
      y="19"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      fontSize="15"
      fontWeight="800"
      fill="#0C2340"
      letterSpacing="-0.3px"
    >
      Razorpay
    </text>
  </svg>
);

/**
 * Official PayPal Icon (Dual overlapping "P" monogram)
 */
export const PayPalIcon = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <rect width="32" height="32" rx="8" fill="#F4F8FC" />
    <g transform="translate(4, 4) scale(1)">
      <path
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.808 1.57 1.17 0.978 1.636 2.372 1.348 4.027-.512 2.946-2.585 4.606-5.835 4.694h-2.12a.855.855 0 0 0-.845.727l-.92 5.845-.045.244a.64.64 0 0 1-.632.53H7.076z"
        fill="#003087"
      />
      <path
        d="M9.193 18.067l.865-5.49a.855.855 0 0 1 .845-.728h1.666c2.56 0 4.567-.424 5.54-1.634.34-.423.593-.935.753-1.52.28-1.042.185-2.073-.414-2.812-.486-.6-1.238-.98-2.18-1.157-1.127-.21-2.535-.226-4.22-.226H6.877c-.524 0-.972.382-1.054.901L3.08 18.895a.641.641 0 0 0 .633.74h3.69a.855.855 0 0 0 .845-.727l.945-6.002z"
        fill="#0079C1"
      />
      <path
        d="M8.077 12.02l.628-3.99c.082-.519.53-.901 1.054-.901h3.766c1.685 0 3.093.016 4.22.226-1.01.298-2.19.82-2.99 1.815-.973 1.21-2.98 1.634-5.54 1.634H8.077z"
        fill="#002269"
        opacity="0.25"
      />
    </g>
  </svg>
);

/**
 * Official PayPal Full Logo (Monogram + Italic Pay/Pal Wordmark)
 */
export const PayPalLogo = ({ height = 22, className = '' }) => (
  <svg
    height={height}
    viewBox="0 0 105 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path
      d="M8.076 23.337H3.47a.641.641 0 0 1-.633-.74L5.944 2.901C6.026 2.382 6.474 2 6.998 2h7.46c2.57 0 4.578.543 5.808 1.57 1.17 0.978 1.636 2.372 1.348 4.027-.512 2.946-2.585 4.606-5.835 4.694h-2.12a.855.855 0 0 0-.845.727l-.92 5.845-.045.244a.64.64 0 0 1-.632.53H8.076z"
      fill="#003087"
    />
    <path
      d="M10.193 20.067l.865-5.49a.855.855 0 0 1 .845-.728h1.666c2.56 0 4.567-.424 5.54-1.634.34-.423.593-.935.753-1.52.28-1.042.185-2.073-.414-2.812-.486-.6-1.238-.98-2.18-1.157-1.127-.21-2.535-.226-4.22-.226H7.877c-.524 0-.972.382-1.054.901L4.08 20.895a.641.641 0 0 0 .633.74h3.69a.855.855 0 0 0 .845-.727l.945-6.002z"
      fill="#0079C1"
    />
    <text
      x="27"
      y="20"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
      fontSize="17"
      fontWeight="900"
      fontStyle="italic"
      fill="#003087"
      letterSpacing="-0.5px"
    >
      Pay<tspan fill="#0079C1">Pal</tspan>
    </text>
  </svg>
);
