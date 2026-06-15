// import React, { Component, useState, useMemo, useEffect } from 'react'
// import { GiMeepleCircle } from "react-icons/gi";
// import { PiChartBarBold } from "react-icons/pi";
// import { VscVmActive } from "react-icons/vsc";
// import { FaChartLine } from "react-icons/fa6";
// import { IoCheckmarkDoneSharp } from "react-icons/io5";
// import { SiActiveloop } from "react-icons/si";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Cell, Legend } from 'recharts';
// import { formatNumber, formatPercent } from '../utils/formatters'
// import {
//     useReactTable,
//     getCoreRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     getFilteredRowModel,
//     flexRender,
// } from '@tanstack/react-table';
// import type { ColumnDef } from '@tanstack/react-table';
// import type { SortingState } from '@tanstack/react-table';
// import type { ColumnFiltersState } from '@tanstack/react-table';
// import { useGetOverViewQuery } from "../Redux/apiSlice";
// import {useGetSegmentsQuery } from "../Redux/apiSlice"
// import type {Segment} from "../Redux/apiSlice";
// import { debounce } from 'lodash';

// type Props = {}

// type State = {}

// interface InfoCards {
//     id: number,
//     icon: React.ReactNode,
//     title: String,
//     amount: number
// }
// // interface LineChartThirtyDay {
// //     day: String,
// //     value: number,
// //     label: String

// // }

// // interface PiestatusData {
// //     name: String,
// //     value: number,
// //     color: String
// // }

// // interface Segment {
// //     id: number;
// //     name: string;
// //     size: string;
// //     matchRate: number;
// //     sources: string[];
// //     status: 'Active' | 'Draft' | 'Inactive';
// //     destinations: string[];
// //     lastUpdated: string;
// // }


// export default function Overview(props: Props) {
//     const [sorting, setSorting] = useState<SortingState>([]);
//     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//     const [globalFilter, setGlobalFilter] = useState<string>('');
//     const { data: overviewData, isLoading, error } = useGetOverViewQuery();
 
//     useEffect(() => {
//         if (overviewData) {
//             console.log('Overview data:', overviewData);
//             // You can also update other state here if needed
//         }
//     }, [overviewData]);

//     const KPIs = overviewData?.kpis;
//     const profilesTrend = overviewData?.profilesTrend;
  
    
//     const InfoCards: InfoCards[] = [
//         {
//             id: 1,
//             icon: <GiMeepleCircle size={40} color='#fff' />,
//             title: "Total Profiles",
//             amount: formatNumber(KPIs?.totalProfiles)
//         },
//         {
//             id: 2,
//             icon: <PiChartBarBold size={40} color='#fff' />,
//             title: "Segments",
//             amount: KPIs?.totalSegments
//         },
//         {
//             id: 3,
//             icon: <VscVmActive size={40} color='#fff' />,
//             title: "Active Segments",
//             amount: KPIs?.activeSegments
//         },
//         {
//             id: 4,
//             icon: <FaChartLine size={40} color='#fff' />,
//             title: "Avg Match Rate",
//             amount: formatPercent(KPIs?.avgMatchRate)
//         },
//         {
//             id: 5,
//             icon: <IoCheckmarkDoneSharp size={40} color='#fff' />,
//             title: "Identities Resolved",
//             amount: formatNumber(KPIs?.identitiesResolved)
//         },
//         {
//             id: 6,
//             icon: <SiActiveloop size={40} color='#fff' />,
//             title: "Activations",
//             amount: KPIs?.totalActivations
//         }

//     ]

//     // const LineChartThirtyDay: LineChartThirtyDay[] = [
//     //     { day: '1', value: 12400, label: 'May 1' },
//     //     { day: '3', value: 13800, label: 'May 3' },
//     //     { day: '5', value: 15200, label: 'May 5' },
//     //     { day: '7', value: 14900, label: 'May 7' },
//     //     { day: '9', value: 17100, label: 'May 9' },
//     //     { day: '11', value: 18900, label: 'May 11' },
//     //     { day: '13', value: 20300, label: 'May 13' },
//     //     { day: '15', value: 19800, label: 'May 15' },
//     //     { day: '17', value: 22100, label: 'May 17' },
//     //     { day: '19', value: 24500, label: 'May 19' },
//     //     { day: '21', value: 23800, label: 'May 21' },
//     //     { day: '23', value: 26700, label: 'May 23' },
//     //     { day: '25', value: 28900, label: 'May 25' },
//     //     { day: '27', value: 31200, label: 'May 27' },
//     //     { day: '30', value: 34100, label: 'May 30' },
//     // ]

