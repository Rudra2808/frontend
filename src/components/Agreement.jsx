import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function Agreement() {
  const [step, setStep] = useState(1);
  const [finished, setFinished] = useState(false);
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
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const finish = () => setFinished(true);

  const downloadPDF = () => {
    const input = document.getElementById("print-section");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("rental-agreement.pdf");
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Title */}
      <div className="mb-6 border-b pb-4 text-center">
        <img src="/assets/logo.png" alt="Logo" className="h-12 mx-auto" />
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

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-2">
                <input name="place" placeholder="Place" value={formData.place} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="day" placeholder="Day" value={formData.day} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="month" placeholder="Month" value={formData.month} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="ownerFather" placeholder="Owner Father Name" value={formData.ownerFather} onChange={handleChange} className="w-full border p-2 rounded" />
                <textarea name="ownerAddress" placeholder="Owner Address" value={formData.ownerAddress} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-2">
                <input name="tenantName" placeholder="Tenant Name" value={formData.tenantName} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="tenantFather" placeholder="Tenant Father Name" value={formData.tenantFather} onChange={handleChange} className="w-full border p-2 rounded" />
                <textarea name="tenantWorkAddress" placeholder="Tenant Work Address" value={formData.tenantWorkAddress} onChange={handleChange} className="w-full border p-2 rounded" />
                <textarea name="tenantPermanentAddress" placeholder="Tenant Permanent Address" value={formData.tenantPermanentAddress} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-2">
                <textarea name="propertyAddress" placeholder="Property Address" value={formData.propertyAddress} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="monthlyRent" placeholder="Monthly Rent" value={formData.monthlyRent} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="maintenanceCharges" placeholder="Maintenance Charges" value={formData.maintenanceCharges} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="securityDeposit" placeholder="Security Deposit" value={formData.securityDeposit} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="chequeNumber" placeholder="Cheque Number" value={formData.chequeNumber} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="date" name="chequeDate" value={formData.chequeDate} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-2">
                <input name="witness1Name" placeholder="Witness 1 Name" value={formData.witness1Name} onChange={handleChange} className="w-full border p-2 rounded" />
                <textarea name="witness1Address" placeholder="Witness 1 Address" value={formData.witness1Address} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="witness2Name" placeholder="Witness 2 Name" value={formData.witness2Name} onChange={handleChange} className="w-full border p-2 rounded" />
                <textarea name="witness2Address" placeholder="Witness 2 Address" value={formData.witness2Address} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="fans" placeholder="Fans" value={formData.fans} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="lights" placeholder="CFL Lights" value={formData.lights} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="geysers" placeholder="Geysers" value={formData.geysers} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="mirrors" placeholder="Mirrors" value={formData.mirrors} onChange={handleChange} className="w-full border p-2 rounded" />
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
        <div id="print-section" className={`bg-white p-6 shadow rounded text-sm leading-relaxed overflow-y-auto ${!finished && "max-h-[72vh]"}`}>
          {/* Same rental agreement content, just replace Angular {{ }} with {formData.field || "___"} */}
          <h2 className="text-center font-bold text-lg mb-4">RENTAL AGREEMENT</h2>

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

<h3 className="mt-4 font-bold">ANNEXURE-I</h3>
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

<div className="mt-10 flex justify-between">
  <div>
    <p>__________________________</p>
    <p>OWNER: {formData.ownerName || "________"}</p>
  </div>
  <div>
    <p>__________________________</p>
    <p>TENANT: {formData.tenantName || "________"}</p>
  </div>
</div>

        </div>
      </div>

      {/* Download Button */}
      {finished && (
        <div className="mt-6 text-center">
          <button onClick={downloadPDF} className="bg-green-600 text-white px-6 py-2 rounded">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
