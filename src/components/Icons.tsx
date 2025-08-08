import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const HomeIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#F43F3F',
}) => (
  <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
    <G clipPath="url(#clip0_1_258)">
      <Path
        d="M15.4 21.5V13.5C15.4 13.2348 15.2946 12.9804 15.1071 12.7929C14.9196 12.6054 14.6652 12.5 14.4 12.5H10.4C10.1348 12.5 9.88042 12.6054 9.69289 12.7929C9.50535 12.9804 9.39999 13.2348 9.39999 13.5V21.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.39999 10.5C3.39992 10.209 3.46333 9.92159 3.58578 9.65768C3.70824 9.39378 3.88679 9.15976 4.10899 8.97197L11.109 2.97297C11.47 2.66788 11.9274 2.50049 12.4 2.50049C12.8726 2.50049 13.33 2.66788 13.691 2.97297L20.691 8.97197C20.9132 9.15976 21.0918 9.39378 21.2142 9.65768C21.3367 9.92159 21.4001 10.209 21.4 10.5V19.5C21.4 20.0304 21.1893 20.5391 20.8142 20.9142C20.4391 21.2893 19.9304 21.5 19.4 21.5H5.39999C4.86956 21.5 4.36085 21.2893 3.98578 20.9142C3.61071 20.5391 3.39999 20.0304 3.39999 19.5V10.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1_258">
        <Rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0.399994 0.5)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#AFAFAF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
    <Path
      d="M21.2 21.5L16.86 17.16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.2 19.5C15.6183 19.5 19.2 15.9183 19.2 11.5C19.2 7.08172 15.6183 3.5 11.2 3.5C6.7817 3.5 3.19998 7.08172 3.19998 11.5C3.19998 15.9183 6.7817 19.5 11.2 19.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CreateIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#AFAFAF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
    <Path
      d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 12.5H16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 8.5V16.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MessagesIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#AFAFAF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
    <Path
      d="M8.70002 20.5C10.6086 21.4791 12.8041 21.7443 14.8909 21.2478C16.9777 20.7514 18.8186 19.5259 20.0818 17.7922C21.345 16.0586 21.9474 13.9308 21.7806 11.7922C21.6138 9.65366 20.6886 7.64502 19.1718 6.12824C17.655 4.61146 15.6464 3.6863 13.5079 3.51946C11.3693 3.35263 9.24149 3.95509 7.50784 5.21829C5.77419 6.48149 4.54871 8.32236 4.05224 10.4092C3.55577 12.496 3.82096 14.6915 4.80002 16.6L2.80002 22.5L8.70002 20.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#AFAFAF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
    <Path
      d="M12.6 13.5C15.3614 13.5 17.6 11.2614 17.6 8.5C17.6 5.73858 15.3614 3.5 12.6 3.5C9.83858 3.5 7.60001 5.73858 7.60001 8.5C7.60001 11.2614 9.83858 13.5 12.6 13.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.6 21.5C20.6 19.3783 19.7572 17.3434 18.2569 15.8431C16.7566 14.3429 14.7217 13.5 12.6 13.5C10.4783 13.5 8.44344 14.3429 6.94315 15.8431C5.44286 17.3434 4.60001 19.3783 4.60001 21.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SendIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#FFFFFF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="m5 12 7-7 7 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 19V5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HeartIcon: React.FC<IconProps> = ({
  width = 12,
  height = 12,
  color = '#EBEBEB',
}) => (
  <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
    <Path
      d="M1 3.5C1 2.11929 2.11929 1 3.5 1C4.88071 1 6 2.11929 6 3.5C6 2.11929 7.11929 1 8.5 1C9.88071 1 11 2.11929 11 3.5C11 5.5 6 10 6 10S1 5.5 1 3.5Z"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChatIcon: React.FC<IconProps> = ({
  width = 12,
  height = 12,
  color = '#EBEBEB',
}) => (
  <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
    <Path
      d="M1 4.5C1 3.11929 2.11929 2 3.5 2H8.5C9.88071 2 11 3.11929 11 4.5V7.5C11 8.88071 9.88071 10 8.5 10H5L1 11V4.5Z"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PhoneIcon: React.FC<IconProps> = ({
  width = 16,
  height = 16,
  color = '#E2E9ED',
}) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0_1_236)">
      <Path
        d="M9.22133 11.0453C9.35901 11.1085 9.51413 11.1229 9.66112 11.0862C9.80812 11.0495 9.93822 10.9638 10.03 10.8433L10.2667 10.5333C10.3909 10.3677 10.5519 10.2333 10.737 10.1407C10.9222 10.0481 11.1263 9.99992 11.3333 9.99992H13.3333C13.6869 9.99992 14.0261 10.1404 14.2761 10.3904C14.5262 10.6405 14.6667 10.9796 14.6667 11.3333V13.3333C14.6667 13.6869 14.5262 14.026 14.2761 14.2761C14.0261 14.5261 13.6869 14.6666 13.3333 14.6666C10.1507 14.6666 7.09848 13.4023 4.84805 11.1519C2.59761 8.90143 1.33333 5.84918 1.33333 2.66659C1.33333 2.31296 1.4738 1.97382 1.72385 1.72378C1.9739 1.47373 2.31304 1.33325 2.66666 1.33325H4.66666C5.02028 1.33325 5.35942 1.47373 5.60947 1.72378C5.85952 1.97382 5.99999 2.31296 5.99999 2.66659V4.66659C5.99999 4.87358 5.9518 5.07773 5.85923 5.26287C5.76666 5.44801 5.63226 5.60906 5.46666 5.73325L5.15466 5.96725C5.03227 6.0607 4.94601 6.19364 4.91052 6.34349C4.87504 6.49333 4.89252 6.65084 4.95999 6.78925C5.87112 8.63983 7.36961 10.1364 9.22133 11.0453Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1_236">
        <Rect width="16" height="16" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const MenuIcon: React.FC<IconProps> = ({
  width = 18,
  height = 18,
  color = '#E2E9ED',
}) => (
  <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
    <Path
      d="M2.25 9H15.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.25 13.5H15.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.25 4.5H15.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SwipeUpIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#FFFFFF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 11L12 6L7 11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 18L12 13L7 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  width = 18,
  height = 18,
  color = '#FFFFFF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
    <Path
      d="M13.5 4.5L4.5 13.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.5 4.5L13.5 13.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
