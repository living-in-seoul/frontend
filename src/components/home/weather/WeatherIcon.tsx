'use client';
const WeatherIcon = ({ icon }: { icon: string }) => {
  const iconConfig: IconConfigType = {
    ClearDay: { x: 0, y: 0 },
    ClearNight: { x: 55, y: 0 },
    Cloudy: { x: 110, y: 0 },
    Snowing: { x: 165, y: 0 },
    Raining: { x: 220, y: 0 },
    Thunder: { x: 0, y: 65 },
    Windy: { x: 55, y: 65 },
    PartlyCloudyDay: { x: 110, y: 65 },
    PartlyCloudyNight: { x: 165, y: 65 },
    Shower: { x: 0, y: 65 },
  };

  const { x, y } = iconConfig[icon as IconType] || { x: 0, y: 0 };

  return (
    <div
      className="w-10 h-10 bg-no-repeat"
      style={{
        backgroundSize: '650%',
        backgroundImage: 'url(/weather.png)',
        backgroundPosition: `-${x}px -${y}px`,
      }}
      // alt={icon}
    ></div>
  );
};
export default WeatherIcon;
