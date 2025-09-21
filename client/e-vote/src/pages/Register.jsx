import React, { useState, useRef } from "react";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    aadhaar: "",
    voterId: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [photo, setPhoto] = useState(null);
  const [fingerprint, setFingerprint] = useState(null);
  const [errors, setErrors] = useState({});
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const photoInputRef = useRef(null);
  const fpInputRef = useRef(null);

  function validateFields() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!/^\d{12}$/.test(form.aadhaar)) e.aadhaar = "Aadhaar must be 12 digits";
    if (!form.voterId.trim()) e.voterId = "Voter ID is required";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.gender) e.gender = "Gender is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!photo) e.photo = "Face photo is required";
    if (!fingerprint) e.fingerprint = "Fingerprint capture is required";
    return e;
  }

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  }

  function handleFileChange(e, type) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [type]: "File too large (max 5MB)" }));
      return;
    }
    if (type === "photo") setPhoto(file);
    else setFingerprint(file);
    setErrors((prev) => ({ ...prev, [type]: null }));
  }

  function triggerPhotoCapture() {
    photoInputRef.current?.click();
  }

  function triggerFingerprintCapture() {
    fpInputRef.current?.click();
  }

  async function handleVerify() {
    setErrors({});
    const e = validateFields();
    if (Object.keys(e).length) {
      setErrors(e);
      setVerified(false);
      return;
    }

    setVerifying(true);
    setVerified(false);

    await new Promise((r) => setTimeout(r, 1400));

    const aadhaarValid = /^\d{12}$/.test(form.aadhaar);
    const hasPhoto = !!photo;
    const hasFp = !!fingerprint;

    if (aadhaarValid && hasPhoto && hasFp) {
      setVerified(true);
      setErrors({});
    } else {
      const newErr = {};
      if (!aadhaarValid) newErr.aadhaar = "Invalid Aadhaar";
      if (!hasPhoto) newErr.photo = "Face capture required";
      if (!hasFp) newErr.fingerprint = "Fingerprint capture required";
      setErrors(newErr);
      setVerified(false);
    }

    setVerifying(false);
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!verified) {
      setErrors((prev) => ({
        ...prev,
        verify: "Please verify details before registering",
      }));
      return;
    }

    setSubmitting(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("photo", photo);
    fd.append("fingerprint", fingerprint);
    fd.append("verifiedAt", new Date().toISOString());

    try {
      await new Promise((r) => setTimeout(r, 1200));
      alert("Registration successful ✅");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        aadhaar: "",
        voterId: "",
        dob: "",
        gender: "",
        address: "",
      });
      setPhoto(null);
      setFingerprint(null);
      setVerified(false);
      setErrors({});
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        submit: "Registration failed. Try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-2">Voter Registration</h1>
          <p className="text-sm text-gray-500 mb-6">
            Fill the form carefully. Capture face & fingerprint for verification. Aadhaar must be 12 digits.
          </p>

          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+91 9XXXXXXXXX"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Aadhaar Number
              </label>
              <input
                name="aadhaar"
                value={form.aadhaar}
                onChange={handleChange}
                maxLength={12}
                inputMode="numeric"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.aadhaar ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="123412341234"
              />
              {errors.aadhaar && (
                <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Voter ID</label>
              <input
                name="voterId"
                value={form.voterId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.voterId ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="ABCD1234567"
              />
              {errors.voterId && (
                <p className="text-red-500 text-sm mt-1">{errors.voterId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Permanent address..."
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="flex flex-col gap-4 md:col-span-2">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-sm mb-2 font-medium">Face Photo</p>
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="face preview"
                      className="mx-auto h-28 w-28 object-cover rounded-full border"
                    />
                  ) : (
                    <div className="mx-auto h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No photo
                    </div>
                  )}
                  <div className="mt-3 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={triggerPhotoCapture}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Capture / Upload
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      ref={photoInputRef}
                      onChange={(e) => handleFileChange(e, "photo")}
                      className="hidden"
                    />
                    {errors.photo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.photo}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-sm mb-2 font-medium">Fingerprint</p>
                  {fingerprint ? (
                    <img
                      src={URL.createObjectURL(fingerprint)}
                      alt="fp preview"
                      className="mx-auto h-28 w-28 object-contain rounded border bg-white"
                    />
                  ) : (
                    <div className="mx-auto h-28 w-28 rounded bg-gray-200 flex items-center justify-center text-gray-500">
                      No fingerprint
                    </div>
                  )}
                  <div className="mt-3 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={triggerFingerprintCapture}
                      className="px-3 py-2 bg-green-600 text-white rounded-md"
                    >
                      Capture
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fpInputRef}
                      onChange={(e) => handleFileChange(e, "fingerprint")}
                      className="hidden"
                    />
                    {errors.fingerprint && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fingerprint}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={verifying}
                  className={`px-4 py-2 rounded-md font-medium ${
                    verifying
                      ? "bg-gray-300 text-gray-600"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  {verifying ? "Verifying..." : "Verify"}
                </button>

                <div>
                  <p className="text-sm">Status:</p>
                  <div className="mt-1">
                    {verified ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                        Verified ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                        Not Verified
                      </span>
                    )}
                  </div>
                  {errors.verify && (
                    <p className="text-red-500 text-sm mt-1">{errors.verify}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  if (confirm("Clear all entered data?")) {
                    setForm({
                      fullName: "",
                      email: "",
                      phone: "",
                      aadhaar: "",
                      voterId: "",
                      dob: "",
                      gender: "",
                      address: "",
                    });
                    setPhoto(null);
                    setFingerprint(null);
                    setErrors({});
                    setVerified(false);
                  }
                }}
                className="px-4 py-2 rounded-md bg-gray-200"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={!verified || submitting}
                className={`px-5 py-2 rounded-md font-semibold ${
                  !verified || submitting
                    ? "bg-gray-300 text-gray-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {submitting ? "Registering..." : "Register"}
              </button>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm md:col-span-2 mt-2">
                {errors.submit}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
