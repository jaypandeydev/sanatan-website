"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
const DISTRICT_STATES = ["Uttar Pradesh", "Bihar", "Uttarakhand"] as const;
type DistrictState = typeof DISTRICT_STATES[number];
const DISTRICTS: Record<DistrictState, string[]> = {
  "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Sant Ravidas Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"]
};

export default function AddOfficialPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = !!localStorage.getItem("jwt");
    setIsLoggedIn(loggedIn);
    if (!loggedIn) router.replace("/login");
  }, [router]);

  const t = {
    hi: {
      title: "नया पदाधिकारी जोड़ें",
      name: "नाम",
      designation: "पद",
      address: "पता",
      phone: "फोन (वैकल्पिक)",
      email: "ईमेल (वैकल्पिक)",
      image: "चित्र चुनें",
      submit: "जोड़ें",
      success: "सफलतापूर्वक जोड़ा गया!",
      error: "त्रुटि!",
      imageError: "केवल 1MB तक की छवि चुनें।",
      imageUploadError: "छवि अपलोड विफल!",
    },
    en: {
      title: "Add Official",
      name: "Name",
      designation: "Designation",
      address: "Address",
      phone: "Phone (optional)",
      email: "Email (optional)",
      image: "Choose Image",
      submit: "Add",
      success: "Added successfully!",
      error: "Error!",
      imageError: "Please select an image up to 1MB.",
      imageUploadError: "Image upload failed!",
    },
  };

  const [form, setForm] = useState({
    name: "",
    designation: "",
    address: "",
    phone: "",
    email: "",
    imageFile: null as File | null,
    level: "NATIONAL",
    state: "" as string,
    district: "" as string,
  });
  const [formMsg, setFormMsg] = useState("");
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const handleFormChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      if (file && (!file.type.startsWith("image/") || file.size > 1024 * 1024)) {
        setFormError(t[language].imageError);
        setForm({ ...form, imageFile: null });
        return;
      }
      setFormError("");
      setForm({ ...form, imageFile: file });
    } else if (name === "level") {
      setForm({ ...form, level: value, state: "", district: "" });
    } else if (name === "state") {
      setForm({ ...form, state: value, district: "" });
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
          setFormError((err && err.error) || t[language].imageUploadError);
          setFormLoading(false);
          return;
        }
      } catch (err) {
        setFormError(t[language].imageUploadError);
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
          level: form.level,
          state: form.level !== "NATIONAL" ? form.state : undefined,
          district: form.level === "DISTRICT" && DISTRICTS[form.state as DistrictState] ? form.district : undefined,
        }),
      });
      if (res.ok) {
        setFormMsg(t[language].success);
        setForm({ name: "", designation: "", address: "", phone: "", email: "", imageFile: null, level: "NATIONAL", state: "", district: "" });
      } else {
        const err = await res.json().catch(() => ({}));
        setFormError((err && err.error) || t[language].error);
      }
    } catch (err) {
      setFormError(t[language].error);
    }
    setFormLoading(false);
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background content-wrapper">
      <Card className="w-full max-w-lg shadow-lg border-orange-200 bg-white/80 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-red-800 mb-2">
            {t[language].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOfficial} className="flex flex-col gap-4">
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="level">Level</label>
              <select
                id="level"
                name="level"
                value={form.level}
                onChange={handleFormChange}
                className="bg-white/90 border-orange-200 focus:border-red-700 rounded px-2 py-2 w-full"
              >
                <option value="NATIONAL">National</option>
                <option value="STATE">State</option>
                <option value="DISTRICT">District</option>
              </select>
            </div>
            {(form.level === "STATE" || form.level === "DISTRICT") && (
              <div>
                <label className="block text-red-800 font-medium mb-1" htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={form.state}
                  onChange={handleFormChange}
                  className="bg-white/90 border-orange-200 focus:border-red-700 rounded px-2 py-2 w-full"
                  required={form.level === "STATE" || form.level === "DISTRICT"}
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            )}
            {form.level === "DISTRICT" && DISTRICT_STATES.includes(form.state as DistrictState) && (
              <div>
                <label className="block text-red-800 font-medium mb-1" htmlFor="district">District</label>
                <select
                  id="district"
                  name="district"
                  value={form.district}
                  onChange={handleFormChange}
                  className="bg-white/90 border-orange-200 focus:border-red-700 rounded px-2 py-2 w-full"
                  required={form.level === "DISTRICT"}
                >
                  <option value="">Select District</option>
                  {(DISTRICTS[form.state as DistrictState] || []).map((district: string) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="name">
                {t[language].name}
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder={t[language].name}
                value={form.name}
                onChange={handleFormChange}
                className="bg-white/90 border-orange-200 focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="designation">
                {t[language].designation}
              </label>
              <Input
                id="designation"
                name="designation"
                required
                placeholder={t[language].designation}
                value={form.designation}
                onChange={handleFormChange}
                className="bg-white/90 border-orange-200 focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="address">
                {t[language].address}
              </label>
              <Input
                id="address"
                name="address"
                required
                placeholder={t[language].address}
                value={form.address}
                onChange={handleFormChange}
                className="bg-white/90 border-orange-200 focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="phone">
                {t[language].phone}
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder={t[language].phone}
                value={form.phone}
                onChange={handleFormChange}
                className="bg-white/90 border-orange-200 focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="email">
                {t[language].email}
              </label>
              <Input
                id="email"
                name="email"
                placeholder={t[language].email}
                value={form.email}
                onChange={handleFormChange}
                className="bg-white/90 border-orange-200 focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-red-800 font-medium mb-1" htmlFor="imageFile">
                {t[language].image}
              </label>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFormChange}
                className="block w-full text-sm text-gray-700 border border-orange-200 rounded cursor-pointer bg-white/90 focus:border-red-700"
              />
            </div>
            {formMsg && <div className="text-green-700 font-medium mt-2">{formMsg}</div>}
            {formError && <div className="text-red-700 font-medium mt-2">{formError}</div>}
            <Button
              type="submit"
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded shadow"
              disabled={formLoading}
            >
              {formLoading ? (language === "hi" ? "प्रसंस्करण..." : "Processing...") : t[language].submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 