//     // const PiestatusData: PiestatusData[] = [
//     //     { name: 'Active', value: 67, color: '#22c55e' },
//     //     { name: 'Draft', value: 45, color: '#eab308' },
//     //     { name: 'Inactive', value: 72, color: '#ef4444' },
//     // ];

//     const PiestatusData = overviewData?.segmentsByStatus 
//     ? [
//         { name: 'Active', value: overviewData.segmentsByStatus.active, color: '#22c55e' },
//         { name: 'Draft', value: overviewData.segmentsByStatus.draft, color: '#eab308' },
//         { name: 'Archived', value: overviewData.segmentsByStatus.archived, color: '#ef4444' }
//     ]
//     : [];

//     const data: Segment[] = [
//         { id: 1, name: "Tech Enthusiasts", size: "2.4M", matchRate: 87, sources: ["Website", "CRM"], status: "Active", destinations: ["Google", "Meta"], lastUpdated: "2025-06-12" },
//         { id: 2, name: "High Value Customers", size: "845K", matchRate: 94, sources: ["Shopify"], status: "Draft", destinations: ["DV360"], lastUpdated: "2025-06-10" },
//         { id: 3, name: "Sports Fans", size: "1.8M", matchRate: 65, sources: ["App", "Website"], status: "Active", destinations: ["Google", "TikTok"], lastUpdated: "2025-06-11" },
//         { id: 4, name: "New Users", size: "320K", matchRate: 42, sources: ["Website"], status: "Inactive", destinations: [], lastUpdated: "2025-06-08" },
//         { id: 5, name: "Luxury Buyers", size: "680K", matchRate: 91, sources: ["CRM", "Email"], status: "Active", destinations: ["Meta", "Google"], lastUpdated: "2025-06-13" },
//     ];
//     const columns = useMemo<ColumnDef<Segment>[]>(() => [
//         {
//             accessorKey: "name",
//             header: "Segment Name",
//             cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
//         },
//         {
//             accessorKey: "size",
//             header: "Audience Size",
//             cell: ({ row }) => <div>{row.original.size}</div>,
//         },
//         {
//             accessorKey: "matchRate",
//             header: "Match Rate",
//             cell: ({ row }) => (
//                 <div className="flex items-center gap-3">
//                     <div className="w-24 h-2 bg-base-300 rounded-full overflow-hidden">
//                         <div
//                             className={`h-full rounded-full ${row.original.matchRate >= 80 ? 'bg-success' :
//                                 row.original.matchRate >= 60 ? 'bg-warning' : 'bg-error'
//                                 }`}
//                             style={{ width: `${row.original.matchRate}%` }}
//                         />
//                     </div>
//                     <span className="font-semibold">{row.original.matchRate}%</span>
//                 </div>
//             ),
//         },
//         {
//             accessorKey: "sources",
//             header: "Sources",
//             cell: ({ row }) => (
//                 <div className="flex flex-wrap gap-1">
//                     {row.original.sources.map((s, i) => (
//                         <div key={i} className="badge badge-sm badge-ghost">{s}</div>
//                     ))}
//                 </div>
//             ),
//         },
//         {
//             accessorKey: "status",
//             header: "Status",
//             cell: ({ row }) => (
//                 <div className={`badge ${row.original.status === 'Active' ? 'badge-success' :
//                     row.original.status === 'Draft' ? 'badge-warning' : 'badge-error'
//                     }`}>
//                     {row.original.status}
//                 </div>
//             ),
//         },
//         {
//             accessorKey: "destinations",
//             header: "Destinations",
//             cell: ({ row }) => (
//                 <div className="flex flex-wrap gap-1">
//                     {row.original.destinations.map((d, i) => (
//                         <div key={i} className="badge badge-sm badge-info">{d}</div>
//                     ))}
//                 </div>
//             ),
//         },
//     ], []);
//     const table = useReactTable({
//         data,
//         columns,
//         state: {
//             sorting,
//             columnFilters,
//             globalFilter,
//         },
//         onSortingChange: setSorting,
//         onColumnFiltersChange: setColumnFilters,
//         onGlobalFilterChange: setGlobalFilter,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//     });
//     console.log(overviewData);
//     if (isLoading) return <p>Loading...</p>;
//     if (error) return <p>Error occurred</p>;
//     return (
//         <div className=' flex flex-col w-full gap-4 px-[1.5rem] py-3  ' >
//             <section>
//                 <h1 className=' text-white text-[40px] ' >Overview</h1>
//             </section>
//             {/* //cards */}
//             <section className=' w-full h-[10rem] flex flex-row justify-between gap-3 ' >
//                 {InfoCards.map((item, index) => {
//                     return (
//                         <div key={item.id} className=' w-[11.5rem] h-full border border-white rounded-md flex flex-col py-3 gap-2 place-items-center ' >
//                             {item.icon}
//                             <h1 className=' text-white text-xl  ' >{item.title} </h1>
//                             <span className=' text-white text-xl ' >{item.amount}</span>
//                         </div>
//                     )
//                 })}
//             </section>
//             {/* //charts */}
//             <section className=' w-full h-[20rem] flex flex-row justify-between gap-3 place-content-center place-items-center ' >
//                 {/* line chart */}
//                 <div className=' border w-[50%] h-full rounded-md border-white py-5 px-2 ' >
//                     <h1 className=' ml-3 text-white text-lg  ' >30-Day Trends</h1>
//                     <ResponsiveContainer width="100%" className="h-fit" >
//                         <LineChart data={profilesTrend}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="profiles" tickFormatter={formatNumber} tick={{ fill: '#9CA3AF' }} />
//                             {/* <YAxis type="category" dataKey="date" width={100} /> */}
//                             {/* <Tooltip formatter={(profiles: any) => [
//                                 formatNumber(profiles ?? 0),
//                                 "Profiles"
//                             ]} /> */}
//                             <Tooltip
//                                 formatter={(value: any) => [
//                                     formatNumber(value ?? 0),
//                                     "Profiles"
//                                 ]}
//                             />
//                             <Line
//                                 type="monotone"
//                                 dataKey="profiles"
//                                 stroke="#6366f1"
//                                 strokeWidth={3}
//                                 dot={{ r: 5, fill: "#6366f1" }}
//                                 activeDot={{ r: 7 }}
//                             />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//                 {/* pie chartt */}
//                 <div className=' border w-[50%] h-full rounded-md border-white ' >
//                     <h1 className=' ml-3 text-white text-lg  ' >Segments by Status</h1>
//                     {/* <ResponsiveContainer width="100%" height={300}>
//                         <PieChart>
//                             <Pie
//                                 data={segmentsByStatus}
//                                 cx="50%"
//                                 cy="50%"
//                                 innerRadius={60}
//                                 outerRadius={100}
//                                 dataKey="value"
//                                 label
//                             >
//                                 {segmentsByStatus.map((item, index) => (
//                                     <Cell key={`cell-${index}`} fill={item.color} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                             <Legend />
//                         </PieChart>
//                     </ResponsiveContainer> */}
//                      <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//             <Pie
//                 data={PiestatusData}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={100}
//                 dataKey="value"
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//             >
//                 {PiestatusData.map((item, index) => (
//                     <Cell key={`cell-${index}`} fill={item.color} />
//                 ))}
//             </Pie>
//             <Tooltip 
//                 formatter={(value: any) => [`${value} segments`, "Count"]}
//                 labelFormatter={(label) => `Status: ${label}`}
//             />
//             <Legend />
//         </PieChart>
//     </ResponsiveContainer>
//                 </div>

