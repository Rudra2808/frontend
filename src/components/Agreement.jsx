import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

export default function Agreement() {
  const [step, setStep] = useState(1);
  const [finished, setFinished] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreementId, setAgreementId] = useState(null);
  const [priceInfo, setPriceInfo] = useState({ base: 500, discountPercent: 0, final: 500 });
  const [docTitle, setDocTitle] = useState("");
  const [formData, setFormData] = useState({
    place: "",
    day: "",
    month: "",
    year: "",
    ownerName: "",
    ownerFather: "",
    ownerAddress: "",
    tenantName: "",
    tenantFather: "",
    tenantWorkAddress: "",
    tenantPermanentAddress: "",
    propertyAddress: "",
    startDate: "",
    endDate: "",
    monthlyRent: "",
    maintenanceCharges: "",
    securityDeposit: "",
    chequeNumber: "",
    chequeDate: "",
    witness1Name: "",
    witness1Address: "",
    witness2Name: "",
    witness2Address: "",
    bedrooms: "",
    fans: "",
    lights: "",
    geysers: "",
    mirrors: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const [errors, setErrors] = useState({});

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.place.trim()) newErrors.place = 'Place is required';
      if (!formData.day.trim()) newErrors.day = 'Day is required';
      if (!formData.month.trim()) newErrors.month = 'Month is required';
      if (!formData.year.trim()) newErrors.year = 'Year is required';
      if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner Name is required';
      if (!formData.ownerFather.trim()) newErrors.ownerFather = 'Owner Father Name is required';
      if (!formData.ownerAddress.trim()) newErrors.ownerAddress = 'Owner Address is required';
    } else if (currentStep === 2) {
      if (!formData.tenantName.trim()) newErrors.tenantName = 'Tenant Name is required';
      if (!formData.tenantFather.trim()) newErrors.tenantFather = 'Tenant Father Name is required';
      if (!formData.tenantWorkAddress.trim()) newErrors.tenantWorkAddress = 'Tenant Work Address is required';
      if (!formData.tenantPermanentAddress.trim()) newErrors.tenantPermanentAddress = 'Tenant Permanent Address is required';
    } else if (currentStep === 3) {
      if (!formData.propertyAddress.trim()) newErrors.propertyAddress = 'Property Address is required';
      if (!formData.startDate) newErrors.startDate = 'Start Date is required';
      if (!formData.endDate) newErrors.endDate = 'End Date is required';
      if (!formData.monthlyRent.trim()) newErrors.monthlyRent = 'Monthly Rent is required';
      if (!formData.maintenanceCharges.trim()) newErrors.maintenanceCharges = 'Maintenance Charges is required';
      if (!formData.securityDeposit.trim()) newErrors.securityDeposit = 'Security Deposit is required';
      if (!formData.chequeNumber.trim()) newErrors.chequeNumber = 'Cheque Number is required';
      if (!formData.chequeDate) newErrors.chequeDate = 'Cheque Date is required';
    } else if (currentStep === 4) {
      if (!formData.witness1Name.trim()) newErrors.witness1Name = 'Witness 1 Name is required';
      if (!formData.witness1Address.trim()) newErrors.witness1Address = 'Witness 1 Address is required';
      if (!formData.witness2Name.trim()) newErrors.witness2Name = 'Witness 2 Name is required';
      if (!formData.witness2Address.trim()) newErrors.witness2Address = 'Witness 2 Address is required';
      if (!formData.bedrooms.trim()) newErrors.bedrooms = 'Bedrooms is required';
      if (!formData.fans.trim()) newErrors.fans = 'Fans is required';
      if (!formData.lights.trim()) newErrors.lights = 'CFL Lights is required';
      if (!formData.geysers.trim()) newErrors.geysers = 'Geysers is required';
      if (!formData.mirrors.trim()) newErrors.mirrors = 'Mirrors is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      setErrors({});
    }
  };
  
  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };
  
  const finish = () => {
    if (validateStep(4)) {
      setFinished(true);
      setErrors({});
    }
  };

  const generatePdfBlob = async () => {
    const input = document.getElementById("print-section");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    return pdf.output("blob");
  };

  const createAndDownload = async () => {
    try {
      setIsProcessing(true);
      const username = localStorage.getItem("loggedInUser");
      if (!username) return alert("Please login first");
      // create agreement record
      const { data } = await axios.post("https://one9back.onrender.com//api/agreements/create/", {
        username,
        form_data: formData,
        title: docTitle?.trim() || null,
      });
      const newAgreementId = data.agreement_id;
      setAgreementId(newAgreementId);
      if (data.final_amount !== undefined) {
        setPriceInfo({ base: data.base_amount, discountPercent: data.discount_percent, final: data.final_amount });
      }

      // generate pdf and upload to backend
      const blob = await generatePdfBlob();
      const form = new FormData();
      const filename = (docTitle?.trim() || "rental-agreement") + ".pdf";
      form.append("file", new File([blob], filename, { type: "application/pdf" }));
      await axios.post(`https://one9back.onrender.com//api/agreements/${newAgreementId}/upload-pdf/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // also trigger local download for user convenience
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Failed to create or download agreement");
    } finally {
      setIsProcessing(false);
    }
  };

  // When the form is finished, precompute the discounted price for the logged-in user to show on the button
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const username = localStorage.getItem("loggedInUser");
        if (!username) return;
        const { data } = await axios.get(`https://one9back.onrender.com//api/agreements/user/${username}/`);
        const previousCount = Array.isArray(data) ? data.length : 0;
        const base = 500;
        const discountPercent = Math.min(previousCount * 4, 40);
        const final = Number((base * (1 - discountPercent / 100)).toFixed(2));
        setPriceInfo({ base, discountPercent, final });
      } catch (_) {
        // ignore
      }
    };
    if (finished) fetchPrice();
  }, [finished]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Title */}
      <div className="mb-6 border-b pb-4 text-center">
        <img src="/assests/Havenhunt_Logo_Earth_Tones_and_Turquoise-removebg-preview.png" alt="Logo" className="h-12 mx-auto" />
        <h1 className="text-2xl font-bold">Rental Agreement</h1>
        <p className="text-gray-600">
          Fill out the form to generate your customized agreement
        </p>
      </div>

      <div
        className={`grid gap-6 ${
          finished ? "grid-cols-1 justify-center" : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {/* LEFT FORM */}
        {!finished && (
          <div className="bg-white p-4 shadow rounded">
            <div className="mb-4 text-gray-600">Step {step} of 4</div>
            <input
              placeholder="Agreement Title (optional)"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-2">
                <div>
                  <input name="place" placeholder="Place" value={formData.place} onChange={handleChange} className={`w-full border p-2 rounded ${errors.place ? 'border-red-500' : ''}`} required />
                  {errors.place && <p className="text-red-500 text-xs mt-1">{errors.place}</p>}
                </div>
                <div>
                  <input name="day" placeholder="Day" value={formData.day} onChange={handleChange} className={`w-full border p-2 rounded ${errors.day ? 'border-red-500' : ''}`} required />
                  {errors.day && <p className="text-red-500 text-xs mt-1">{errors.day}</p>}
                </div>
                <div>
                  <input name="month" placeholder="Month" value={formData.month} onChange={handleChange} className={`w-full border p-2 rounded ${errors.month ? 'border-red-500' : ''}`} required />
                  {errors.month && <p className="text-red-500 text-xs mt-1">{errors.month}</p>}
                </div>
                <div>
                  <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} className={`w-full border p-2 rounded ${errors.year ? 'border-red-500' : ''}`} required />
                  {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                </div>
                <div>
                  <input name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} className={`w-full border p-2 rounded ${errors.ownerName ? 'border-red-500' : ''}`} required />
                  {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
                </div>
                <div>
                  <input name="ownerFather" placeholder="Owner Father Name" value={formData.ownerFather} onChange={handleChange} className={`w-full border p-2 rounded ${errors.ownerFather ? 'border-red-500' : ''}`} required />
                  {errors.ownerFather && <p className="text-red-500 text-xs mt-1">{errors.ownerFather}</p>}
                </div>
                <div>
                  <textarea name="ownerAddress" placeholder="Owner Address" value={formData.ownerAddress} onChange={handleChange} className={`w-full border p-2 rounded ${errors.ownerAddress ? 'border-red-500' : ''}`} required />
                  {errors.ownerAddress && <p className="text-red-500 text-xs mt-1">{errors.ownerAddress}</p>}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-2">
                <div>
                  <input name="tenantName" placeholder="Tenant Name" value={formData.tenantName} onChange={handleChange} className={`w-full border p-2 rounded ${errors.tenantName ? 'border-red-500' : ''}`} required />
                  {errors.tenantName && <p className="text-red-500 text-xs mt-1">{errors.tenantName}</p>}
                </div>
                <div>
                  <input name="tenantFather" placeholder="Tenant Father Name" value={formData.tenantFather} onChange={handleChange} className={`w-full border p-2 rounded ${errors.tenantFather ? 'border-red-500' : ''}`} required />
                  {errors.tenantFather && <p className="text-red-500 text-xs mt-1">{errors.tenantFather}</p>}
                </div>
                <div>
                  <textarea name="tenantWorkAddress" placeholder="Tenant Work Address" value={formData.tenantWorkAddress} onChange={handleChange} className={`w-full border p-2 rounded ${errors.tenantWorkAddress ? 'border-red-500' : ''}`} required />
                  {errors.tenantWorkAddress && <p className="text-red-500 text-xs mt-1">{errors.tenantWorkAddress}</p>}
                </div>
                <div>
                  <textarea name="tenantPermanentAddress" placeholder="Tenant Permanent Address" value={formData.tenantPermanentAddress} onChange={handleChange} className={`w-full border p-2 rounded ${errors.tenantPermanentAddress ? 'border-red-500' : ''}`} required />
                  {errors.tenantPermanentAddress && <p className="text-red-500 text-xs mt-1">{errors.tenantPermanentAddress}</p>}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-2">
                <div>
                  <textarea name="propertyAddress" placeholder="Property Address" value={formData.propertyAddress} onChange={handleChange} className={`w-full border p-2 rounded ${errors.propertyAddress ? 'border-red-500' : ''}`} required />
                  {errors.propertyAddress && <p className="text-red-500 text-xs mt-1">{errors.propertyAddress}</p>}
                </div>
                <div>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className={`w-full border p-2 rounded ${errors.startDate ? 'border-red-500' : ''}`} required />
                  {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className={`w-full border p-2 rounded ${errors.endDate ? 'border-red-500' : ''}`} required />
                  {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                </div>
                <div>
                  <input name="monthlyRent" placeholder="Monthly Rent" value={formData.monthlyRent} onChange={handleChange} className={`w-full border p-2 rounded ${errors.monthlyRent ? 'border-red-500' : ''}`} required />
                  {errors.monthlyRent && <p className="text-red-500 text-xs mt-1">{errors.monthlyRent}</p>}
                </div>
                <div>
                  <input name="maintenanceCharges" placeholder="Maintenance Charges" value={formData.maintenanceCharges} onChange={handleChange} className={`w-full border p-2 rounded ${errors.maintenanceCharges ? 'border-red-500' : ''}`} required />
                  {errors.maintenanceCharges && <p className="text-red-500 text-xs mt-1">{errors.maintenanceCharges}</p>}
                </div>
                <div>
                  <input name="securityDeposit" placeholder="Security Deposit" value={formData.securityDeposit} onChange={handleChange} className={`w-full border p-2 rounded ${errors.securityDeposit ? 'border-red-500' : ''}`} required />
                  {errors.securityDeposit && <p className="text-red-500 text-xs mt-1">{errors.securityDeposit}</p>}
                </div>
                <div>
                  <input name="chequeNumber" placeholder="Cheque Number" value={formData.chequeNumber} onChange={handleChange} className={`w-full border p-2 rounded ${errors.chequeNumber ? 'border-red-500' : ''}`} required />
                  {errors.chequeNumber && <p className="text-red-500 text-xs mt-1">{errors.chequeNumber}</p>}
                </div>
                <div>
                  <input type="date" name="chequeDate" value={formData.chequeDate} onChange={handleChange} className={`w-full border p-2 rounded ${errors.chequeDate ? 'border-red-500' : ''}`} required />
                  {errors.chequeDate && <p className="text-red-500 text-xs mt-1">{errors.chequeDate}</p>}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-2">
                <div>
                  <input name="witness1Name" placeholder="Witness 1 Name" value={formData.witness1Name} onChange={handleChange} className={`w-full border p-2 rounded ${errors.witness1Name ? 'border-red-500' : ''}`} required />
                  {errors.witness1Name && <p className="text-red-500 text-xs mt-1">{errors.witness1Name}</p>}
                </div>
                <div>
                  <textarea name="witness1Address" placeholder="Witness 1 Address" value={formData.witness1Address} onChange={handleChange} className={`w-full border p-2 rounded ${errors.witness1Address ? 'border-red-500' : ''}`} required />
                  {errors.witness1Address && <p className="text-red-500 text-xs mt-1">{errors.witness1Address}</p>}
                </div>
                <div>
                  <input name="witness2Name" placeholder="Witness 2 Name" value={formData.witness2Name} onChange={handleChange} className={`w-full border p-2 rounded ${errors.witness2Name ? 'border-red-500' : ''}`} required />
                  {errors.witness2Name && <p className="text-red-500 text-xs mt-1">{errors.witness2Name}</p>}
                </div>
                <div>
                  <textarea name="witness2Address" placeholder="Witness 2 Address" value={formData.witness2Address} onChange={handleChange} className={`w-full border p-2 rounded ${errors.witness2Address ? 'border-red-500' : ''}`} required />
                  {errors.witness2Address && <p className="text-red-500 text-xs mt-1">{errors.witness2Address}</p>}
                </div>
                <div>
                  <input name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} className={`w-full border p-2 rounded ${errors.bedrooms ? 'border-red-500' : ''}`} required />
                  {errors.bedrooms && <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>}
                </div>
                <div>
                  <input name="fans" placeholder="Fans" value={formData.fans} onChange={handleChange} className={`w-full border p-2 rounded ${errors.fans ? 'border-red-500' : ''}`} required />
                  {errors.fans && <p className="text-red-500 text-xs mt-1">{errors.fans}</p>}
                </div>
                <div>
                  <input name="lights" placeholder="CFL Lights" value={formData.lights} onChange={handleChange} className={`w-full border p-2 rounded ${errors.lights ? 'border-red-500' : ''}`} required />
                  {errors.lights && <p className="text-red-500 text-xs mt-1">{errors.lights}</p>}
                </div>
                <div>
                  <input name="geysers" placeholder="Geysers" value={formData.geysers} onChange={handleChange} className={`w-full border p-2 rounded ${errors.geysers ? 'border-red-500' : ''}`} required />
                  {errors.geysers && <p className="text-red-500 text-xs mt-1">{errors.geysers}</p>}
                </div>
                <div>
                  <input name="mirrors" placeholder="Mirrors" value={formData.mirrors} onChange={handleChange} className={`w-full border p-2 rounded ${errors.mirrors ? 'border-red-500' : ''}`} required />
                  {errors.mirrors && <p className="text-red-500 text-xs mt-1">{errors.mirrors}</p>}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button onClick={prevStep} disabled={step === 1} className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50">
                Previous
              </button>
              {step < 4 ? (
                <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Next
                </button>
              ) : (
                <button onClick={finish} className="bg-green-600 text-white px-4 py-2 rounded">
                  Finish
                </button>
              )}
            </div>
          </div>
        )}

        {/* RIGHT PREVIEW */}
        <div id="print-section" className={`bg-white rounded-2xl shadow-xl border border-gray-200 p-6 text-sm leading-relaxed overflow-y-auto ${!finished && "max-h-[72vh]"}`}>
          {/* Header */}
          <div className="relative -m-6 mb-6 p-6 rounded-t-2xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/assests/Havenhunt_Logo_Earth_Tones_and_Turquoise-removebg-preview.png" alt="HavenHunt" className="h-10 w-10 object-contain" />
                <div>
                  <div className="text-xl font-bold tracking-wide">HavenHunt</div>
                  <div className="text-xs opacity-90">Rental Agreement</div>
                </div>
              </div>
              <div className="text-xs text-white/90">{new Date().toLocaleDateString()}</div>
            </div>
            {docTitle?.trim() && (
              <div className="mt-3 text-sm font-medium text-white/90">Title: <span className="font-semibold">{docTitle}</span></div>
            )}
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-4">
              <div className="text-xs uppercase tracking-wide text-teal-700 font-semibold">Place & Date</div>
              <div className="mt-1 text-gray-800">
                {formData.place || "________"} • {formData.day || "___"}-{formData.month || "____"}-{formData.year || "____"}
              </div>
            </div>
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
              <div className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">Period</div>
              <div className="mt-1 text-gray-800">
                {formData.startDate || "________"} → {formData.endDate || "________"}
              </div>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">Owner</div>
              <div className="mt-1 text-gray-800">{formData.ownerName || "________"}</div>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
              <div className="text-xs uppercase tracking-wide text-rose-700 font-semibold">Tenant</div>
              <div className="mt-1 text-gray-800">{formData.tenantName || "________"}</div>
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-lg font-bold text-gray-900">RENTAL AGREEMENT</h2>
          <div className="mb-6 h-1 w-24 bg-gradient-to-r from-teal-600 to-indigo-600 rounded"></div>

<p>
  This RENTAL AGREEMENT is executed at <strong>{formData.place || "________"}</strong>
  on this <strong>{formData.day || "___"}</strong> day of <strong>{formData.month || "________"}</strong>,
  <strong>{formData.year || "____"}</strong> by and between:
</p>

<p>
  <strong>{formData.ownerName || "________"}</strong>, S/o or D/o.
  <strong>{formData.ownerFather || "________"}</strong>, residing at
  <strong>{formData.ownerAddress || "________"}</strong> (hereinafter called the “OWNER”).
</p>

<p>
  AND <strong>{formData.tenantName || "________"}</strong>, S/o or D/o.
  <strong>{formData.tenantFather || "________"}</strong>, working/studying at
  <strong>{formData.tenantWorkAddress || "________"}</strong>, having permanent address
  <strong>{formData.tenantPermanentAddress || "________"}</strong> (hereinafter called the “TENANT”).
</p>

<p>
  WHEREAS the Tenant has requested the Owner to grant Rent with respect to the Schedule
  Premises and the Owner has agreed to rent out to the Tenant the Property with two-wheeler and
  four-wheeler parking space in the ground floor for residential purposes only, on the following
  terms and conditions:
</p>

<p className="mt-4">
  1. The rent in respect of the “Demised Premises” located at
  <strong>{formData.propertyAddress || "________"}</strong>
  shall commence from <strong>{formData.startDate || "________"}</strong>
  and shall be valid till <strong>{formData.endDate || "________"}</strong>.
</p>

<p>
  2. The Tenant shall pay to the Owner a monthly rent of Rs.
  <strong>{formData.monthlyRent || "________"}</strong>, excluding electricity and water bills.
</p>

<p>
  3. The Tenant shall pay to the Owner a monthly maintenance charge of Rs.
  <strong>{formData.maintenanceCharges || "________"}</strong> towards the upkeep of common facilities.
</p>

<p>4. That the Tenant shall pay for the running cost of elevator and generator separately to the Owner.</p>

<p>
  5. That during the Rent period, in addition to the rental amount payable to the Owner, the Tenant
  shall pay for the use of electricity and water as per bills received from the authorities concerned
  directly. …
</p>

<p>
  6. The Tenant will pay to the Owner an interest-free refundable security deposit of Rs.
  <strong>{formData.securityDeposit || "________"}</strong> via cheque no.
  <strong>{formData.chequeNumber || "________"}</strong> dated
  <strong>{formData.chequeDate || "________"}</strong>.
</p>

<p>7. That all the sanitary, electrical and other fittings…</p>
<p>8. That the Tenant shall not sublet…</p>
<p>9. That the day-to-day minor repairs…</p>
<p>10. That no structural additions or alterations…</p>
<p>11. That the Owner shall hold the right to visit…</p>
<p>12. That the Tenant shall comply with all the rules…</p>
<p>13. That the Owner shall pay for all taxes…</p>
<p>14. That the Owner will keep the Tenant free…</p>
<p>15. That this Rent Agreement can be terminated…</p>
<p>16. The Tenant shall maintain the Demised Premises…</p>
<p>17. That in case, where the Premises are not vacated…</p>
<p>18. That both the parties shall observe and adhere…</p>

<h3 className="mt-6 font-bold text-gray-900 border-l-4 border-teal-600 pl-3">ANNEXURE-I</h3>
<p>
  The property at <strong>{formData.propertyAddress || "________"}</strong> consisting
  <strong>{formData.bedrooms || "__"}</strong> bedrooms, with
  <strong>{formData.fans || "__"}</strong> fans,
  <strong>{formData.lights || "__"}</strong> CFL lights,
  <strong>{formData.geysers || "__"}</strong> geysers, and
  <strong>{formData.mirrors || "__"}</strong> mirrors.
</p>

<div className="mt-6">
  <p>
    Witness 1: <strong>{formData.witness1Name || "________"}</strong> -{" "}
    {formData.witness1Address || "________"}
  </p>
  <p>
    Witness 2: <strong>{formData.witness2Name || "________"}</strong> -{" "}
    {formData.witness2Address || "________"}
  </p>
</div>

<div className="mt-10 border-t pt-6 border-dashed border-gray-300">
  <div className="flex justify-between">
    <div>
      <p>__________________________</p>
      <p className="text-sm text-gray-700">OWNER: {formData.ownerName || "________"}</p>
    </div>
    <div>
      <p>__________________________</p>
      <p className="text-sm text-gray-700">TENANT: {formData.tenantName || "________"}</p>
    </div>
  </div>
</div>

        </div>
      </div>

      {/* Download Button */}
      {finished && (
        <div className="mt-6 text-center">
          <button onClick={createAndDownload} disabled={isProcessing} className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50">
            {isProcessing ? (
              "Processing..."
            ) : (
              <span>
                Download PDF (₹{priceInfo.final}
                <span className="mx-1 opacity-80 line-through">₹{priceInfo.base}</span>
                )
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
