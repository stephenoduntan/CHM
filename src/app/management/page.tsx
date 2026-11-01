"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Video,
  Calendar,
  FileText,
  Headphones,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export default function ManagementPortal() {
  const [activeTab, setActiveTab] = useState<"sermons" | "events" | "blogs" | "podcasts">("sermons");
  const [showModal, setShowModal] = useState(false);

  // Initial Content Data
  const [sermons, setSermons] = useState([
    {
      id: "1",
      title: "Walking in Divine Destiny",
      speaker: "Pastor Fred Odekhian",
      series: "Destiny Series",
      date: "2026-10-24",
      status: "Published",
    },
    {
      id: "2",
      title: "The Power of Consecration",
      speaker: "Pastor (Mrs.) Fred Odekhian",
      series: "Spiritual Foundations",
      date: "2026-10-17",
      status: "Published",
    },
  ]);

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Festival of Destiny Conference 2026",
      theme: "Choose Life",
      date: "Nov 8 - 15, 2026",
      location: "Main Sanctuary",
      status: "Active",
    },
    {
      id: "2",
      title: "Monthly Holy Ghost Service",
      theme: "Power from on High",
      date: "First Friday Monthly",
      location: "Sanctuary & Redemption City",
      status: "Active",
    },
  ]);

  const [blogs, setBlogs] = useState([
    {
      id: "1",
      title: "Finding Peace in the Middle of Life's Storms",
      author: "Pastor Fred Odekhian",
      category: "Faith & Spiritual Growth",
      date: "2026-10-20",
      status: "Published",
    },
    {
      id: "2",
      title: "Raising Kingdom Champions: The Power of Intentional Parenting",
      author: "Pastor (Mrs.) Fred Odekhian",
      category: "Family & Parenting",
      date: "2026-10-14",
      status: "Published",
    },
  ]);

  const [podcasts, setPodcasts] = useState([
    {
      id: "1",
      episode: 24,
      title: "Understanding Kingdom Timing & Destiny",
      speaker: "Pastor Fred Odekhian",
      duration: "42:15",
      date: "2026-10-22",
    },
    {
      id: "2",
      episode: 23,
      title: "Family, Marriage & Grace in the Modern World",
      speaker: "Pastor & Pastor (Mrs.) Fred Odekhian",
      duration: "55:30",
      date: "2026-10-15",
    },
  ]);

  // Form States
  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    series: "",
    date: "",
    theme: "",
    location: "",
    author: "",
    category: "",
    duration: "",
    episode: "",
  });

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "sermons") {
      setSermons([
        ...sermons,
        {
          id: String(Date.now()),
          title: formData.title,
          speaker: formData.speaker || "Pastor Fred Odekhian",
          series: formData.series || "General Sermon",
          date: formData.date || new Date().toISOString().split("T")[0],
          status: "Published",
        },
      ]);
    } else if (activeTab === "events") {
      setEvents([
        ...events,
        {
          id: String(Date.now()),
          title: formData.title,
          theme: formData.theme || "Faith Encounters",
          date: formData.date || "Upcoming",
          location: formData.location || "Main Sanctuary",
          status: "Active",
        },
      ]);
    } else if (activeTab === "blogs") {
      setBlogs([
        ...blogs,
        {
          id: String(Date.now()),
          title: formData.title,
          author: formData.author || "Pastor Fred Odekhian",
          category: formData.category || "Devotional",
          date: new Date().toISOString().split("T")[0],
          status: "Published",
        },
      ]);
    } else if (activeTab === "podcasts") {
      setPodcasts([
        ...podcasts,
        {
          id: String(Date.now()),
          episode: Number(formData.episode) || podcasts.length + 1,
          title: formData.title,
          speaker: formData.speaker || "Pastoral Team",
          duration: formData.duration || "45:00",
          date: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    setFormData({
      title: "",
      speaker: "",
      series: "",
      date: "",
      theme: "",
      location: "",
      author: "",
      category: "",
      duration: "",
      episode: "",
    });
    setShowModal(false);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10 pb-24">
      <Container>
        {/* Header Bar */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-200/90 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c8a96e] mb-1">
              <Sparkles className="size-3.5" />
              <span>Church Media & Admin Suite</span>
            </div>
            <h1 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202]">
              Website Management Portal
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Easily upload, edit, and organize Sermons, Events, Blogs, and Podcasts for {SITE_CONFIG.fullName}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              <Plus className="size-4" />
              <span>Add New {activeTab.slice(0, -1)}</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div
            onClick={() => setActiveTab("sermons")}
            className={`p-6 rounded-[24px] border cursor-pointer transition-all ${
              activeTab === "sermons"
                ? "bg-[#051202] text-white shadow-lg"
                : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Sermons</span>
              <Video className="size-5 text-[#c8a96e]" />
            </div>
            <p className="text-3xl font-extrabold">{sermons.length}</p>
          </div>

          <div
            onClick={() => setActiveTab("events")}
            className={`p-6 rounded-[24px] border cursor-pointer transition-all ${
              activeTab === "events"
                ? "bg-[#051202] text-white shadow-lg"
                : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Events</span>
              <Calendar className="size-5 text-[#c8a96e]" />
            </div>
            <p className="text-3xl font-extrabold">{events.length}</p>
          </div>

          <div
            onClick={() => setActiveTab("blogs")}
            className={`p-6 rounded-[24px] border cursor-pointer transition-all ${
              activeTab === "blogs"
                ? "bg-[#051202] text-white shadow-lg"
                : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Articles</span>
              <FileText className="size-5 text-[#c8a96e]" />
            </div>
            <p className="text-3xl font-extrabold">{blogs.length}</p>
          </div>

          <div
            onClick={() => setActiveTab("podcasts")}
            className={`p-6 rounded-[24px] border cursor-pointer transition-all ${
              activeTab === "podcasts"
                ? "bg-[#051202] text-white shadow-lg"
                : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Podcasts</span>
              <Headphones className="size-5 text-[#c8a96e]" />
            </div>
            <p className="text-3xl font-extrabold">{podcasts.length}</p>
          </div>
        </div>

        {/* Content Table Container */}
        <div className="bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden">
          {/* Navigation Bar inside Table */}
          <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#051202] capitalize">
                {activeTab} Management
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
                Live on website
              </span>
            </div>

            <Link
              href={`/${activeTab}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#051202]"
            >
              <span>View live /{activeTab} page</span>
              <ExternalLink className="size-3.5" />
            </Link>
          </div>

          {/* Tab 1: Sermons Table */}
          {activeTab === "sermons" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Preacher</th>
                    <th className="px-6 py-4">Series</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sermons.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#051202]">{item.title}</td>
                      <td className="px-6 py-4 text-gray-600">{item.speaker}</td>
                      <td className="px-6 py-4 text-gray-500">{item.series}</td>
                      <td className="px-6 py-4 text-gray-500">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                          <CheckCircle className="size-3" />
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSermons(sermons.filter((s) => s.id !== item.id))}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Delete sermon"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 2: Events Table */}
          {activeTab === "events" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Theme</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {events.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#051202]">{item.title}</td>
                      <td className="px-6 py-4 text-[#c8a96e] italic">{item.theme}</td>
                      <td className="px-6 py-4 text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 text-gray-500">{item.location}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                          <CheckCircle className="size-3" />
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setEvents(events.filter((e) => e.id !== item.id))}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Delete event"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Blogs Table */}
          {activeTab === "blogs" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Article Title</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {blogs.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#051202]">{item.title}</td>
                      <td className="px-6 py-4 text-gray-600">{item.author}</td>
                      <td className="px-6 py-4 text-gray-500">{item.category}</td>
                      <td className="px-6 py-4 text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setBlogs(blogs.filter((b) => b.id !== item.id))}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Delete blog"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 4: Podcasts Table */}
          {activeTab === "podcasts" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Ep #</th>
                    <th className="px-6 py-4">Episode Title</th>
                    <th className="px-6 py-4">Speaker</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {podcasts.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-[#c8a96e]">#{item.episode}</td>
                      <td className="px-6 py-4 font-semibold text-[#051202]">{item.title}</td>
                      <td className="px-6 py-4 text-gray-600">{item.speaker}</td>
                      <td className="px-6 py-4 text-gray-500">{item.duration}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setPodcasts(podcasts.filter((p) => p.id !== item.id))}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Delete podcast"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="font-sans font-bold text-2xl text-[#051202] mb-1 capitalize">
              Upload New {activeTab.slice(0, -1)}
            </h2>
            <p className="text-gray-500 text-xs mb-6">
              Add details for the new entry to publish it directly.
            </p>

            <form onSubmit={handleAddContent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                />
              </div>

              {activeTab === "sermons" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Preacher
                    </label>
                    <input
                      type="text"
                      value={formData.speaker}
                      onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                      placeholder="e.g. Pastor Fred Odekhian"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Series Name
                    </label>
                    <input
                      type="text"
                      value={formData.series}
                      onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                      placeholder="e.g. Destiny Series"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                    />
                  </div>
                </>
              )}

              {activeTab === "events" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Theme
                    </label>
                    <input
                      type="text"
                      value={formData.theme}
                      onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                      placeholder="e.g. Choose Life"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Main Auditorium"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                    />
                  </div>
                </>
              )}

              {activeTab === "podcasts" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Episode Number
                  </label>
                  <input
                    type="number"
                    value={formData.episode}
                    onChange={(e) => setFormData({ ...formData, episode: e.target.value })}
                    placeholder="25"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

