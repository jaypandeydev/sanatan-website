"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function MessagesPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loggedIn = !!localStorage.getItem("jwt");
    setIsLoggedIn(loggedIn);
    if (!loggedIn) router.replace("/login");
    else fetchMessages();
    // eslint-disable-next-line
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  }

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  if (!isLoggedIn) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto bg-white/80 border-orange-200 shadow">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-red-800 mb-2">Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
            <Input
              type="text"
              placeholder="Search by name, email, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </div>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8">No messages found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-orange-200 rounded">
                <thead>
                  <tr className="bg-orange-50">
                    <th className="px-3 py-2 border-b text-left">Name</th>
                    <th className="px-3 py-2 border-b text-left">Email</th>
                    <th className="px-3 py-2 border-b text-left">Phone</th>
                    <th className="px-3 py-2 border-b text-left">Message</th>
                    <th className="px-3 py-2 border-b text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-orange-50/60">
                      <td className="px-3 py-2 align-top font-medium text-red-800">{m.name}</td>
                      <td className="px-3 py-2 align-top">{m.email}</td>
                      <td className="px-3 py-2 align-top">{m.phone || "-"}</td>
                      <td className="px-3 py-2 align-top whitespace-pre-line max-w-xs break-words">{m.message}</td>
                      <td className="px-3 py-2 align-top text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 