import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ServicesPage() {
  const API_URL = "https://booking-app-backend-api.onrender.com/api/services";

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    image: "",
    videoUrl: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setServices(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const seedServices = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/seed`);
      setServices(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to seed services.");
    } finally {
      setLoading(false);
    }
  };

  const createService = async () => {
    try {
      setLoading(true);
      const res = await axios.post(API_URL, form);
      setServices((prev) => [...prev, res.data]);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create service.");
    } finally {
      setLoading(false);
    }
  };

  const updateService = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/${editingId}`, form);
      setServices((prev) =>
        prev.map((s) => (s._id === editingId ? res.data : s))
      );
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (editingId) updateService();
    else createService();
  };

  const handleEdit = (service) => {
    setForm({
      title: service.title || "",
      description: service.description || "",
      price: service.price || "",
      duration: service.duration || "",
      image: service.image || "",
      videoUrl: service.videoUrl || "",
    });
    setEditingId(service._id);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      duration: "",
      image: "",
      videoUrl: "",
    });
    setEditingId(null);
  };

  const clearError = () => setError("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white space-y-6"
    >
      <h1 className="text-3xl font-bold">Services Management</h1>

      {/* Form */}
      <Card className="p-6 bg-black/50 border-white/10 rounded-2xl shadow-md space-y-4">
        <p className="text-gray-400">Add, edit or delete services.</p>

        {error && (
          <div className="flex justify-between items-center bg-red-900/20 border border-red-400/30 p-2 rounded">
            <p className="text-red-400">{error}</p>
            <Button
              size="sm"
              onClick={clearError}
              className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-3 py-1 rounded-md shadow-md"
            >
              Clear
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>
          <div>
            <Label>Duration (minutes)</Label>
            <Input
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>
          {/* <div>
            <Label>Image URL</Label>
            <Input
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>
          <div>
            <Label>Video URL</Label>
            <Input
              value={form.videoUrl}
              onChange={(e) => handleChange("videoUrl", e.target.value)}
            />
          </div> */}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-sky-600 to-blue-500 hover:from-blue-500 hover:to-sky-600 text-white px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
          >
            {editingId ? "Update Service" : "Create Service"}
          </Button>
        </div>
      </Card>

      {/* Services List */}
      <Card className="p-6 bg-black/50 border-white/10 rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold">All Services</h2>
        {loading && <p className="text-gray-400">Loading...</p>}

        <div className="space-y-3">
          {services.length === 0 && !loading && (
            <p className="text-gray-500">No services available.</p>
          )}

          {services.map((s) => (
            <div
              key={s._id}
              className="p-3 bg-white/5 rounded-lg border border-white/10 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="space-y-1">
                <p className="font-medium">{s.title}</p>
                <p className="text-sm text-gray-400">{s.description}</p>
                <p className="text-sm text-gray-400">
                  Price: {s.price} — Duration: {s.duration} min
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0 sm:justify-end">
                <Button
                  size="sm"
                  onClick={() => handleEdit(s)}
                  className="bg-gradient-to-r from-sky-600 to-blue-500 hover:from-blue-500 hover:to-sky-600 text-white px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => deleteService(s._id)}
                  className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
