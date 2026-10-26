import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosCalls/axios';

function DriverRequests() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRequests = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axiosInstance.get('/bookings/driver-requests');
            setRequests(res.data.requests);
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (bookingId, action) => {
        try {
            await axiosInstance.patch(`/bookings/${bookingId}/${action}`);
            await fetchRequests();
        } catch (error) {
            setError(error.response?.data?.message || 'Action failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF7EF] px-6 py-12 text-emerald-950">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-4xl font-extrabold">Driver Requests</h1>

                {loading && <p>Loading requests...</p>}
                {error && <p className="mb-4 text-red-600">{error}</p>}

                {!loading && requests.length === 0 && (
                    <p>No booking requests for your rides yet.</p>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    {requests.map((booking) => (
                        <div key={booking._id} className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold">
                                {booking.ride?.source} → {booking.ride?.destination}
                            </h2>

                            <p className="mt-3">
                                Passenger: {booking.passenger?.name || booking.passenger?.email || 'Passenger'}
                            </p>
                            <p>Seats requested: {booking.seatsBooked}</p>
                            <p>Status: {booking.bookingStatus}</p>

                            {booking.bookingStatus === 'pending' && (
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => handleAction(booking._id, 'accept')}
                                        className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleAction(booking._id, 'reject')}
                                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DriverRequests;
