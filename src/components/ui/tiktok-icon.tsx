import React from "react";

interface TikTokIconProps {
  size?: number;
  className?: string;
}

const TikTokIcon = ({ size = 24, className = "" }: TikTokIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.6 5.82C15.9165 5.03962 15.5397 4.03743 15.54 3H12.45V16.5C12.4262 17.0179 12.2369 17.5156 11.9059 17.9122C11.5749 18.3088 11.1229 18.5838 10.62 18.69C10.4976 18.7165 10.3739 18.7331 10.25 18.74C9.50172 18.7484 8.78184 18.4596 8.25 17.94C7.6237 17.3265 7.29251 16.4751 7.34607 15.6015C7.39963 14.7279 7.83271 13.9205 8.53 13.39C9.22457 12.8572 10.1101 12.6572 10.97 12.84V9.74C9.74986 9.67732 8.54062 10.0229 7.54 10.72C6.56709 11.3896 5.83375 12.3481 5.44356 13.4539C5.05338 14.5597 5.02562 15.7548 5.36387 16.8761C5.70213 17.9973 6.38988 18.9839 7.33 19.69C8.29618 20.4083 9.48315 20.7869 10.7 20.77C11.0791 20.7703 11.4571 20.7334 11.83 20.66C13.2539 20.3679 14.5121 19.5593 15.3715 18.3958C16.2309 17.2322 16.6348 15.7946 16.51 14.36V9.05C17.72 9.93 19.16 10.47 20.66 10.61V7.51C19.3433 7.47588 18.0603 7.0834 16.95 6.38L16.6 5.82Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TikTokIcon;