//             </section>

//             {/* //table part  */}
//             <div className="w-full space-y-4">
//                 <input
//                     type="text"
//                     placeholder="Search segments by name..."
//                     value={globalFilter}
//                     onChange={(e) => setGlobalFilter(e.target.value)}
//                     className="input input-bordered w-full max-w-md"
//                 />

//                 <div className="overflow-x-auto rounded-box shadow bg-base-100">
//                     <table className="table table-zebra w-full">
//                         <thead>
//                             {table.getHeaderGroups().map(headerGroup => (
//                                 <tr key={headerGroup.id}>
//                                     {headerGroup.headers.map(header => (
//                                         <th
//                                             key={header.id}
//                                             className="cursor-pointer hover:bg-base-200"
//                                             onClick={header.column.getToggleSortingHandler()}
//                                         >
//                                             {flexRender(header.column.columnDef.header, header.getContext())}
//                                             {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </thead>
//                         <tbody>
//                             {table.getRowModel().rows.length ? (
//                                 table.getRowModel().rows.map(row => (
//                                     <tr key={row.id} className="hover">
//                                         {row.getVisibleCells().map(cell => (
//                                             <td key={cell.id}>
//                                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                             </td>
//                                         ))}
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={6} className="text-center py-10 text-base-content/60">
//                                         No matching segments found
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex items-center justify-between text-sm">
//                     <div>
//                         Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
//                         {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getRowCount())}
//                         {' '}of {table.getRowCount()} segments
//                     </div>

