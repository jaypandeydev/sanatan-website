"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone } from "lucide-react";
import { ChangeEvent } from "react";

const placeholderImg = "/images/officials/placeholder.png";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
const DISTRICT_STATES = ["Uttar Pradesh", "Bihar", "Uttarakhand"] as const;
type DistrictState = typeof DISTRICT_STATES[number];
const DISTRICTS: Record<DistrictState, string[]> = {
  "Uttar Pradesh": [/* ... districts ... */],
  "Bihar": [/* ... districts ... */],
  "Uttarakhand": [/* ... districts ... */],
};

export default function OfficialsPage() {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>("ALL");
  const [filterState, setFilterState] = useState<string>("");
  const [filterDistrict, setFilterDistrict] = useState<string>("");

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwt"));
    fetch("/api/officials")
      .then((res) => res.json())
      .then((data) => {
        setOfficials(data.officials || []);
        setLoading(false);
      });
  }, []);

  const t = {
    hi: {
      title: "पदाधिकारी",
      subtitle: "सनातन महापरिषद भारत के प्रमुख पदाधिकारियों की सूची",
      search: "पदाधिकारी खोजें...",
      addOfficial: "नया पदाधिकारी जोड़ें",
      name: "नाम",
      designation: "पद",
      address: "पता",
      phone: "फोन",
      email: "ईमेल",
      image: "चित्र पथ",
      submit: "जोड़ें",
    },
    en: {
      title: "Officials",
      subtitle: "List of key officials of Sanatan Mahaparishad Bharat",
      search: "Search officials...",
      addOfficial: "Add New Official",
      name: "Name",
      designation: "Designation",
      address: "Address",
      phone: "Phone",
      email: "Email",
      image: "Image Path",
      submit: "Add",
    },
  };

  const filtered = officials.filter((o: any) => {
    if (filterLevel !== "ALL" && o.level !== filterLevel) return false;
    if ((filterLevel === "STATE" || filterLevel === "DISTRICT") && filterState && o.state !== filterState) return false;
    if (filterLevel === "DISTRICT" && DISTRICT_STATES.includes(filterState as DistrictState) && filterDistrict && o.district !== filterDistrict) return false;
    return (
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.designation.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Add Official Form State
  const [form, setForm] = useState({
    name: "",
    designation: "",
    address: "",
    phone: "",
    email: "",
    imageFile: null as File | null,
  });
  const [formMsg, setFormMsg] = useState("");
  const [formError, setFormError] = useState("");
  const handleFormChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      if (file && (!file.type.startsWith("image/") || file.size > 1024 * 1024)) {
        setFormError(language === "hi" ? "केवल 1MB तक की छवि चुनें।" : "Please select an image up to 1MB.");
        setForm({ ...form, imageFile: null });
        return;
      }
      setFormError("");
      setForm({ ...form, imageFile: file });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleAddOfficial = async (e: any) => {
    e.preventDefault();
    setFormMsg("");
    setFormError("");
    setFormLoading(true);
    let imagePath = "";
    if (form.imageFile) {
      const formData = new FormData();
      formData.append("file", form.imageFile);
      try {
        const uploadRes = await fetch("/api/upload-official-image", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const data = await uploadRes.json();
          imagePath = data.filename;
        } else {
          const err = await uploadRes.json().catch(() => ({}));
          setFormError((err && err.error) || (language === "hi" ? "छवि अपलोड विफल!" : "Image upload failed!"));
          setFormLoading(false);
          return;
        }
      } catch (err) {
        setFormError(language === "hi" ? "छवि अपलोड विफल!" : "Image upload failed!");
        setFormLoading(false);
        return;
      }
    }
    try {
      const res = await fetch("/api/officials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          designation: form.designation,
          address: form.address,
          phone: form.phone,
          email: form.email,
          imagePath,
        }),
      });
      if (res.ok) {
        setFormMsg(language === "hi" ? "सफलतापूर्वक जोड़ा गया!" : "Added successfully!");
        setForm({ name: "", designation: "", address: "", phone: "", email: "", imageFile: null });
        // Refresh officials
        const data = await res.json();
        setOfficials((prev) => [...prev, data.official]);
      } else {
        const err = await res.json().catch(() => ({}));
        setFormError((err && err.error) || (language === "hi" ? "त्रुटि!" : "Error!"));
      }
    } catch (err) {
      setFormError(language === "hi" ? "त्रुटि!" : "Error!");
    }
    setFormLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-2 text-center">{t[language].title}</h1>
      <p className="text-center text-lg text-gray-700 mb-6">{t[language].subtitle}</p>
      <div className="mb-6 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
        <div>
          <label className="block text-red-800 font-medium mb-1">Level</label>
          <select
            value={filterLevel}
            onChange={e => { setFilterLevel(e.target.value); setFilterState(""); setFilterDistrict(""); }}
            className="bg-white/90 border-orange-200 focus:border-red-700 rounded px-2 py-2"
          >
            <option value="ALL">All</option>
            <option value="NATIONAL">National</option>
            <option value="STATE">State</option>
            <option value="DISTRICT">District</option>
          </select>
        </div>
        {(filterLevel === "STATE" || filterLevel === "DISTRICT") && (
          <div>
            <label className="block text-red-800 font-medium mb-1">State</label>
            <select
              value={filterState}
              onChange={e => { setFilterState(e.target.value); setFilterDistrict(""); }}
              className="bg-white/90 border-orange-200 focus:border-red-700 rounded px-2 py-2"
            >
              <option value="">All States</option>
              {INDIAN_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        )}
        {filterLevel === "DISTRICT" && DISTRICT_STATES.includes(filterState as DistrictState) && (
          <div>
            <label className="block text-red-800 font-medium mb-1">District</label>
            <select
              value={filterDistrict}
              onChange={e => setFilterDistrict(e.target.value)}
              className="bg-white/90 border-orange-200 focus:border-red-700 rounded px-2 py-2"
            >
              <option value="">All Districts</option>
              {(DISTRICTS[filterState as DistrictState] || []).map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        )}
        <Input
          type="text"
          placeholder={t[language].search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>
      {isLoggedIn && (
        null
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="text-center col-span-2 py-8">Loading...</div>
        ) : filtered.map((o: any, i: number) => (
          <Card key={i} className="bg-white/90 border border-orange-200 shadow-sm flex flex-row items-center">
            <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 m-4 rounded-full bg-orange-100 overflow-hidden">
              <img
                src={o.imagePath ? `/images/officials/${o.imagePath}` : placeholderImg}
                alt={o.name}
                className="w-20 h-20 object-cover rounded-full"
                onError={(e: any) => (e.target.src = placeholderImg)}
              />
            </div>
            <div className="flex-1 p-4">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-lg font-bold text-red-800 mb-1">{o.name}</CardTitle>
                <div className="text-sm text-red-700 font-medium mb-1">{o.designation}</div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-sm text-gray-700 mb-1">{o.address}</div>
                <div className="flex items-center text-sm text-gray-700 mb-1">
                  <Phone className="w-4 h-4 mr-1 text-red-700" /> {o.phone}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Mail className="w-4 h-4 mr-1 text-red-700" /> {o.email}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 