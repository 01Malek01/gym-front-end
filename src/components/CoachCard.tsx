type Props = {
  imgSrc: string;
  name: string;
  specialty: string;
};

export default function CoachCard({ imgSrc, name, specialty }: Props) {
  return (
    <div className="coach-card flex flex-col items-center gap-4 rounded-lg shadow-lg bg-gray-800 p-6 transform transition duration-300 hover:scale-105 hover:bg-gray-700">
      <div className="coach-image w-full h-48 rounded-lg overflow-hidden shadow-md">
        <img className="w-full h-full object-cover" src={imgSrc} alt={name} />
      </div>

      <div className="coach-info text-center">
        <div className="coach-name text-2xl font-semibold text-white">
          {name}
        </div>
        <div className="coach-specialty text-lg text-orange-400">
          {specialty}
        </div>
      </div>
    </div>
  );
}
