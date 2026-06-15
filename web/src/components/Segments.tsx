import React, { useEffect } from "react";
import { useParams,useNavigate,Link } from "react-router-dom";
import { useGetSegmentByIdQuery, useGetSegmentTrendQuery, useGetSegmentActivationsQuery } from '../Redux/apiSlice';
import { formatNumber, formatPercent } from '../utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { IoMdArrowRoundBack } from "react-icons/io";

type Props={}
export default function Segments(props:Props){
const {id} = useParams<{id:string}>()
  const navigate = useNavigate();
  
  const { 
    data: segment, 
    isLoading: segmentLoading, 
    error: segmentError 
  } = useGetSegmentByIdQuery(id as string ,{
    skip:!id
  });
  
  const { 
    data: trendData, 
    isLoading: trendLoading 
  } = useGetSegmentTrendQuery(id as string, {
    skip: !id // Skip if no id
  });
  
  const { 
    data: activations, 
    isLoading: activationsLoading 
  } = useGetSegmentActivationsQuery(id as string, {
    skip: !id
  });
  // Handle case when no id is provided
  if (!id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-4">No segment ID provided</p>
          <button 
            onClick={() => navigate('/overview')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  // Loading state
  if (segmentLoading || trendLoading || activationsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p>Loading segment details...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (segmentError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-4">⚠️ Error loading segment</p>
          <p className="text-sm mb-4">Segment with ID "{id}" not found</p>
          <button 
            onClick={() => navigate('/overview')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
   // Not found
  if (!segment) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-center">
          <p className="text-xl mb-4">Segment not found</p>
          <button 
            onClick={() => navigate('/overview')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  

  
    return(
          <div className="p-6 text-white">
  
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/overview')}
          className="btn btn-ghost text-white hover:bg-gray-700 max-sm:hidden "
        >
          ← Back to Overview
        </button>
         <button 
          onClick={() => navigate('/overview')}
          className="btn btn-ghost text-white hover:bg-gray-700 max-sm:flex lg:hidden "
        >
       <IoMdArrowRoundBack color="#fff" size={24} />
        </button>
        <h1 className="text-3xl font-bold">{segment?.data?.name}</h1>
        <div className={`badge ${segment?.data?.status === 'active' ? 'badge-success' :
          segment?.data?.status === 'draft' ? 'badge-warning' : 'badge-error'
        } text-lg px-4 py-2`}>
          {segment?.data?.status}
        </div>
      </div>
      
   
      <div className="grid grid-cols-4 gap-4 mb-6 max-sm:flex max-sm:flex-col ">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Audience Size</p>
          <p className="text-2xl font-bold">{formatNumber(segment?.data?.audienceSize)}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Match Rate</p>
          <p className="text-2xl font-bold">{segment?.data?.matchRate}%</p>
          <div className="w-full h-2 bg-gray-700 rounded-full mt-2">
            <div 
              className="h-full rounded-full bg-green-500"
              style={{ width: `${segment?.data?.matchRate}%` }}
            />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Created By</p>
          <p className="text-xl font-bold">{segment?.data?.createdBy}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(segment?.data?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Last Updated</p>
          <p className="text-xl font-bold">
            {new Date(segment?.data?.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* Tags and Sources */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {segment?.data?.tags?.map((tag :any, i:any) => (
              <div key={i} className="badge badge-info">{tag}</div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Data Sources</h3>
          <div className="flex flex-wrap gap-2">
            {segment?.data?.dataSourceIds?.map((source :any, i:any) => (
              <div key={i} className="badge badge-ghost">{source}</div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trend Chart */}
      {trendData?.data && trendData?.data.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData?.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
              <YAxis tickFormatter={formatNumber} tick={{ fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                formatter={(value: any) => [formatNumber(value), "matchedProfiles"]}
              />
              <Line
                type="monotone"
                dataKey="matchedProfiles"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Activations Table */}
      {activations?.data && activations?.data?.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Activations</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left" >Seg Id</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">createdAt</th>
                  <th className="p-3 text-left">lastSyncAt</th>
                    <th className=" p-3 text-left ">syncedProfiles</th>
                    <th className=" p-3 text-left ">Destination</th>
                </tr>
              </thead>
              <tbody>
                {activations?.data.map((activation: any, i: number) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="p-3">{activation?.destination?.name}</td>
                    <td className="p-3">{activation?.segmentId}</td>
                    <td className="p-3">
                      <span className={`badge ${activation.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                        {activation.status}
                      </span>
                    </td>
                    <td className="p-3">{new Date(activation.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(activation.lastSyncAt).toLocaleDateString()}</td>
                    <td className="p-3">{formatNumber(activation?.syncedProfiles)}</td>
                    <td style={{backgroundColor:activation?.destination?.color}} className={` bg-[${activation?.destination?.color}] `}  > {activation?.destination.name} <span>{activation?.destination?.id} </span> </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    )
}