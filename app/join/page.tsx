"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CalendarIcon, CheckCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitMembershipForm, type FormData } from "./actions"

export default function JoinPage() {
  const [isHydrated, setIsHydrated] = useState(false);
useEffect(() => {
  setIsHydrated(true);
}, []);
useEffect(() => {
  if (isHydrated && !applicationDate) {
    setApplicationDate(new Date());
  }
}, [isHydrated]);

  const { language } = useLanguage()
  const [dobDate, setDobDate] = useState<Date | undefined>()
  const [applicationDate, setApplicationDate] = useState<Date | undefined>(undefined)
  const [formState, setFormState] = useState<{
    isSubmitting: boolean
    isSuccess: boolean
    isError: boolean
    errorMessage?: string
    fieldErrors?: Record<string, string>
  }>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  })
  const [formData, setFormData] = useState<Partial<FormData>>({
    membershipType: "lifetime",
  })

  const content = {
    hi: {
      title: "सदस्यता फॉर्म",
      description: "सनातन महापरिषद् भारत की सदस्यता के लिए निम्न फॉर्म भरें",
      membershipType: "सदस्यता प्रकार",
      lifetime: "आजीवन सदस्यता",
      ordinary: "साधारण सदस्यता",
      personalDetails: "व्यक्तिगत विवरण",
      name: "नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      dob: "जन्म तिथि",
      age: "आयु",
      agePlaceholder: "अपनी आयु दर्ज करें",
      sonDaughterOf: "पुत्र/पुत्री",
      sonDaughterOfPlaceholder: "पिता/माता का नाम दर्ज करें",
      profession: "व्यवसाय",
      professionPlaceholder: "अपना व्यवसाय दर्ज करें",
      designation: "पद",
      designationPlaceholder: "अपना पद दर्ज करें",
      number: "संख्या",
      numberPlaceholder: "कर्मचारी आईडी/अन्य (यदि कोई हो)",
      contactDetails: "संपर्क विवरण",
      residentialAddress: "निवास का पता",
      addressPlaceholder: "अपना पूरा पता दर्ज करें",
      contactPhone: "संपर्क - फोन",
      phonePlaceholder: "फोन नंबर दर्ज करें",
      mobile: "मोबाइल",
      mobilePlaceholder: "मोबाइल नंबर दर्ज करें",
      email: "ई-मेल",
      emailPlaceholder: "ईमेल पता दर्ज करें",
      fax: "फैक्स",
      faxPlaceholder: "फैक्स नंबर (यदि कोई हो)",
      otherDetails: "अन्य विवरण",
      otherDetailsPlaceholder: "कोई अन्य विवरण दर्ज करें",
      membershipNumber: "आजीवन/साधारण सदस्यता क्रम संख्या",
      membershipNumberPlaceholder: "सदस्यता क्रम संख्या (यदि पहले से सदस्य हैं)",
      dateOfApplication: "आज दिनांक",
      introducedBy: "श्री / श्रीमती को",
      introducedByPlaceholder: "परिचयकर्ता का नाम",
      introducer: "परिचयकर्ता",
      introducerPlaceholder: "परिचयकर्ता का विवरण",
      submit: "फॉर्म जमा करें",
      selectDate: "तिथि चुनें",
      successMessage: "आपका फॉर्म सफलतापूर्वक जमा किया गया है। धन्यवाद!",
      errorMessage: "फॉर्म जमा करने में त्रुटि हुई। कृपया पुनः प्रयास करें।",
      requiredField: "यह फील्ड आवश्यक है",
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें",
    },
    en: {
      title: "Membership Form",
      description: "Fill the following form for membership of Sanatan Mahaparishad Bharat",
      membershipType: "Membership Type",
      lifetime: "Lifetime Membership",
      ordinary: "Ordinary Membership",
      personalDetails: "Personal Details",
      name: "Name",
      namePlaceholder: "Enter your full name",
      dob: "Date of Birth",
      age: "Age",
      agePlaceholder: "Enter your age",
      sonDaughterOf: "Son/Daughter of",
      sonDaughterOfPlaceholder: "Enter parent's name",
      profession: "Profession",
      professionPlaceholder: "Enter your profession",
      designation: "Designation",
      designationPlaceholder: "Enter your designation",
      number: "Number",
      numberPlaceholder: "Employee ID/other (if any)",
      contactDetails: "Contact Details",
      residentialAddress: "Residential Address",
      addressPlaceholder: "Enter your complete address",
      contactPhone: "Contact Phone Number",
      phonePlaceholder: "Enter phone number",
      mobile: "Mobile Number",
      mobilePlaceholder: "Enter mobile number",
      email: "Email Address",
      emailPlaceholder: "Enter email address",
      fax: "Fax",
      faxPlaceholder: "Enter fax number (if any)",
      otherDetails: "Other Details",
      otherDetailsPlaceholder: "Enter any other details",
      membershipNumber: "Lifetime/Ordinary Membership Serial Number",
      membershipNumberPlaceholder: "Enter membership number (if already a member)",
      dateOfApplication: "Date of Application",
      introducedBy: "Introduced by",
      introducedByPlaceholder: "Enter name of introducer",
      introducer: "Introducer",
      introducerPlaceholder: "Enter introducer details",
      submit: "Submit Form",
      selectDate: "Select date",
      successMessage: "Your form has been submitted successfully. Thank you!",
      errorMessage: "There was an error submitting the form. Please try again.",
      requiredField: "This field is required",
      invalidEmail: "Please enter a valid email address",
    },
  }

  const t = content[language]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: "lifetime" | "ordinary") => {
    setFormData((prev) => ({ ...prev, membershipType: value }))
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ ...formState, isSubmitting: true, isError: false, isSuccess: false })

    // Add dates to form data
    const formDataWithDates: FormData = {
      ...(formData as FormData),
      dateOfBirth: dobDate ? dobDate.toISOString() : undefined,
      dateOfApplication: applicationDate ? applicationDate.toISOString() : undefined,
    }

    try {
      const result = await submitMembershipForm(formDataWithDates)

      if (result.success) {
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
        })
        // Reset form after successful submission
        setFormData({ membershipType: "lifetime" })
        setDobDate(undefined)
        setApplicationDate(new Date())
      } else {
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: result.error,
          fieldErrors: result.fieldErrors,
        })
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: t.errorMessage,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-red-800">{t.title}</CardTitle>
          <CardDescription className="text-lg text-gray-700 mt-2">{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {formState.isSuccess ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800 font-medium">
                {language === "hi" ? "सफलता!" : "Success!"}
              </AlertTitle>
              <AlertDescription className="text-green-700">{t.successMessage}</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {formState.isError && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <AlertTitle className="text-red-800 font-medium">{language === "hi" ? "त्रुटि!" : "Error!"}</AlertTitle>
                  <AlertDescription className="text-red-700">
                    {formState.errorMessage || t.errorMessage}
                  </AlertDescription>
                </Alert>
              )}

              {/* Membership Type */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-800">{t.membershipType}</h3>
                <RadioGroup
                  defaultValue="lifetime"
                  value={formData.membershipType}
                  onValueChange={handleRadioChange}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lifetime" id="lifetime" />
                    <Label htmlFor="lifetime">{t.lifetime}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ordinary" id="ordinary" />
                    <Label htmlFor="ordinary">{t.ordinary}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-800">{t.personalDetails}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex">
                      {t.name} <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      placeholder={t.namePlaceholder}
                      required
                      className={formState.fieldErrors?.name ? "border-red-500" : ""}
                    />
                    {formState.fieldErrors?.name && (
                      <p className="text-red-500 text-sm mt-1">{formState.fieldErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">{t.dob}</Label>
                    <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="dob"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dobDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dobDate ? format(dobDate, "PPP") : t.selectDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0 transition ease-in-out duration-300 transform origin-top scale-95 data-[state=open]:scale-100 data-[state=closed]:scale-95">
                    <Calendar
                      mode="single"
                      selected={dobDate}
                      onSelect={setDobDate}
                      className="w-full bg-white rounded-lg p-4 text-center"
                      classNames={{
                        months: "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-red-100",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      }}
                    />

                    </PopoverContent>
                  </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">{t.age}</Label>
                    <Input
                      id="age"
                      name="age"
                      value={formData.age || ""}
                      onChange={handleInputChange}
                      placeholder={t.agePlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sonDaughterOf">{t.sonDaughterOf}</Label>
                    <Input
                      id="sonDaughterOf"
                      name="sonDaughterOf"
                      value={formData.sonDaughterOf || ""}
                      onChange={handleInputChange}
                      placeholder={t.sonDaughterOfPlaceholder}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profession">{t.profession}</Label>
                    <Input
                      id="profession"
                      name="profession"
                      value={formData.profession || ""}
                      onChange={handleInputChange}
                      placeholder={t.professionPlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">{t.designation}</Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={formData.designation || ""}
                      onChange={handleInputChange}
                      placeholder={t.designationPlaceholder}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeNumber">{t.number}</Label>
                  <Input
                    id="employeeNumber"
                    name="employeeNumber"
                    value={formData.employeeNumber || ""}
                    onChange={handleInputChange}
                    placeholder={t.numberPlaceholder}
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-800">{t.contactDetails}</h3>

                <div className="space-y-2">
                  <Label htmlFor="residentialAddress">{t.residentialAddress}</Label>
                  <Textarea
                    id="residentialAddress"
                    name="residentialAddress"
                    value={formData.residentialAddress || ""}
                    onChange={handleInputChange}
                    placeholder={t.addressPlaceholder}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">{t.contactPhone}</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone || ""}
                      onChange={handleInputChange}
                      placeholder={t.phonePlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="flex">
                      {t.mobile} <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber || ""}
                      onChange={handleInputChange}
                      placeholder={t.mobilePlaceholder}
                      required
                      className={formState.fieldErrors?.mobileNumber ? "border-red-500" : ""}
                    />
                    {formState.fieldErrors?.mobileNumber && (
                      <p className="text-red-500 text-sm mt-1">{formState.fieldErrors.mobileNumber}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex">
                      {t.email} <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      placeholder={t.emailPlaceholder}
                      required
                      className={formState.fieldErrors?.email ? "border-red-500" : ""}
                    />
                    {formState.fieldErrors?.email && (
                      <p className="text-red-500 text-sm mt-1">{formState.fieldErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fax">{t.fax}</Label>
                    <Input
                      id="fax"
                      name="fax"
                      value={formData.fax || ""}
                      onChange={handleInputChange}
                      placeholder={t.faxPlaceholder}
                    />
                  </div>
                </div>
              </div>

              {/* Other Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-800">{t.otherDetails}</h3>

                <div className="space-y-2">
                  <Label htmlFor="otherDetails">{t.otherDetails}</Label>
                  <Textarea
                    id="otherDetails"
                    name="otherDetails"
                    value={formData.otherDetails || ""}
                    onChange={handleInputChange}
                    placeholder={t.otherDetailsPlaceholder}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="membershipNumber">{t.membershipNumber}</Label>
                  <Input
                    id="membershipNumber"
                    name="membershipNumber"
                    value={formData.membershipNumber || ""}
                    onChange={handleInputChange}
                    placeholder={t.membershipNumberPlaceholder}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfApplication">{t.dateOfApplication}</Label>
                    <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="dateOfApplication"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !applicationDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {applicationDate ? format(applicationDate, "PPP") : t.selectDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0 transition ease-in-out duration-300 transform origin-top scale-95 data-[state=open]:scale-100 data-[state=closed]:scale-95">
                    <Calendar
                      mode="single"
                      selected={dobDate}
                      onSelect={setDobDate}
                      className="w-full bg-white rounded-lg p-4 text-center"
                      classNames={{
                        months: "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-red-100",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      }}
                    />
                    </PopoverContent>
                  </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="introducedBy">{t.introducedBy}</Label>
                    <Input
                      id="introducedBy"
                      name="introducedBy"
                      value={formData.introducedBy || ""}
                      onChange={handleInputChange}
                      placeholder={t.introducedByPlaceholder}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="introducer">{t.introducer}</Label>
                  <Input
                    id="introducer"
                    name="introducer"
                    value={formData.introducer || ""}
                    onChange={handleInputChange}
                    placeholder={t.introducerPlaceholder}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? (language === "hi" ? "जमा कर रहा है..." : "Submitting...") : t.submit}
              </Button>
            </form>
          )}
        </CardContent>
        {formState.isSuccess && (
          <CardFooter>
            <Button
              onClick={() => setFormState({ isSubmitting: false, isSuccess: false, isError: false })}
              className="w-full bg-red-700 hover:bg-red-800 text-white"
            >
              {language === "hi" ? "नया फॉर्म भरें" : "Fill New Form"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
