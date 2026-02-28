"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Member {
  id: number;
  fullName: string;
  email: string;
  membershipType: string;
  dateOfBirth?: string;
  age?: string;
  sonDaughterOf?: string;
  profession?: string;
  designation?: string;
  employeeNumber?: string;
  residentialAddress?: string;
  contactPhone?: string;
  mobileNumber?: string;
  fax?: string;
  otherDetails?: string;
  membershipNumber?: string;
  dateOfApplication?: string;
  introducedBy?: string;
  introducer?: string;
}

export default function MembersPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch("/api/membership/all", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('jwt');
            router.push('/login');
          }
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        setMembers(data.members || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [router]);

  const content = {
    hi: {
      title: "सदस्य सूची",
      name: "पूरा नाम",
      email: "ईमेल",
      membershipType: "सदस्यता प्रकार",
      mobile: "मोबाइल नंबर",
      address: "निवास का पता",
      noMembers: "कोई सदस्य नहीं मिला।",
    },
    en: {
      title: "Members List",
      name: "Full Name",
      email: "Email",
      membershipType: "Membership Type",
      mobile: "Mobile Number",
      address: "Residential Address",
      noMembers: "No members found.",
    },
  };
  const t = content[language];

  const filteredMembers = members.filter((member) => {
    const q = search.toLowerCase();
    return (
      member.fullName?.toLowerCase().includes(q) ||
      member.email?.toLowerCase().includes(q) ||
      member.mobileNumber?.toLowerCase().includes(q)
    );
  });

  // Helper to mask mobile number
  function maskMobile(mobile?: string) {
    if (!mobile) return "";
    if (mobile.length <= 4) return "xxxx";
    return mobile.slice(0, -4) + "xxxx";
  }

  // Export to Excel
  function handleExportExcel() {
    const ws = XLSX.utils.json_to_sheet(filteredMembers.map((m) => ({
      [t.name]: m.fullName,
      [t.email]: m.email,
      [t.membershipType]: language === "hi"
        ? m.membershipType === "lifetime" ? "आजीवन" : "साधारण"
        : m.membershipType === "lifetime" ? "Lifetime" : "Ordinary",
      [t.mobile]: maskMobile(m.mobileNumber),
      [t.address]: m.residentialAddress,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Members");
    XLSX.writeFile(wb, "members.xlsx");
  }

  // Export to PDF
  function handleExportPDF() {
    const doc = new jsPDF();
    doc.text(t.title, 14, 16);
    (doc as any).autoTable({
      startY: 22,
      head: [[t.name, t.email, t.membershipType, t.mobile, t.address]],
      body: filteredMembers.map((m) => [
        m.fullName,
        m.email,
        language === "hi"
          ? m.membershipType === "lifetime" ? "आजीवन" : "साधारण"
          : m.membershipType === "lifetime" ? "Lifetime" : "Ordinary",
        maskMobile(m.mobileNumber),
        m.residentialAddress,
      ]),
    });
    doc.save("members.pdf");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-5xl mx-auto bg-white/40 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-red-800">{t.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex gap-2">
              <button
                onClick={handleExportExcel}
                className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm font-medium"
              >
                {language === "hi" ? "एक्सेल निर्यात करें" : "Export as Excel"}
              </button>
              <button
                onClick={handleExportPDF}
                className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
              >
                {language === "hi" ? "पीडीएफ निर्यात करें" : "Export as PDF"}
              </button>
            </div>
            <Input
              type="text"
              placeholder={language === "hi" ? "नाम, ईमेल या मोबाइल खोजें..." : "Search by name, email, or mobile..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </div>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-8">{t.noMembers}</div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.name}</TableHead>
                      <TableHead>{t.email}</TableHead>
                      <TableHead>{t.membershipType}</TableHead>
                      <TableHead>{t.mobile}</TableHead>
                      <TableHead>{t.address}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>{member.fullName}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{language === "hi"
                          ? member.membershipType === "lifetime" ? "आजीवन" : "साधारण"
                          : member.membershipType === "lifetime" ? "Lifetime" : "Ordinary"}</TableCell>
                        <TableCell>{maskMobile(member.mobileNumber)}</TableCell>
                        <TableCell>{member.residentialAddress}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="rounded-lg border border-orange-200 bg-white/80 p-4 shadow-sm">
                    <div className="font-semibold text-red-800 mb-2">{t.name}: <span className="font-normal text-gray-900">{member.fullName}</span></div>
                    <div className="mb-1"><span className="font-semibold text-red-800">{t.email}:</span> <span className="text-gray-900">{member.email}</span></div>
                    <div className="mb-1"><span className="font-semibold text-red-800">{t.membershipType}:</span> <span className="text-gray-900">{language === "hi"
                      ? member.membershipType === "lifetime" ? "आजीवन" : "साधारण"
                      : member.membershipType === "lifetime" ? "Lifetime" : "Ordinary"}</span></div>
                    <div className="mb-1"><span className="font-semibold text-red-800">{t.mobile}:</span> <span className="text-gray-900">{maskMobile(member.mobileNumber)}</span></div>
                    <div><span className="font-semibold text-red-800">{t.address}:</span> <span className="text-gray-900">{member.residentialAddress}</span></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 