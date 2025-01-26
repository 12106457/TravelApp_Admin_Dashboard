"use client"
import Spinner from '@/app/ui/utility/spinner';
import { camelCaseToTitle } from '@/app/ui/utility/textToCamelConverter';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
  const [enumData, setEnumData] = useState<any>({}); // Store data as an object
  const [loading, setLoading] = useState(false);
  const route=useRouter();

  const currentpath=usePathname();
  const updatedCurrentPath = currentpath
    .split("/") 
    .filter(Boolean) 
    .map((segment) => camelCaseToTitle(segment)) 
    .join(" / "); 
  

  useEffect(() => {
    const storedData = localStorage.getItem('masterData');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log('Parsed Data:', parsedData);
        setEnumData(parsedData); // Store the entire parsed object
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }

    setLoading(false); // Stop loading once data is fetched
  }, []);

  return (
    <div className="w-full h-screen p-4 bg-gray-100">
       {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                  <Spinner loading={loading} />
                </div>
              )}
      <div className="w-full h-14 mb-4 flex justify-start items-center">
        <div className="text-2xl font-bold">
          {updatedCurrentPath}
        </div>
        
      </div>

      <div className="space-y-3">
        {Object.keys(enumData).length > 0 ? (
          Object.keys(enumData).map((categoryKey) => (
            <div key={categoryKey} className="bg-white shadow-lg rounded-lg p-3 transform hover:scale-[1.01] transition-transform duration-200 ease-in-out"
            onClick={()=>route.push(`/dashboard/enum_data/${categoryKey}`)}
            >
              {/* Category Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">{categoryKey.toUpperCase()}</h3>
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/545/545682.png"
                    alt={`Icon`}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}

export default Page;
