import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Trash2, Smartphone, CheckCircle, XCircle } from 'lucide-react';

export function Compare() {
  const { compareList, removeFromCompare } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <Smartphone className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Nothing to Compare</h1>
        <p className="text-gray-500 mb-8">Add up to 3 phones to compare their specifications side-by-side.</p>
        <Link to="/products" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
          Browse Phones
        </Link>
      </div>
    );
  }

  const specKeys = ['processor', 'ram', 'storage', 'battery', 'camera', 'is5G', 'fastCharging'] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Compare Phones</h1>
          <p className="text-gray-500 mt-1">{compareList.length} of 3 selected</p>
        </div>
        {compareList.length < 3 && (
          <Link to="/products" className="text-blue-600 font-medium hover:underline">Add more +</Link>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <tbody>
            {/* Headers / Images */}
            <tr>
              <th className="w-48 p-6 bg-gray-50 align-bottom border-b">
                <div className="font-bold text-lg text-gray-400">Models</div>
              </th>
              {compareList.map(item => (
                <td key={item.id} className="p-6 border-b relative md:w-[30%]">
                  <button 
                    onClick={() => removeFromCompare(item.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-white shadow-sm rounded-full p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="aspect-[4/3] bg-gray-50 rounded-xl mb-4 p-2 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="text-sm text-blue-600 uppercase font-bold tracking-wider mb-1">{item.brand}</div>
                  <h3 className="font-bold text-xl leading-tight mb-2">{item.name}</h3>
                  <div className="text-2xl font-black mb-4">₹{item.price.toLocaleString('en-IN')}</div>
                  <Link 
                    to={`/product/${item.id}`} 
                    className="block w-full bg-gray-900 text-white text-center py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transition"
                  >
                    View Details
                  </Link>
                </td>
              ))}
              {/* Empty slots placeholders */}
              {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                <td key={idx} className="p-6 border-b text-center align-middle border-l border-dashed bg-gray-50/50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-300">
                    <span className="text-gray-400 text-2xl">+</span>
                  </div>
                  <div className="font-medium text-gray-400">Add phone to compare</div>
                </td>
              ))}
            </tr>

            {/* Specifications */}
            {specKeys.map((key, index) => (
              <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <th className="p-4 pl-6 font-semibold text-gray-600 capitalize text-sm border-r">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </th>
                {compareList.map(item => (
                  <td key={`${item.id}-${key}`} className="p-4 font-medium border-x">
                    {typeof item.specs[key] === 'boolean' ? (
                      item.specs[key] ? <CheckCircle className="text-green-500 w-5 h-5 mx-auto" /> : <XCircle className="text-red-500 w-5 h-5 mx-auto" />
                    ) : (
                      item.specs[key]
                    )}
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="p-4 border-x border-dashed"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
