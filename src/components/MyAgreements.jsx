import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyAgreements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (!username) return;
    (async () => {
      try {
        const { data } = await axios.get(`https://one9back.onrender.com//api/agreements/user/${username}/`);
        setItems(data);
      } catch (e) {
        // noop
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleView = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">My Agreements</h2>
      {items.length === 0 ? (
        <div>No agreements yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((a) => {
            const pdf = a.pdf_url || a.pdf_file;
            return (
              <div key={a.id} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.title ? a.title : `Agreement #${a.id}`}</div>
                  <div className="text-sm text-gray-600">Amount: ₹{a.amount}</div>
                  <div className="text-xs text-gray-500">{new Date(a.created_at).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    disabled={!pdf}
                    onClick={() => handleView(pdf)}
                  >
                    View Agreement
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


