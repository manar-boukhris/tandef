export function ServiceHeroArt({ type }: { type: 'livingroom' | 'office' | 'kitchen' | 'moving' }) {
    if (type === 'livingroom') {
      return (
        <svg viewBox="0 0 500 360" className="w-full h-full">
          <rect width="500" height="360" fill="#F3EEFC" />
          <rect x="40" y="40" width="420" height="6" fill="#E4D9F7" />
          <circle cx="440" cy="70" r="26" fill="#FBEBC4" />
          <rect x="60" y="180" width="220" height="90" rx="16" fill="#B7A2E6" />
          <rect x="60" y="170" width="220" height="24" rx="12" fill="#8B6FD1" />
          <circle cx="330" cy="230" r="34" fill="#D9CDF3" />
          <rect x="300" y="255" width="60" height="14" rx="7" fill="#8B6FD1" />
          <rect x="150" y="290" width="120" height="10" rx="5" fill="#C9BCEB" />
          <rect x="380" y="140" width="14" height="150" fill="#7C9A6E" />
          <ellipse cx="387" cy="130" rx="40" ry="30" fill="#8FB37F" />
          <ellipse cx="360" cy="110" rx="26" ry="20" fill="#9DC28C" />
          <rect x="30" y="120" width="10" height="140" fill="#D9CDF3" />
          <rect x="440" y="120" width="10" height="140" fill="#D9CDF3" />
        </svg>
      );
    }
    if (type === 'office') {
      return (
        <svg viewBox="0 0 500 360" className="w-full h-full">
          <rect width="500" height="360" fill="#F3EEFC" />
          <rect x="60" y="200" width="380" height="14" fill="#8B6FD1" />
          <rect x="80" y="130" width="60" height="70" fill="#B7A2E6" />
          <rect x="160" y="130" width="60" height="70" fill="#B7A2E6" />
          <rect x="240" y="130" width="60" height="70" fill="#B7A2E6" />
          <rect x="320" y="130" width="60" height="70" fill="#B7A2E6" />
          <rect x="90" y="110" width="40" height="24" rx="3" fill="#5B21B6" />
          <rect x="170" y="110" width="40" height="24" rx="3" fill="#5B21B6" />
          <rect x="250" y="110" width="40" height="24" rx="3" fill="#5B21B6" />
          <rect x="330" y="110" width="40" height="24" rx="3" fill="#5B21B6" />
          <rect x="70" y="220" width="80" height="60" rx="6" fill="#D9CDF3" />
          <rect x="170" y="220" width="80" height="60" rx="6" fill="#D9CDF3" />
          <rect x="270" y="220" width="80" height="60" rx="6" fill="#D9CDF3" />
          <rect x="370" y="220" width="60" height="60" rx="6" fill="#D9CDF3" />
          <circle cx="440" cy="80" r="22" fill="#8FB37F" />
        </svg>
      );
    }
    if (type === 'kitchen') {
      return (
        <svg viewBox="0 0 500 360" className="w-full h-full">
          <rect width="500" height="360" fill="#F3EEFC" />
          <rect x="40" y="180" width="420" height="120" fill="#fff" stroke="#D9CDF3" strokeWidth="3" />
          <rect x="40" y="180" width="140" height="120" fill="#EDE7F9" />
          <rect x="60" y="200" width="100" height="40" rx="4" fill="#B7A2E6" />
          <circle cx="90" cy="260" r="16" fill="#8B6FD1" />
          <circle cx="130" cy="260" r="16" fill="#8B6FD1" />
          <rect x="220" y="150" width="90" height="60" rx="4" fill="#8FB37F" />
          <rect x="330" y="180" width="120" height="70" rx="6" fill="#D9CDF3" />
          <rect x="340" y="190" width="45" height="50" fill="#fff" />
          <rect x="395" y="190" width="45" height="50" fill="#fff" />
          <rect x="40" y="90" width="420" height="14" fill="#8B6FD1" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 500 360" className="w-full h-full">
        <rect width="500" height="360" fill="#F3EEFC" />
        <rect x="60" y="300" width="380" height="10" fill="#D9CDF3" />
        <rect x="100" y="200" width="90" height="90" rx="4" fill="#D6B98C" />
        <rect x="100" y="200" width="90" height="14" fill="#B7935A" />
        <rect x="210" y="230" width="70" height="60" rx="4" fill="#E3C9A0" />
        <rect x="210" y="230" width="70" height="10" fill="#C4A46E" />
        <rect x="300" y="180" width="100" height="110" rx="4" fill="#D6B98C" />
        <rect x="300" y="180" width="100" height="14" fill="#B7935A" />
        <circle cx="420" cy="90" r="24" fill="#8FB37F" />
        <ellipse cx="420" cy="130" rx="10" ry="40" fill="#7C9A6E" />
      </svg>
    );
  }