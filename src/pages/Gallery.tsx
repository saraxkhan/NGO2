import { useState, useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, ImageIcon, Loader2, Calendar, Tag } from "lucide-react";
import { toast } from "sonner";

interface Photo {
  id: string;
  url: string;
  caption: string;
  event: string;
  date: string;
}

const samplePhotos: Photo[] = [
  { id: "1", url: "", caption: "Tailoring workshop graduation ceremony", event: "Skill Development Program", date: "2025-12-15" },
  { id: "2", url: "", caption: "Children's annual day celebration", event: "Education Support Program", date: "2025-11-20" },
  { id: "3", url: "", caption: "Community health awareness camp", event: "Community Outreach", date: "2025-10-10" },
  { id: "4", url: "", caption: "Women entrepreneurs showcase", event: "Livelihood Training", date: "2025-09-05" },
  { id: "5", url: "", caption: "Tree plantation drive with volunteers", event: "Environment Initiative", date: "2025-08-15" },
  { id: "6", url: "", caption: "International Women's Day celebration", event: "Special Events", date: "2026-03-08" },
];

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [showAdd, setShowAdd] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [newEvent, setNewEvent] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB.");
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim() || !newEvent.trim()) {
      toast.error("Please fill in caption and event name.");
      return;
    }
    if (!previewUrl) {
      toast.error("Please select an image.");
      return;
    }
    setUploading(true);
    // Simulate upload delay; replace with actual Cloudinary/S3 upload
    await new Promise((r) => setTimeout(r, 800));
    const photo: Photo = {
      id: Date.now().toString(),
      url: previewUrl,
      caption: newCaption.trim(),
      event: newEvent.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    setPhotos([photo, ...photos]);
    setNewCaption("");
    setNewEvent("");
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
    setShowAdd(false);
    setUploading(false);
    toast.success("Photo added to gallery!");
  };

  const handleCancel = () => {
    setShowAdd(false);
    setNewCaption("");
    setNewEvent("");
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <main>
      <section className="bg-primary section-padding" aria-label="Page header">
        <div className="container-narrow text-center">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Photo Gallery</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Glimpses of hope, hard work, and transformation — moments from our programs and community events.
          </p>
        </div>
      </section>

      <section className="section-padding" aria-label="Photo gallery">
        <div className="container-narrow">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <SectionHeading title="Event Moments" subtitle="Browse memories from our programs and events." />
            <Button
              onClick={() => setShowAdd(!showAdd)}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shrink-0"
              aria-expanded={showAdd}
            >
              {showAdd ? <X className="mr-2 h-4 w-4" aria-hidden="true" /> : <Plus className="mr-2 h-4 w-4" aria-hidden="true" />}
              {showAdd ? "Cancel" : "Add Photo"}
            </Button>
          </div>

          {/* Add form */}
          {showAdd && (
            <form
              onSubmit={handleAdd}
              className="mb-10 rounded-lg border border-border bg-card p-6 shadow-sm"
              aria-label="Add new photo"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Add a New Photo</h2>
              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div>
                  <label htmlFor="gallery-caption" className="sr-only">Caption</label>
                  <Input
                    id="gallery-caption"
                    placeholder="Caption *"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    required
                    disabled={uploading}
                  />
                </div>
                <div>
                  <label htmlFor="gallery-event" className="sr-only">Event Name</label>
                  <Input
                    id="gallery-event"
                    placeholder="Event Name *"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    required
                    disabled={uploading}
                  />
                </div>
              </div>

              <label
                className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-accent transition-colors justify-center"
                htmlFor="gallery-file"
              >
                <input
                  ref={fileRef}
                  id="gallery-file"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview of selected image" className="max-h-48 rounded-md object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-8 w-8" aria-hidden="true" />
                    <span className="text-sm">Click to upload an image (max 5 MB)</span>
                  </div>
                )}
              </label>

              <div className="mt-4 flex gap-3">
                <Button type="submit" disabled={uploading} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  {uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />Uploading…</> : "Add to Gallery"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel} disabled={uploading}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Gallery grid */}
          {photos.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ImageIcon className="mx-auto h-12 w-12 mb-3 opacity-40" aria-hidden="true" />
              <p>No photos yet. Be the first to add one!</p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Event photos">
              {photos.map((photo) => (
                <li key={photo.id}>
                  <article
                    className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm cursor-pointer focus-within:ring-2 focus-within:ring-accent"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
                      {photo.url ? (
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ImageIcon className="h-10 w-10 opacity-40" aria-hidden="true" />
                          <span className="text-xs">Photo coming soon</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-foreground text-sm leading-snug">{photo.caption}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground gap-2">
                        <span className="flex items-center gap-1 truncate">
                          <Tag className="h-3 w-3 shrink-0" aria-hidden="true" />
                          {photo.event}
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {photo.date}
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
              aria-label="Close photo"
            >
              <X className="h-7 w-7" />
            </button>
            {selectedPhoto.url ? (
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="rounded-lg w-full max-h-[75vh] object-contain"
              />
            ) : (
              <div className="rounded-lg bg-muted aspect-[4/3] flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground opacity-40" aria-hidden="true" />
              </div>
            )}
            <div className="mt-3 text-white text-center">
              <p className="font-semibold">{selectedPhoto.caption}</p>
              <p className="text-sm text-white/70 mt-1">{selectedPhoto.event} · {selectedPhoto.date}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