//                     <div className="join">
//                         <button className="join-item btn btn-lg hover:cursor-pointer text-white " onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//                             «
//                         </button>
//                         <button className="join-item btn btn-sm btn-active">
//                             Page {table.getState().pagination.pageIndex + 1}
//                         </button>
//                         <button className="join-item btn btn-lg hover:cursor-pointer text-white " onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//                             »
//                         </button>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { GiMeepleCircle } from "react-icons/gi";
import { PiChartBarBold } from "react-icons/pi";
import { VscVmActive } from "react-icons/vsc";
import { FaChartLine } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { SiActiveloop } from "react-icons/si";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { formatNumber, formatPercent } from '../utils/formatters'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { useGetOverViewQuery, useGetSegmentsQuery, type Segment } from "../Redux/apiSlice";
import { debounce } from 'lodash';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, Links } from 'react-router-dom';

type Props = {}

interface InfoCards {
    id: number,
    icon: React.ReactNode,
    title: String,
    amount: any
}

export default function Overview(props: Props) {
    // Server-side state
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [tagFilter, setTagFilter] = useState<string>('all');
    const [sourceFilter, setSourceFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('updatedAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    
    // Debounced search
    const [debouncedSearch, setDebouncedSearch] = useState('');
    
    const debouncedSetSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearch(value);
            setPage(1);
        }, 500),
        []
    );
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSetSearch(value);
    };
    
    // Fetch segments with server-side params
    const { 
        data: segmentsData, 
        isLoading: segmentsLoading, 
        error: segmentsError,
        refetch: refetchSegments
    } = useGetSegmentsQuery({
        page,
        limit: pageSize,
        search: debouncedSearch,
        status: statusFilter === 'all' ? undefined : statusFilter,
        sortBy,
        sortOrder,
    });
    
    // Fetch overview data
    const { data: overviewData, isLoading, error } = useGetOverViewQuery();
    
    useEffect(() => {
        if (overviewData) {
            console.log('Overview data:', overviewData);
        }
    }, [overviewData]);
    
    // Extract data
    const KPIs = overviewData?.kpis;
    const profilesTrend = overviewData?.profilesTrend;
    const segments = segmentsData?.data || [];
    const pagination = segmentsData?.pagination;
    
    // Get unique tags and sources for filters (from API data)
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        segments.forEach(segment => {
            segment.tags?.forEach(tag => tags.add(tag));
        });
        return ['all', ...Array.from(tags)];
    }, [segments]);
    
    const allSources = useMemo(() => {
        const sources = new Set<string>();
        segments.forEach(segment => {
            segment.dataSourceIds?.forEach(source => sources.add(source));
        });
        return ['all', ...Array.from(sources)];
    }, [segments]);
    
    // Info cards
    const InfoCards: InfoCards[] = [
        {
            id: 1,
            icon: <GiMeepleCircle size={40} color='#fff' />,
            title: "Total Profiles",
            amount: formatNumber(KPIs?.totalProfiles)
        },
        {
            id: 2,
            icon: <PiChartBarBold size={40} color='#fff' />,
            title: "Segments",
            amount: KPIs?.totalSegments
        },
        {
            id: 3,
            icon: <VscVmActive size={40} color='#fff' />,
            title: "Active Segments",
            amount: KPIs?.activeSegments
        },
        {
            id: 4,
            icon: <FaChartLine size={40} color='#fff' />,
            title: "Avg Match Rate",
            amount: formatPercent(KPIs?.avgMatchRate)
        },
        {
            id: 5,
            icon: <IoCheckmarkDoneSharp size={40} color='#fff' />,
            title: "Identities Resolved",
            amount: formatNumber(KPIs?.identitiesResolved)
        },
        {
            id: 6,
            icon: <SiActiveloop size={40} color='#fff' />,
            title: "Activations",
            amount: KPIs?.totalActivations
        }
    ];
    
    // Pie chart data
    const PiestatusData = overviewData?.segmentsByStatus 
        ? [
            { name: 'Active', value: overviewData.segmentsByStatus.active, color: '#22c55e' },
            { name: 'Draft', value: overviewData.segmentsByStatus.draft, color: '#eab308' },
            { name: 'Archived', value: overviewData.segmentsByStatus.archived, color: '#ef4444' }
        ]
        : [];
    
    // Table columns
    const columns = useMemo<ColumnDef<Segment>[]>(() => [
        {
            accessorKey: "name",
            header: "Segment Name",
            cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
        },
        {
            accessorKey: "audienceSize",
            header: "Audience Size",
            cell: ({ row }) => <div>{formatNumber(row.original.audienceSize)}</div>,
        },
        {
            accessorKey: "matchRate",
            header: "Match Rate",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-base-300 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${row.original.matchRate >= 80 ? 'bg-success' :
                                row.original.matchRate >= 60 ? 'bg-warning' : 'bg-error'
                            }`}
                            style={{ width: `${row.original.matchRate}%` }}
                        />
                    </div>
                    <span className="font-semibold">{row.original.matchRate}%</span>
                </div>
            ),
        },
        {
            accessorKey: "dataSourceIds",
            header: "Sources",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.dataSourceIds?.slice(0, 2).map((s, i) => (
                        <div key={i} className="badge badge-sm badge-ghost">{s}</div>
                    ))}
                    {row.original.dataSourceIds && row.original.dataSourceIds.length > 2 && (
                        <div className="badge badge-sm">+{row.original.dataSourceIds.length - 2}</div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className={`badge ${row.original.status === 'Active' ? 'badge-success' :
                    row.original.status === 'Draft' ? 'badge-warning' : 'badge-error'
                }`}>
                    {row.original.status}
                </div>
            ),
        },
        {
            accessorKey: "tags",
            header: "Tags",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.tags?.slice(0, 2).map((tag, i) => (
                        <div key={i} className="badge badge-sm badge-info">{tag}</div>
                    ))}
                    {row.original.tags && row.original.tags.length > 2 && (
                        <div className="badge badge-sm">+{row.original.tags.length - 2}</div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "updatedAt",
            header: "Last Updated",
            cell: ({ row }) => <div>{new Date(row.original.updatedAt).toLocaleDateString()}</div>,
        },
    ], []);
    
    // Handle sorting
    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
        setPage(1);
    };
    
    // Loading state
    if (isLoading || segmentsLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p>Loading overview data...</p>
                </div>
            </div>
        );
    }
    
    // Error state
    if (error || segmentsError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-center">
                    <p className="text-xl mb-4">⚠️ Error loading data</p>
                    <p className="text-sm mb-4">{JSON.stringify(error || segmentsError)}</p>
                    <button 
                        onClick={() => {
                            refetchSegments();
                        }} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className='flex flex-col w-full gap-4 px-[1.5rem] py-3'>
            <section>
                <h1 className='text-white text-[40px] font-bold'>Overview</h1>
            </section>
            
            {/* Cards */}
            <section className='w-full grid grid-cols-6 gap-3 max-sm:flex max-sm:flex-col '>
                {InfoCards.map((item) => (
                    <div key={item.id} className='border border-white rounded-md flex flex-col py-3 gap-2 items-center hover:bg-white/5 transition-colors'>
                        {item.icon}
                        <h1 className='text-white text-sm font-medium'>{item.title}</h1>
                        <span className='text-white text-2xl font-bold'>{item.amount}</span>
                    </div>
                ))}
            </section>
            
            {/* Charts */}
            <section className='w-full h-[20rem] max-sm:h-[50rem] flex flex-row justify-between gap-3 max-sm:flex-col '>
                {/* Line chart */}
                <div className='border w-[50%] max-sm:w-full h-full rounded-md border-white py-5 px-2 bg-gray-900/50'>
                    <h1 className='ml-3 text-white text-lg font-semibold mb-2'>30-Day Trends</h1>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={profilesTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
                            <YAxis tickFormatter={formatNumber} tick={{ fill: '#9CA3AF' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                                formatter={(value: any) => [
                                    formatNumber(value ?? 0),
                                    "Profiles"
                                ]}
                                labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Line
                                type="monotone"
                                dataKey="profiles"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={{ r: 5, fill: "#6366f1" }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Pie chart */}
                <div className='border w-[50%] max-sm:w-full h-full rounded-md border-white p-5 bg-gray-900/50'>
                    <h1 className='ml-3 text-white text-lg font-semibold mb-2'>Segments by Status</h1>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={PiestatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {PiestatusData.map((item, index) => (
                                    <Cell key={`cell-${index}`} fill={item.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                                formatter={(value: any) => [`${value} segments`, "Count"]}
                                labelFormatter={(label) => `Status: ${label}`}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </section>
            
            {/* Table Server-side control */}
            <div className="w-full space-y-4">
     
                <div className="flex gap-4 items-center flex-wrap">
                    <input
                        type="text"
                        placeholder="Search segments by name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="input input-bordered w-full max-w-md bg-gray-800 text-white border-gray-600 focus:border-blue-500"
                    />
                    
                    <select 
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="select select-bordered bg-gray-800 text-white border-gray-600"
                    >
                        <option value="all">All Status</option>
                        <option value="active">active</option>
                        <option value="draft">draft</option>
                        <option value="inactive">inactive</option>
                        <option value="archived">archived</option>
                    </select>
                    
                    {allTags.length > 1 && (
                        <select 
                            value={tagFilter}
                            onChange={(e) => {
                                setTagFilter(e.target.value);
                                setPage(1);
                            }}
                            className="select select-bordered bg-gray-800 text-white border-gray-600"
                        >
                            {allTags.map(tag => (
                                <option key={tag} value={tag}>{tag === 'all' ? 'All Tags' : tag}</option>
                            ))}
                        </select>
                    )}
                    
                   
                  
                    
                    <button 
                        onClick={() => refetchSegments()}
                        className="btn btn-primary"
                    >
                        🔄 Refresh
                    </button>
                </div>
                
             
                <div className="flex gap-4 text-sm text-gray-400">
                    <span>Sort by:</span>
                    <button 
                        onClick={() => handleSort('audienceSize')}
                        className={`hover:text-white ${sortBy === 'audienceSize' ? 'text-blue-400 font-bold' : ''}`}
                    >
                        Audience Size {sortBy === 'audienceSize' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                        onClick={() => handleSort('updatedAt')}
                        className={`hover:text-white ${sortBy === 'updatedAt' ? 'text-blue-400 font-bold' : ''}`}
                    >
                        Last Updated {sortBy === 'updatedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                        onClick={() => handleSort('matchRate')}
                        className={`hover:text-white ${sortBy === 'matchRate' ? 'text-blue-400 font-bold' : ''}`}
                    >
                        Match Rate {sortBy === 'matchRate' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                </div>
                
          
                {segments.length === 0 && (
                    <div className="text-center py-20 bg-gray-900 rounded-lg">
                        <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-400 text-lg mt-4">No segments found</p>
                        <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                        <button 
                            onClick={() => {
                                setSearchTerm('');
                                setDebouncedSearch('');
                                setStatusFilter('all');
                                setTagFilter('all');
                                setSourceFilter('all');
                                setPage(1);
                            }}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
                
    {/* main table starts from here  */}
                {segments.length > 0 && (
                    <div className="overflow-x-auto rounded-lg shadow bg-gray-900">
                        <table className="table w-full">
                            <thead className="bg-gray-800 text-white ">
                                <tr>
                                    <th className="cursor-pointer hover:bg-gray-700 p-3 text-left" onClick={() => handleSort('name')}>
                                        Segment Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="cursor-pointer hover:bg-gray-700 p-3 text-left" onClick={() => handleSort('audienceSize')}>
                                        Audience Size {sortBy === 'audienceSize' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="cursor-pointer hover:bg-gray-700 p-3 text-left" onClick={() => handleSort('matchRate')}>
                                        Match Rate {sortBy === 'matchRate' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="p-3 text-left">Sources</th>
                                    <th className="cursor-pointer hover:bg-gray-700 p-3 text-left" onClick={() => handleSort('status')}>
                                        Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="p-3 text-left">Tags</th>
                                    <th className="cursor-pointer hover:bg-gray-700 p-3 text-left" onClick={() => handleSort('updatedAt')}>
                                        Last Updated {sortBy === 'updatedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className=' text-white ' >show details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {segments.map((segment) => (
                                    <tr key={segment.id} className="hover:bg-gray-800 transition-colors border-b text-white border-gray-700">
                                        <td className="p-3 font-medium">{segment.name}</td>
                                        <td className="p-3">{formatNumber(segment.audienceSize)}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${segment.matchRate >= 80 ? 'bg-green-500' :
                                                            segment.matchRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                        style={{ width: `${segment.matchRate}%` }}
                                                    />
                                                </div>
                                                <span className="font-semibold">{segment.matchRate}%</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {segment.dataSourceIds?.slice(0, 2).map((s, i) => (
                                                    <div key={i} className="badge badge-sm bg-gray-700 text-gray-200">{s}</div>
                                                ))}
                                                {segment.dataSourceIds && segment.dataSourceIds.length > 2 && (
                                                    <div className="badge badge-sm bg-gray-700">+{segment.dataSourceIds.length - 2}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className={`badge ${segment.status === 'active' ? 'bg-green-500' :
                                                segment.status === 'draft' ? 'badge-warning' : 'badge-error'
                                            }`}>
                                                {segment.status}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {segment.tags?.slice(0, 2).map((tag, i) => (
                                                    <div key={i} className="badge badge-sm bg-blue-900 text-blue-300">{tag}</div>
                                                ))}
                                                {segment.tags && segment.tags.length > 2 && (
                                                    <div className="badge badge-sm bg-gray-700">+{segment.tags.length - 2}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3">{new Date(segment.updatedAt).toLocaleDateString()}</td>
                                        <td><Link to={`/segments/${segment.id}`} ><MdOutlineRemoveRedEye onClick={()=> console.log(segment.id)} color='#fff' size={24} /></Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* Pagination Controls */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-400">
                      
                           {pagination.total} segments
                        </div>
                        
                        <div className="join">
                            <button 
                                className="join-item btn btn-sm hover:cursor-pointer text-white bg-gray-800 hover:bg-gray-700" 
                                onClick={() => setPage(page - 1)} 
                                disabled={page === 1}
                            >
                                «
                            </button>
                            <button className="join-item btn btn-sm bg-blue-600 text-white">
                                Page {pagination.page} of {pagination.totalPages}
                            </button>
                            <button 
                                className="join-item btn btn-sm hover:cursor-pointer text-white bg-gray-800 hover:bg-gray-700" 
                                onClick={() => setPage(page + 1)} 
                                disabled={page === pagination.totalPages}
                            >
                                »
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}