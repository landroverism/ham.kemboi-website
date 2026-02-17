import React from 'react';
import './ProfileOrbit.css';

const icons = [
  { id: 'js', path: 'M0 0h24v24H0z', angle: 0 },
  { id: 'python', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z', angle: 60 },
  { id: 'nodejs', path: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z', angle: 120 },
  { id: 'sql', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z', angle: 180 },
  { id: 'linux', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', angle: 240 },
  { id: 'tech', path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z', angle: 300 },
];

const ProfileOrbit: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-16 bg-background">
      <div
        className="relative rounded-lg"
        style={{ width: '300px', height: '300px', backgroundColor: '#1E2A44' }}
      >
        <img
          src="/images/ham-bg.png"
          alt="Profile"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="absolute flex items-center justify-center icon-container"
              style={{
                transform: `rotate(${icon.angle}deg) translate(130px) rotate(-${icon.angle}deg)`,
                top: 'calc(50% - 20px)',
                left: 'calc(50% - 20px)',
              }}
            >
              <div className="icon-shape">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d={icon.path} />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileOrbit;
