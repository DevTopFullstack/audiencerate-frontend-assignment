import React, { useState } from "react";
import { useCreateSegmentMutation, useGetSegmentsQuery } from '../Redux/apiSlice';
import { useNavigate } from "react-router-dom";

export default function CreateSegment() {
      const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'active',
        audienceSize: 0,
        matchRate: 0.7,
    });
    const [createSegment, { isLoading, error, isSuccess }] = useCreateSegmentMutation();

    // Optional: Refetch segments list after creation
    const { refetch } = useGetSegmentsQuery({ page: 1, limit: 10 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'audienceSize' || name === 'matchRate' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createSegment(formData).unwrap();
            console.log('Segment created:', result);

            // Reset form
            setFormData({
                name: '',
                description: '',
                status: 'active',
                audienceSize: 10,
                matchRate: 0.5,
            });


            refetch();

            alert('Segment created successfully!');
        } catch (err) {
            console.error('Failed to create segment:', err);
            alert('Failed to create segment. Please try again.');
        }
    };

    return (
        <div className=" relative w-full h-auto min-h-screen bg-gray-700 flex place-content-center place-items-center " >
            <button
                onClick={() => navigate('/overview')}
                className="btn btn-ghost text-white hover:bg-gray-700 absolute top-10 left-10 "
            >
                ← Back to Overview
            </button>
            <form onSubmit={handleSubmit} className="space-y-4 w-[70vw] border border-white p-5 rounded-md shadow-md shadow-white ">

                <div>
                    <label className="block text-gray-300 mb-2">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter segment name"
                    />
                </div>


                <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter segment description"
                    />
                </div>


                <div>
                    <label className="block text-gray-300 mb-2">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="active">active</option>
                        <option value="draft">draft</option>
                        <option value="archived">archived</option>
                    </select>
                </div>


                <div>
                    <label className="block text-gray-300 mb-2">Audience Size</label>
                    <input
                        type="number"
                        name="audienceSize"
                        value={formData.audienceSize}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter audience size"
                    />
                </div>


                <div>
                    <label className="block text-gray-300 mb-2">Match Rate (0-1)</label>
                    <input
                        type="number"
                        name="matchRate"
                        value={formData.matchRate}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        max="1"
                        required
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-2 w-full h-2 bg-gray-700 rounded-full">
                        <div
                            className="h-full rounded-full bg-green-500"
                            style={{ width: `${formData.matchRate * 100}%` }}
                        />
                    </div>
                </div>

                {isSuccess && (
                    <div className="bg-green-500/20 border border-green-500 rounded-md p-3 text-green-400">
                        ✓ Segment created successfully!
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-md p-3 text-red-400">
                        ✗ Failed to create segment. Please check your data and try again.
                    </div>
                )}


                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Creating...' : 'Create Segment'}
                </button>
            </form>
        </div>
    )
}